"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, Lock } from "lucide-react";
import { PORTAL_BASE_PATH } from "@/lib/portal-config";

export function PasswordSignInForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError("Escribe tu contraseña para entrar.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/portal-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(
          data.error ||
            "Contraseña incorrecta. Revisa si tienes activadas las mayúsculas e intenta nuevamente."
        );
        setLoading(false);
        return;
      }

      router.push(PORTAL_BASE_PATH);
      router.refresh();
    } catch {
      setError("No se pudo conectar con el servidor. Verifica tu internet.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <label
          htmlFor="admin-password"
          className="block text-sm font-bold text-[#141413] uppercase tracking-wider"
        >
          Contraseña de acceso
        </label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none">
            <Lock className="w-5 h-5" />
          </div>
          <input
            id="admin-password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Escribe tu contraseña..."
            className="w-full min-h-[56px] bg-zinc-50 border-2 border-zinc-300 focus:border-[#E8490F] focus:bg-white pl-12 pr-14 py-3 text-lg text-[#141413] focus:outline-none transition-colors"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-zinc-600 hover:text-[#141413] cursor-pointer"
            aria-label={
              showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
            }
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
        <p className="text-xs text-zinc-500">
          Puedes tocar el ícono del ojo para ver lo que estás escribiendo.
        </p>
      </div>

      {error && (
        <div className="text-sm font-medium text-red-700 bg-red-50 border-l-4 border-red-500 p-3.5">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full min-h-[58px] bg-[#E8490F] hover:bg-[#C23908] text-white font-bold uppercase tracking-wider text-base px-6 py-4 flex items-center justify-center gap-2.5 transition-colors shadow-sm cursor-pointer disabled:opacity-60"
      >
        {loading && <Loader2 className="w-5 h-5 animate-spin" />}
        <span>{loading ? "Entrando al panel..." : "Entrar al Panel"}</span>
      </button>
    </form>
  );
}
