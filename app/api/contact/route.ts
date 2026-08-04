import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nombre, empresa, telefono, correo, tipoRequerimiento, especificacionOtro, especificaciones } = body;

    // Validate required fields
    if (!nombre || !telefono || !correo || !tipoRequerimiento) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    const requirementText = tipoRequerimiento === "Otro" && especificacionOtro
      ? `Otro: ${especificacionOtro}`
      : tipoRequerimiento;

    const message = `🚨 *NUEVA COTIZACIÓN WEB - TOTAL REPAIR*
• *Nombre:* ${nombre}
• *Empresa:* ${empresa || 'No especificada'}
• *Teléfono:* ${telefono}
• *Correo:* ${correo}
• *Tipo de Requerimiento:* ${requirementText}
• *Especificaciones:* ${especificaciones || 'Ninguna'}`;

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error("Missing Telegram environment variables");
      // Still return success to user so UI doesn't break, or return error depending on requirements.
      // Returning error is safer to let the user know it failed.
      return NextResponse.json({ error: "Error de configuración del servidor" }, { status: 500 });
    }

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        parse_mode: "Markdown",
        text: message,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Telegram API Error:", errorText);
      return NextResponse.json({ error: "Error al enviar el mensaje" }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
