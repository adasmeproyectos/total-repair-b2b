import { NextResponse } from "next/server";

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
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
    } = body;

    // Validate required fields and basic lengths
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

    const safeNombre = escapeHtml(nombre.trim().slice(0, 120));
    const safeEmpresa = escapeHtml(
      (typeof empresa === "string" && empresa.trim()
        ? empresa.trim()
        : "No especificada"
      ).slice(0, 150)
    );
    const safeTelefono = escapeHtml(telefono.trim().slice(0, 50));
    const safeCorreo = escapeHtml(correo.trim().slice(0, 150));

    const rawRequirement =
      tipoRequerimiento === "Otro" &&
      typeof especificacionOtro === "string" &&
      especificacionOtro.trim()
        ? `Otro: ${especificacionOtro.trim()}`
        : tipoRequerimiento.trim();
    const safeRequirement = escapeHtml(rawRequirement.slice(0, 200));

    const safeEspecificaciones = escapeHtml(
      (typeof especificaciones === "string" && especificaciones.trim()
        ? especificaciones.trim()
        : "Ninguna"
      ).slice(0, 1500)
    );

    const message = [
      "🚨 <b>NUEVA COTIZACIÓN WEB - TOTAL REPAIR LTDA.</b>",
      `• <b>Nombre:</b> ${safeNombre}`,
      `• <b>Empresa:</b> ${safeEmpresa}`,
      `• <b>Teléfono:</b> ${safeTelefono}`,
      `• <b>Correo:</b> ${safeCorreo}`,
      `• <b>Tipo de Requerimiento:</b> ${safeRequirement}`,
      `• <b>Especificaciones:</b> ${safeEspecificaciones}`,
    ].join("\n");

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error("Missing Telegram environment variables");
      return NextResponse.json(
        { error: "Error de configuración del servidor" },
        { status: 500 }
      );
    }

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        parse_mode: "HTML",
        text: message,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Telegram API Error:", errorText);
      return NextResponse.json(
        { error: "Error al enviar el mensaje" },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
