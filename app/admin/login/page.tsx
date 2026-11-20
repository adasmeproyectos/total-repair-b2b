import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { GoogleSignInButton } from "@/components/admin/GoogleSignInButton";

export const metadata: Metadata = {
  title: "Acceso Administración | Total Repair Ltda.",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const error = params.error;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md bg-white border border-zinc-200 shadow-lg p-8 sm:p-10">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="relative w-16 h-16 mb-4">
            <Image
              src="/img/logos/logo.png"
              alt="Total Repair Ltda."
              fill
              sizes="64px"
              className="object-contain"
              priority
            />
          </div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF5000] mb-2">
            Panel Autoadministrable
          </span>
          <h1 className="font-display text-3xl font-black text-[#0F172A] tracking-tight">
            TOTAL <span className="text-[#FF5000]">REPAIR</span>
          </h1>
          <p className="text-zinc-600 text-base mt-3 leading-relaxed">
            Inicia sesión con tu cuenta de Google autorizada para editar fotos,
            textos, diseño y revisar solicitudes.
          </p>
        </div>

        {error === "unauthorized" && (
          <div className="mb-6 bg-amber-50 border-l-4 border-amber-500 p-4 text-sm text-amber-900 leading-relaxed">
            <p className="font-bold mb-1">Cuenta no autorizada</p>
            <p>
              Ese correo de Google no tiene permiso para entrar al panel. Pídele
              al administrador que agregue ese correo en{" "}
              <strong>Ajustes → Usuarios</strong> o prueba con otra cuenta.
            </p>
          </div>
        )}

        {error === "auth_failed" && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 text-sm text-red-900 leading-relaxed">
            <p className="font-bold mb-1">No se pudo completar el ingreso</p>
            <p>
              Vuelve a tocar el botón de Google para intentarlo nuevamente.
            </p>
          </div>
        )}

        <GoogleSignInButton />

        <div className="mt-8 pt-6 border-t border-zinc-200 text-center">
          <Link
            href="/"
            className="text-sm font-medium text-zinc-600 hover:text-[#FF5000] transition-colors"
          >
            ← Volver a la página pública (totalrepair.cl)
          </Link>
        </div>
      </div>
    </div>
  );
}
