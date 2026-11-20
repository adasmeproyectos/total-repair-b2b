import { NextResponse } from "next/server";
import { Resend } from "resend";
import { PORTAL_BASE_PATH } from "@/lib/portal-config";
import {
  checkRateLimit,
  escapeHtml,
  getClientIp,
  isAllowedOrigin,
  isSafeUrl,
  stripHeaderNewlines,
} from "@/lib/security";
import { getSiteConfig } from "@/lib/site-data";
import { createSupabasePublicClient } from "@/lib/supabase/server";

function formatWhatsappDigits(phone: string): string {
  const digits = phone.replace(/[^0-9]/g, "");
  if (digits.startsWith("56") && digits.length >= 11) return digits;
  if (digits.startsWith("9") && digits.length === 9) return `56${digits}`;
  if (digits.length === 8) return `569${digits}`;
  return digits || "56999195521";
}

function generateFolio(): string {
  const year = new Date().getFullYear();
  const code = Math.floor(1000 + Math.random() * 9000);
  return `TR-${year}-${code}`;
}

export async function POST(request: Request) {
  if (!isAllowedOrigin(request)) {
    return NextResponse.json(
      { error: "Origen no permitido." },
      { status: 403, headers: { "Cache-Control": "no-store" } }
    );
  }

  const contentLength = Number(request.headers.get("content-length") || "0");
  if (contentLength > 16384) {
    return NextResponse.json(
      { error: "La solicitud excede el tamaño máximo permitido." },
      { status: 413, headers: { "Cache-Control": "no-store" } }
    );
  }

  const ip = getClientIp(request);
  const limit = checkRateLimit("contact", ip, 5, 10 * 60 * 1000);
  if (!limit.allowed) {
    return NextResponse.json(
      {
        error:
          "Has enviado varias solicitudes seguidas. Por favor espera unos minutos o contáctanos por WhatsApp o teléfono.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(limit.retryAfterSec),
          "Cache-Control": "no-store",
        },
      }
    );
  }

  try {
    const rawBody = await request.text();
    if (rawBody.length > 16384) {
      return NextResponse.json(
        { error: "La solicitud excede el tamaño máximo permitido." },
        { status: 413, headers: { "Cache-Control": "no-store" } }
      );
    }

    let body: unknown;
    try {
      body = JSON.parse(rawBody);
    } catch {
      return NextResponse.json(
        { error: "Formato de solicitud inválido." },
        { status: 400, headers: { "Cache-Control": "no-store" } }
      );
    }

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json(
        { error: "Datos inválidos." },
        { status: 400, headers: { "Cache-Control": "no-store" } }
      );
    }

    const {
      nombre,
      empresa,
      telefono,
      correo,
      tipoRequerimiento,
      especificacionOtro,
      especificaciones,
      website,
    } = body as Record<string, unknown>;

    // Silent honeypot check for automated spam bots
    if (typeof website === "string" && website.trim().length > 0) {
      return NextResponse.json({ success: true, folio: "TR-OK" });
    }

    if (
      typeof nombre !== "string" ||
      typeof telefono !== "string" ||
      typeof correo !== "string" ||
      typeof tipoRequerimiento !== "string" ||
      !nombre.trim() ||
      !telefono.trim() ||
      !correo.trim() ||
      !tipoRequerimiento.trim()
    ) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    // Bloquear CRLF en email antes de sanitizar para rechazar intentos explícitos de Email Header Injection
    if (/[\r\n\0]/.test(correo)) {
      return NextResponse.json(
        { error: "Correo electrónico inválido" },
        { status: 400 }
      );
    }

    const cleanNombre = stripHeaderNewlines(nombre).slice(0, 120);
    const cleanEmpresa =
      typeof empresa === "string" && empresa.trim()
        ? stripHeaderNewlines(empresa).slice(0, 150)
        : "No especificada";
    const cleanTelefono = stripHeaderNewlines(telefono).slice(0, 50);
    const cleanCorreo = stripHeaderNewlines(correo).slice(0, 150);

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanCorreo)) {
      return NextResponse.json(
        { error: "Correo electrónico inválido" },
        { status: 400 }
      );
    }

    const rawRequirement =
      tipoRequerimiento === "Otro" &&
      typeof especificacionOtro === "string" &&
      especificacionOtro.trim()
        ? `Otro: ${stripHeaderNewlines(especificacionOtro)}`
        : stripHeaderNewlines(tipoRequerimiento);
    const cleanRequirement = rawRequirement.slice(0, 200);

    const cleanEspecificaciones =
      typeof especificaciones === "string" && especificaciones.trim()
        ? especificaciones.replace(/\0/g, "").trim().slice(0, 1500)
        : "Sin detalles adicionales.";

    const safeNombre = escapeHtml(cleanNombre);
    const safeEmpresa = escapeHtml(cleanEmpresa);
    const safeTelefono = escapeHtml(cleanTelefono);
    const safeCorreo = escapeHtml(cleanCorreo);
    const safeRequirement = escapeHtml(cleanRequirement);
    const safeEspecificaciones = escapeHtml(cleanEspecificaciones);

    const folio = generateFolio();
    const isUrgent = /siniestro|emergencia/i.test(cleanRequirement);

    const siteConfig = await getSiteConfig();
    const company = siteConfig.company;

    const rawSiteUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "https://www.totalrepair.cl";
    const siteUrl = isSafeUrl(rawSiteUrl)
      ? rawSiteUrl.replace(/\/$/, "")
      : "https://www.totalrepair.cl";
    const adminInboxUrl = `${siteUrl}${PORTAL_BASE_PATH}/solicitudes`;

    const waDigits = formatWhatsappDigits(cleanTelefono);
    const waReplyText = encodeURIComponent(
      `Hola ${cleanNombre}, te escribimos de Total Repair Ltda. por tu solicitud ${folio} (${cleanRequirement}).`
    );
    const waButtonUrl = `https://wa.me/${waDigits}?text=${waReplyText}`;

    const companyWaHref = isSafeUrl(company.whatsappUrl)
      ? company.whatsappUrl
      : "https://wa.me/56999195521";

    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail =
      stripHeaderNewlines(
        process.env.RESEND_FROM_EMAIL ||
          "Total Repair <notificaciones@totalrepair.cl>"
      );

    // Bloqueado en servidor: contacto@totalrepair.cl SIEMPRE recibe la notificación principal
    // aunque alguien modificara la configuración en base de datos.
    const lockedPrimaryTo = stripHeaderNewlines(
      process.env.RESEND_TO_EMAIL || "contacto@totalrepair.cl"
    );

    const extraCandidates: string[] = [];
    if (
      company.notificationEmail &&
      stripHeaderNewlines(company.notificationEmail).toLowerCase() !==
        lockedPrimaryTo.toLowerCase()
    ) {
      extraCandidates.push(stripHeaderNewlines(company.notificationEmail));
    }
    if (company.notificationCcEmail) {
      for (const piece of company.notificationCcEmail.split(",")) {
        extraCandidates.push(stripHeaderNewlines(piece));
      }
    }

    const ccSet = new Set<string>();
    for (const candidate of extraCandidates) {
      if (
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(candidate) &&
        candidate.toLowerCase() !== lockedPrimaryTo.toLowerCase()
      ) {
        ccSet.add(candidate);
      }
      if (ccSet.size >= 3) break;
    }
    const ccList = Array.from(ccSet);

    const adminSubject = stripHeaderNewlines(
      isUrgent
        ? `URGENTE [${folio}] — ${cleanNombre} (${cleanRequirement})`
        : `Nueva Cotización Web [${folio}] — ${cleanNombre}`
    );

    const autoReplySubject = stripHeaderNewlines(
      `${company.autoReplySubject} (${folio})`
    );

    const adminHtml = `
      <div style="font-family: Arial, Helvetica, sans-serif; max-width: 640px; margin: 0 auto; background: #ffffff; border: 1px solid #d6d3cd; padding: 28px; color: #141413;">
        <div style="border-bottom: 3px solid #E8490F; padding-bottom: 16px; margin-bottom: 24px;">
          <p style="margin: 0; font-size: 13px; font-weight: bold; color: #E8490F; text-transform: uppercase; letter-spacing: 1px;">
            ${isUrgent ? "SOLICITUD URGENTE 24/7" : "NUEVA SOLICITUD DE PRESUPUESTO"}
          </p>
          <h1 style="margin: 8px 0 0 0; font-size: 24px; color: #141413;">Folio ${escapeHtml(folio)}</h1>
        </div>

        <table style="width: 100%; border-collapse: collapse; font-size: 16px; line-height: 1.6;">
          <tr><td style="padding: 8px 0; color: #57534E; width: 170px;"><strong>Cliente:</strong></td><td style="padding: 8px 0;">${safeNombre}</td></tr>
          <tr><td style="padding: 8px 0; color: #57534E;"><strong>Empresa / Comunidad:</strong></td><td style="padding: 8px 0;">${safeEmpresa}</td></tr>
          <tr><td style="padding: 8px 0; color: #57534E;"><strong>Teléfono:</strong></td><td style="padding: 8px 0;"><a href="tel:${escapeHtml(cleanTelefono)}" style="color: #141413; font-weight: bold;">${safeTelefono}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #57534E;"><strong>Correo:</strong></td><td style="padding: 8px 0;"><a href="mailto:${safeCorreo}" style="color: #E8490F; font-weight: bold;">${safeCorreo}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #57534E;"><strong>Requerimiento:</strong></td><td style="padding: 8px 0; font-weight: bold;">${safeRequirement}</td></tr>
        </table>

        <div style="background: #F7F6F2; border-left: 4px solid #E8490F; padding: 16px; margin: 20px 0; font-size: 16px; line-height: 1.6;">
          <p style="margin: 0 0 6px 0; font-size: 13px; color: #57534E; text-transform: uppercase;"><strong>Detalles entregados:</strong></p>
          <p style="margin: 0; white-space: pre-wrap;">${safeEspecificaciones}</p>
        </div>

        <div style="margin-top: 28px;">
          <a href="${escapeHtml(waButtonUrl)}" style="display: inline-block; background: #16a34a; color: #ffffff; text-decoration: none; font-weight: bold; font-size: 16px; padding: 14px 22px; margin-right: 10px; margin-bottom: 10px;">
            Responder por WhatsApp
          </a>
          <a href="${escapeHtml(adminInboxUrl)}" style="display: inline-block; background: #141413; color: #ffffff; text-decoration: none; font-weight: bold; font-size: 16px; padding: 14px 22px; margin-bottom: 10px;">
            Ver en Panel Total Repair
          </a>
        </div>

        <p style="margin-top: 24px; font-size: 13px; color: #57534E;">
          También puedes responder directamente a este correo para escribirle a ${safeNombre} (${safeCorreo}).
        </p>
      </div>
    `;

    const autoReplyHtml = `
      <div style="font-family: Arial, Helvetica, sans-serif; max-width: 620px; margin: 0 auto; background: #ffffff; border: 1px solid #d6d3cd; padding: 28px; color: #141413;">
        <div style="border-bottom: 3px solid #E8490F; padding-bottom: 16px; margin-bottom: 24px;">
          <h1 style="margin: 0; font-size: 22px; color: #141413;">${escapeHtml(company.legalName)}</h1>
          <p style="margin: 6px 0 0 0; font-size: 14px; color: #57534E;">Confirmación de solicitud · Folio ${escapeHtml(folio)}</p>
        </div>

        <p style="font-size: 16px; line-height: 1.6;">Hola <strong>${safeNombre}</strong>,</p>
        <p style="font-size: 16px; line-height: 1.6;">
          ${escapeHtml(company.autoReplyGreeting)}
        </p>

        <div style="background: #F7F6F2; border: 1px solid #d6d3cd; padding: 16px; margin: 20px 0; font-size: 15px;">
          <p style="margin: 0 0 6px 0;"><strong>Folio:</strong> ${escapeHtml(folio)}</p>
          <p style="margin: 0 0 6px 0;"><strong>Servicio solicitado:</strong> ${safeRequirement}</p>
          <p style="margin: 0;"><strong>Teléfono de contacto:</strong> ${safeTelefono}</p>
        </div>

        <p style="font-size: 15px; line-height: 1.6; color: #57534E;">
          Si su caso corresponde a una <strong>emergencia o siniestro 24/7</strong>, puede llamarnos directamente al <strong>${escapeHtml(company.phoneDisplay)}</strong> o escribirnos por WhatsApp.
        </p>

        <div style="margin-top: 22px;">
          <a href="${escapeHtml(companyWaHref)}" style="display: inline-block; background: #E8490F; color: #ffffff; text-decoration: none; font-weight: bold; font-size: 15px; padding: 12px 20px;">
            Escribir por WhatsApp
          </a>
        </div>
      </div>
    `;

    // Execute email notifications + Telegram in parallel before single CRM insert
    const emailTask = async (): Promise<{
      status: "sent" | "pending_dns" | "failed";
      error: string | null;
    }> => {
      if (!resendApiKey) {
        return { status: "failed", error: "RESEND_API_KEY no configurada" };
      }

      try {
        const resend = new Resend(resendApiKey);
        const { error: sendError } = await resend.emails.send({
          from: fromEmail,
          to: [lockedPrimaryTo],
          ...(ccList.length > 0 ? { cc: ccList } : {}),
          replyTo: cleanCorreo,
          subject: adminSubject,
          html: adminHtml,
        });

        if (sendError) {
          const msg = sendError.message || "Error al enviar correo";
          const isDnsPending =
            /domain|verify|verified|not found|sandbox/i.test(msg);
          return {
            status: isDnsPending ? "pending_dns" : "failed",
            error: msg,
          };
        }

        if (company.autoReplyEnabled) {
          await resend.emails
            .send({
              from: fromEmail,
              to: [cleanCorreo],
              replyTo: lockedPrimaryTo,
              subject: autoReplySubject,
              html: autoReplyHtml,
            })
            .catch(() => undefined);
        }

        return { status: "sent", error: null };
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Error inesperado Resend";
        const isDnsPending =
          /domain|verify|verified|not found|sandbox/i.test(msg);
        return {
          status: isDnsPending ? "pending_dns" : "failed",
          error: msg,
        };
      }
    };

    const telegramTask = async (): Promise<boolean> => {
      const botToken = process.env.TELEGRAM_BOT_TOKEN;
      const chatId = process.env.TELEGRAM_CHAT_ID;
      if (!botToken || !chatId) return false;

      const text = [
        isUrgent
          ? `<b>URGENTE 24/7 — ${escapeHtml(folio)}</b>`
          : `<b>NUEVA COTIZACIÓN WEB — ${escapeHtml(folio)}</b>`,
        `• <b>Nombre:</b> ${safeNombre}`,
        `• <b>Empresa:</b> ${safeEmpresa}`,
        `• <b>Teléfono:</b> ${safeTelefono}`,
        `• <b>Correo:</b> ${safeCorreo}`,
        `• <b>Tipo:</b> ${safeRequirement}`,
        `• <b>Detalles:</b> ${safeEspecificaciones}`,
        `<a href="${escapeHtml(adminInboxUrl)}">Abrir en Panel Total Repair</a>`,
      ].join("\n");

      try {
        const res = await fetch(
          `https://api.telegram.org/bot${botToken}/sendMessage`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: chatId,
              parse_mode: "HTML",
              text,
            }),
          }
        );
        return res.ok;
      } catch {
        return false;
      }
    };

    const [emailOutcome, telegramSent] = await Promise.all([
      emailTask(),
      telegramTask(),
    ]);

    let dbSaved = false;
    const supabase = createSupabasePublicClient();
    if (supabase) {
      const { error: dbError } = await supabase.from("contact_leads").insert({
        folio,
        nombre: cleanNombre,
        empresa: cleanEmpresa === "No especificada" ? "" : cleanEmpresa,
        telefono: cleanTelefono,
        correo: cleanCorreo,
        tipo_requerimiento: cleanRequirement,
        especificaciones: cleanEspecificaciones,
        is_urgent: isUrgent,
        status: "nuevo",
        email_status: emailOutcome.status,
        email_error: emailOutcome.error,
        telegram_sent: telegramSent,
      });

      if (!dbError) {
        dbSaved = true;
      } else {
        console.error("Supabase contact_leads insert error:", dbError);
      }
    }

    if (!dbSaved && emailOutcome.status === "failed" && !telegramSent) {
      return NextResponse.json(
        {
          error:
            "No pudimos registrar tu solicitud. Intenta por teléfono o WhatsApp.",
        },
        { status: 500, headers: { "Cache-Control": "no-store" } }
      );
    }

    return NextResponse.json(
      {
        success: true,
        folio,
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
