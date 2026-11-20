import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSiteConfig } from "@/lib/site-data";
import { createSupabasePublicClient } from "@/lib/supabase/server";

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

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
  try {
    const body = await request.json();
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

    const cleanNombre = nombre.trim().slice(0, 120);
    const cleanEmpresa =
      typeof empresa === "string" && empresa.trim()
        ? empresa.trim().slice(0, 150)
        : "No especificada";
    const cleanTelefono = telefono.trim().slice(0, 50);
    const cleanCorreo = correo.trim().slice(0, 150);

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
        ? `Otro: ${especificacionOtro.trim()}`
        : tipoRequerimiento.trim();
    const cleanRequirement = rawRequirement.slice(0, 200);

    const cleanEspecificaciones =
      typeof especificaciones === "string" && especificaciones.trim()
        ? especificaciones.trim().slice(0, 1500)
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

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "https://www.totalrepair.cl";
    const adminInboxUrl = `${siteUrl.replace(/\/$/, "")}/admin/solicitudes`;

    const waDigits = formatWhatsappDigits(cleanTelefono);
    const waReplyText = encodeURIComponent(
      `Hola ${cleanNombre}, te escribimos de Total Repair Ltda. por tu solicitud ${folio} (${cleanRequirement}).`
    );
    const waButtonUrl = `https://wa.me/${waDigits}?text=${waReplyText}`;

    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail =
      process.env.RESEND_FROM_EMAIL ||
      "Total Repair <notificaciones@totalrepair.cl>";
    const primaryTo =
      company.notificationEmail?.trim() ||
      process.env.RESEND_TO_EMAIL ||
      company.email ||
      "contacto@totalrepair.cl";
    const ccList = company.notificationCcEmail
      ? company.notificationCcEmail
          .split(",")
          .map((s) => s.trim())
          .filter((s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s))
      : [];

    const adminSubject = isUrgent
      ? `🚨 URGENTE [${folio}] — ${cleanNombre} (${cleanRequirement})`
      : `Nueva Cotización Web [${folio}] — ${cleanNombre}`;

    const adminHtml = `
      <div style="font-family: Arial, Helvetica, sans-serif; max-width: 640px; margin: 0 auto; background: #ffffff; border: 1px solid #e4e4e7; padding: 28px; color: #0f172a;">
        <div style="border-bottom: 3px solid #FF5000; padding-bottom: 16px; margin-bottom: 24px;">
          <p style="margin: 0; font-size: 13px; font-weight: bold; color: #FF5000; text-transform: uppercase; letter-spacing: 1px;">
            ${isUrgent ? "🚨 SOLICITUD URGENTE 24/7" : "NUEVA SOLICITUD DE PRESUPUESTO"}
          </p>
          <h1 style="margin: 8px 0 0 0; font-size: 24px; color: #0f172a;">Folio ${escapeHtml(folio)}</h1>
        </div>

        <table style="width: 100%; border-collapse: collapse; font-size: 16px; line-height: 1.6;">
          <tr><td style="padding: 8px 0; color: #52525b; width: 170px;"><strong>Cliente:</strong></td><td style="padding: 8px 0;">${safeNombre}</td></tr>
          <tr><td style="padding: 8px 0; color: #52525b;"><strong>Empresa / Comunidad:</strong></td><td style="padding: 8px 0;">${safeEmpresa}</td></tr>
          <tr><td style="padding: 8px 0; color: #52525b;"><strong>Teléfono:</strong></td><td style="padding: 8px 0;"><a href="tel:${escapeHtml(cleanTelefono)}" style="color: #0f172a; font-weight: bold;">${safeTelefono}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #52525b;"><strong>Correo:</strong></td><td style="padding: 8px 0;"><a href="mailto:${safeCorreo}" style="color: #FF5000; font-weight: bold;">${safeCorreo}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #52525b;"><strong>Requerimiento:</strong></td><td style="padding: 8px 0; font-weight: bold;">${safeRequirement}</td></tr>
        </table>

        <div style="background: #f8fafc; border-left: 4px solid #FF5000; padding: 16px; margin: 20px 0; font-size: 16px; line-height: 1.6;">
          <p style="margin: 0 0 6px 0; font-size: 13px; color: #52525b; text-transform: uppercase;"><strong>Detalles entregados:</strong></p>
          <p style="margin: 0; white-space: pre-wrap;">${safeEspecificaciones}</p>
        </div>

        <div style="margin-top: 28px;">
          <a href="${waButtonUrl}" style="display: inline-block; background: #16a34a; color: #ffffff; text-decoration: none; font-weight: bold; font-size: 16px; padding: 14px 22px; margin-right: 10px; margin-bottom: 10px;">
            Responder por WhatsApp
          </a>
          <a href="${escapeHtml(adminInboxUrl)}" style="display: inline-block; background: #0f172a; color: #ffffff; text-decoration: none; font-weight: bold; font-size: 16px; padding: 14px 22px; margin-bottom: 10px;">
            Ver en Panel Total Repair
          </a>
        </div>

        <p style="margin-top: 24px; font-size: 13px; color: #71717a;">
          También puedes responder directamente a este correo para escribirle a ${safeNombre} (${safeCorreo}).
        </p>
      </div>
    `;

    const autoReplyHtml = `
      <div style="font-family: Arial, Helvetica, sans-serif; max-width: 620px; margin: 0 auto; background: #ffffff; border: 1px solid #e4e4e7; padding: 28px; color: #0f172a;">
        <div style="border-bottom: 3px solid #FF5000; padding-bottom: 16px; margin-bottom: 24px;">
          <h1 style="margin: 0; font-size: 22px; color: #0f172a;">${escapeHtml(company.legalName)}</h1>
          <p style="margin: 6px 0 0 0; font-size: 14px; color: #52525b;">Confirmación de solicitud · Folio ${escapeHtml(folio)}</p>
        </div>

        <p style="font-size: 16px; line-height: 1.6;">Hola <strong>${safeNombre}</strong>,</p>
        <p style="font-size: 16px; line-height: 1.6;">
          ${escapeHtml(company.autoReplyGreeting)}
        </p>

        <div style="background: #f8fafc; border: 1px solid #e4e4e7; padding: 16px; margin: 20px 0; font-size: 15px;">
          <p style="margin: 0 0 6px 0;"><strong>Folio:</strong> ${escapeHtml(folio)}</p>
          <p style="margin: 0 0 6px 0;"><strong>Servicio solicitado:</strong> ${safeRequirement}</p>
          <p style="margin: 0;"><strong>Teléfono de contacto:</strong> ${safeTelefono}</p>
        </div>

        <p style="font-size: 15px; line-height: 1.6; color: #52525b;">
          Si su caso corresponde a una <strong>emergencia o siniestro 24/7</strong>, puede llamarnos directamente al <strong>${escapeHtml(company.phoneDisplay)}</strong> o escribirnos por WhatsApp.
        </p>

        <div style="margin-top: 22px;">
          <a href="${escapeHtml(company.whatsappUrl)}" style="display: inline-block; background: #FF5000; color: #ffffff; text-decoration: none; font-weight: bold; font-size: 15px; padding: 12px 20px;">
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
          to: [primaryTo],
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
              replyTo: primaryTo,
              subject: `${company.autoReplySubject} (${folio})`,
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
          ? `🚨 <b>URGENTE 24/7 — ${escapeHtml(folio)}</b>`
          : `📩 <b>NUEVA COTIZACIÓN WEB — ${escapeHtml(folio)}</b>`,
        `• <b>Nombre:</b> ${safeNombre}`,
        `• <b>Empresa:</b> ${safeEmpresa}`,
        `• <b>Teléfono:</b> ${safeTelefono}`,
        `• <b>Correo:</b> ${safeCorreo}`,
        `• <b>Tipo:</b> ${safeRequirement}`,
        `• <b>Detalles:</b> ${safeEspecificaciones}`,
        `🔗 <a href="${escapeHtml(adminInboxUrl)}">Abrir en Panel Total Repair</a>`,
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
        { error: "No pudimos registrar tu solicitud. Intenta por teléfono o WhatsApp." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      folio,
      emailStatus: emailOutcome.status,
    });
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
