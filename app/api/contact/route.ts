/**
 * app/api/contact/route.ts
 * API Route para formulario de contacto unificado.
 *
 * Flujo:
 *   1. Verificar token Cloudflare Turnstile (anti-bot)
 *   2. Validar campos requeridos
 *   3. Enviar email vía Resend API (free tier: 3.000 emails/mes)
 *
 * Variables de entorno requeridas en .env.local:
 *   RESEND_API_KEY
 *   RESEND_FROM_EMAIL
 *   RESEND_TO_EMAIL
 *   TELEGRAM_BOT_TOKEN
 *   TELEGRAM_CHAT_ID
 */

import { NextRequest, NextResponse } from "next/server";

interface ContactPayload {
  mode: "empresa" | "hogar";
  Nombre: string;
  Email: string;
  Telefono: string;
  Servicio: string;
  Mensaje?: string;
  Empresa?: string;
  ServicioOtro?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: ContactPayload = await req.json();
    const {
      mode,
      Nombre,
      Email,
      Telefono,
      Servicio,
      Mensaje,
      Empresa,
      ServicioOtro,
    } = body;


    // ── 2. Validar campos ──────────────────────────────────────────────────
    if (!Nombre || !Email || !Servicio) {
      return NextResponse.json(
        { error: "Faltan campos requeridos." },
        { status: 400 }
      );
    }

    // Email básico válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(Email)) {
      return NextResponse.json(
        { error: "Correo electrónico inválido." },
        { status: 400 }
      );
    }

    // ── 3. Enviar email vía Resend ─────────────────────────────────────────
    const resendKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
    const toEmail = process.env.RESEND_TO_EMAIL ?? "contacto@totalrepair.cl";

    if (!resendKey) {
      // En desarrollo sin key, solo confirmar OK para pruebas
      console.log("[DEV] Formulario recibido:", body);
      return NextResponse.json({ ok: true, dev: true });
    }

    const subject =
      mode === "empresa"
        ? `[Empresas] Nueva cotización — ${Empresa ?? Nombre}`
        : `[Hogar] Nueva solicitud — ${Nombre}`;

    const htmlBody = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b;">
        <div style="background: #0f172a; padding: 24px; border-bottom: 3px solid #ea580c;">
          <h1 style="color: white; margin: 0; font-size: 20px;">
            TOTAL<span style="color: #ea580c;">REPAIR</span> — Nuevo Requerimiento
          </h1>
          <p style="color: #94a3b8; margin: 4px 0 0; font-size: 14px;">
            División: ${mode === "empresa" ? "Empresas e Instituciones" : "Hogar / Total Construye"}
          </p>
        </div>
        <div style="padding: 24px; background: #f8fafc;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr><td style="padding: 8px 0; color: #64748b; width: 40%;">Nombre</td><td style="padding: 8px 0; font-weight: 600;">${Nombre}</td></tr>
            ${Empresa ? `<tr><td style="padding: 8px 0; color: #64748b;">Empresa</td><td style="padding: 8px 0; font-weight: 600;">${Empresa}</td></tr>` : ""}
            <tr><td style="padding: 8px 0; color: #64748b;">Email</td><td style="padding: 8px 0;"><a href="mailto:${Email}">${Email}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #64748b;">Teléfono</td><td style="padding: 8px 0;"><a href="tel:${Telefono}">${Telefono}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #64748b;">Servicio</td><td style="padding: 8px 0;">${Servicio}</td></tr>
          </table>
          ${Mensaje ? `
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
          <p style="color: #64748b; font-size: 13px; margin: 0 0 6px;">Mensaje:</p>
          <p style="background: white; padding: 12px; border: 1px solid #e2e8f0; margin: 0; line-height: 1.6;">${Mensaje.replace(/\n/g, "<br>")}</p>
          ` : ""}
        </div>
        <div style="padding: 16px 24px; background: #f1f5f9; font-size: 12px; color: #94a3b8; text-align: center;">
          Enviado desde totalrepair.cl — ${new Date().toLocaleString("es-CL")}
        </div>
      </div>
    `;

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Total Repair <${fromEmail}>`,
        to: [toEmail],
        reply_to: Email,
        subject,
        html: htmlBody,
      }),
    });

    // ── 4. Notificar vía Telegram (asincrónico, no bloquea la respuesta) ────────
    const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.TELEGRAM_CHAT_ID;

    if (telegramToken && telegramChatId) {
      const requerimiento =
        Servicio === "Otro" && ServicioOtro
          ? `${Servicio} \u2014 ${ServicioOtro}`
          : Servicio;

      const telegramText =
        `\u{1F6A8} *NUEVA COTIZACI\u00d3N WEB \u2014 TOTAL REPAIR*\n` +
        `\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n` +
        `\u2022 *Nombre:* ${Nombre}\n` +
        `\u2022 *Empresa:* ${Empresa ?? "No especificada"}\n` +
        `\u2022 *Tel\u00e9fono:* ${Telefono}\n` +
        `\u2022 *Correo:* ${Email}\n` +
        `\u2022 *Tipo de Requerimiento:* ${requerimiento}\n` +
        `\u2022 *Especificaciones:* ${Mensaje ?? "Opcional"}\n` +
        `\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n` +
        `_Enviado desde totalrepair.cl_`;

      fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text: telegramText,
          parse_mode: "Markdown",
        }),
      }).catch((err) =>
        console.error("[Telegram Error] No se pudo enviar notificaci\u00f3n:", err)
      );
    }

    if (!resendRes.ok) {
      let errorData;
      try {
        errorData = await resendRes.json();
      } catch (e) {
        errorData = await resendRes.text();
      }
      console.error("[Resend Error]", errorData);
      return NextResponse.json(
        { error: "Error de configuración en el servidor de correos. Inténtalo de nuevo más tarde.", details: errorData },
        { status: 400 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[Contact API Error]", err);
    return NextResponse.json(
      { error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}
