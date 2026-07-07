"use client";

/**
 * components/contact/TurnstileWidget.tsx
 * Widget de Cloudflare Turnstile para protección anti-bot (gratuito, sin límite).
 *
 * CONFIGURACIÓN:
 *   1. Registrar dominio en cloudflare.com/products/turnstile
 *   2. Añadir NEXT_PUBLIC_TURNSTILE_SITE_KEY en .env.local
 *   3. Añadir TURNSTILE_SECRET_KEY en .env.local (solo server-side)
 */

import Script from "next/script";
import { useEffect, useRef } from "react";

interface TurnstileWidgetProps {
  onSuccess: (token: string) => void;
  onError?: () => void;
  theme?: "dark" | "light" | "auto";
}

declare global {
  interface Window {
    turnstile?: {
      render: (container: string | HTMLElement, options: Record<string, unknown>) => string;
      reset: (widgetId: string) => void;
    };
    onTurnstileLoad?: () => void;
  }
}

export function TurnstileWidget({
  onSuccess,
  onError,
  theme = "dark",
}: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    if (!siteKey) {
      // En desarrollo sin key, simular éxito para no bloquear pruebas
      if (process.env.NODE_ENV === "development") {
        onSuccess("dev-bypass-token");
      }
      return;
    }

    const render = () => {
      if (containerRef.current && window.turnstile) {
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          theme,
          callback: onSuccess,
          "error-callback": onError,
          size: "normal",
        });
      }
    };

    if (window.turnstile) {
      render();
    } else {
      window.onTurnstileLoad = render;
    }

    return () => {
      // Limpiar widget al desmontar
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.reset(widgetIdRef.current);
        } catch {}
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteKey]);

  if (!siteKey) {
    // En desarrollo, mostrar placeholder visual
    return (
      <div className="h-16 border border-dashed border-zinc-300 flex items-center justify-center text-xs text-zinc-400 font-mono">
        TURNSTILE · Añadir NEXT_PUBLIC_TURNSTILE_SITE_KEY en .env.local
      </div>
    );
  }

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad"
        strategy="lazyOnload"
      />
      <div ref={containerRef} className="my-2" />
    </>
  );
}
