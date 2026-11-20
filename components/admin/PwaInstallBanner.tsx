"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Download, Smartphone, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const emptySubscribe = () => () => {};

function getBrowserEnvSnapshot(): string {
  const standalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as unknown as { standalone?: boolean }).standalone ===
      true;
  const iosDevice = /iphone|ipad|ipod/.test(
    window.navigator.userAgent.toLowerCase()
  );
  const dismissed =
    window.sessionStorage.getItem("tr_pwa_dismissed") === "1";

  return `${standalone ? 1 : 0}|${iosDevice ? 1 : 0}|${dismissed ? 1 : 0}`;
}

export function PwaInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [dismissedLocally, setDismissedLocally] = useState(false);

  const envKey = useSyncExternalStore(
    emptySubscribe,
    getBrowserEnvSnapshot,
    () => "1|0|1"
  );

  const [standaloneFlag, iosFlag, sessionDismissedFlag] = envKey.split("|");
  const isStandalone = standaloneFlag === "1";
  const isIos = iosFlag === "1";
  const isDismissed = dismissedLocally || sessionDismissedFlag === "1";

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (isStandalone || isDismissed) return null;
  if (!deferredPrompt && !isIos) return null;

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === "accepted") {
      setDeferredPrompt(null);
      setDismissedLocally(true);
    }
  };

  const handleDismiss = () => {
    setDismissedLocally(true);
    window.sessionStorage.setItem("tr_pwa_dismissed", "1");
  };

  return (
    <div className="bg-orange-50 border border-[#FF5000]/30 p-4 sm:p-5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-start gap-3.5">
        <div className="w-11 h-11 bg-[#FF5000] text-white flex items-center justify-center shrink-0">
          <Smartphone className="w-6 h-6" />
        </div>
        <div>
          <p className="font-bold text-[#0F172A] text-base">
            Instala este panel como App en tu celular o computador
          </p>
          {deferredPrompt ? (
            <p className="text-sm text-zinc-700 mt-0.5">
              Tendrás el ícono de Total Repair en tu pantalla de inicio para
              subir fotos y revisar mensajes con un toque.
            </p>
          ) : (
            <p className="text-sm text-zinc-700 mt-0.5">
              En iPhone/iPad: toca el botón <strong>Compartir</strong> (cuadro
              con flecha arriba) y elige{" "}
              <strong>&quot;Agregar a inicio&quot;</strong>.
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {deferredPrompt && (
          <button
            type="button"
            onClick={handleInstall}
            className="bg-[#FF5000] hover:bg-[#CC4000] text-white font-bold text-sm px-5 py-3 inline-flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Instalar App</span>
          </button>
        )}
        <button
          type="button"
          onClick={handleDismiss}
          className="p-2.5 text-zinc-500 hover:text-[#0F172A] bg-white border border-zinc-200 cursor-pointer"
          aria-label="Ocultar aviso de instalación"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
