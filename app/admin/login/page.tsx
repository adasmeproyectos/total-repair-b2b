import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PasswordSignInForm } from "@/components/admin/PasswordSignInForm";

export const metadata: Metadata = {
  title: "Acceso Administración",
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
    <div className="min-h-screen bg-[#141413] flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md bg-white border border-zinc-200 shadow-2xl overflow-hidden">
        {/* Cabecera industrial de alto contraste */}
        <div className="bg-[#1C1C1A] border-b-4 border-[#FF5000] px-8 py-7 flex flex-col items-center text-center">
          <div className="relative w-14 h-14 mb-3 bg-white/5 p-2 border border-white/10">
            <Image
              src="/img/logos/logo.png"
              alt="Total Repair Ltda."
              fill
              sizes="56px"
              className="object-contain p-1"
              priority
            />
          </div>
          <span className="text-[11px] font-mono font-bold uppercase tracking-[0.22em] text-[#FF5000] mb-1">
            Panel Autoadministrable
          </span>
          <h1 className="font-display text-3xl font-black text-white tracking-tight uppercase">
            TOTAL <span className="text-[#FF5000]">REPAIR</span>
          </h1>
          <p className="text-zinc-300 text-sm mt-2 leading-relaxed">
            Ingresa tu clave para editar proyectos, fotos, diseño y revisar
            cotizaciones.
          </p>
        </div>

        <div className="p-7 sm:p-9">
          {error === "unauthorized" && (
            <div className="mb-6 bg-amber-50 border-l-4 border-amber-500 p-4 text-sm text-amber-900 leading-relaxed">
              <p className="font-bold mb-1">Sesión sin autorización</p>
              <p>Ingresa nuevamente con tu contraseña de administración.</p>
            </div>
          )}

          <PasswordSignInForm />

          <div className="mt-7 pt-5 border-t border-zinc-200 text-center">
            <Link
              href="/"
              className="text-sm font-medium text-zinc-600 hover:text-[#FF5000] transition-colors"
            >
              ← Volver a la página pública (totalrepair.cl)
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
