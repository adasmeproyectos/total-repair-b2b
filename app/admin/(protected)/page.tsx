import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  FileText,
  FolderKanban,
  Inbox,
  Palette,
  Settings,
} from "lucide-react";
import { requireAdmin } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const auth = await requireAdmin();
  if (!auth) return null;

  const { supabase, admin } = auth;

  const [leadsRes, urgentRes, projectsRes, configRes] = await Promise.all([
    supabase
      .from("contact_leads")
      .select("id", { count: "exact", head: true })
      .eq("status", "nuevo"),
    supabase
      .from("contact_leads")
      .select("id", { count: "exact", head: true })
      .eq("status", "nuevo")
      .eq("is_urgent", true),
    supabase
      .from("projects")
      .select("id", { count: "exact", head: true })
      .eq("is_published", true),
    supabase
      .from("site_config")
      .select("updated_at")
      .eq("id", "main")
      .maybeSingle(),
  ]);

  const newLeadsCount = leadsRes.count ?? 0;
  const urgentLeadsCount = urgentRes.count ?? 0;
  const publishedProjectsCount = projectsRes.count ?? 0;
  const updatedAt = configRes.data?.updated_at
    ? new Date(configRes.data.updated_at).toLocaleString("es-CL", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "Hoy";

  const cards = [
    {
      href: "/admin/proyectos",
      title: "Subir o Editar Proyectos y Fotos",
      desc: "Agrega nuevos trabajos, sube varias fotos desde tu celular, marca Antes y Después o cambia el orden en que aparecen.",
      icon: FolderKanban,
      accent: "bg-orange-50 text-[#FF5000] border-orange-200",
      action: "Administrar Proyectos",
    },
    {
      href: "/admin/contenido",
      title: "Editar Textos e Imágenes de la Web",
      desc: "Cambia cualquier título, párrafo, teléfono, pregunta frecuente, logo de cliente o foto de portada sin complicarte.",
      icon: FileText,
      accent: "bg-blue-50 text-blue-700 border-blue-200",
      action: "Editar Contenido",
    },
    {
      href: "/admin/diseno",
      title: "Cambiar Diseño, Letras y Colores",
      desc: "Elige el tipo y tamaño de letra, colores, espacios, líneas y cuadros viendo los cambios en vivo antes de guardar.",
      icon: Palette,
      accent: "bg-emerald-50 text-emerald-700 border-emerald-200",
      action: "Abrir Editor Visual",
    },
    {
      href: "/admin/solicitudes",
      title: "Ver Mensajes y Cotizaciones",
      desc: "Revisa todas las solicitudes enviadas desde la web y contesta por WhatsApp, correo o teléfono con un solo toque.",
      icon: Inbox,
      accent: "bg-amber-50 text-amber-700 border-amber-200",
      action: "Abrir Bandeja",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Saludo principal */}
      <div className="bg-white border border-zinc-200 p-6 sm:p-8 shadow-2xs">
        <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF5000] mb-2">
          Bienvenida al Panel Total Repair
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
          Hola, {admin.display_name || "Administradora"}
        </h1>
        <p className="text-zinc-600 text-base sm:text-lg mt-2 max-w-2xl leading-relaxed">
          Desde aquí puedes manejar toda tu página web de forma segura. Cada
          cambio se guarda con respaldo por si alguna vez quieres volver atrás.
        </p>
      </div>

      {/* Métricas rápidas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <Link
          href="/admin/solicitudes"
          className="bg-white border border-zinc-200 hover:border-[#FF5000] p-6 transition-colors flex items-center justify-between"
        >
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-zinc-500">
              Solicitudes Nuevas
            </p>
            <p className="font-display text-4xl font-black text-[#0F172A] mt-1">
              {newLeadsCount}
            </p>
            {urgentLeadsCount > 0 && (
              <p className="text-xs font-bold text-red-600 mt-1 inline-flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{urgentLeadsCount} urgente(s) 24/7</span>
              </p>
            )}
          </div>
          <div className="w-12 h-12 bg-orange-50 text-[#FF5000] flex items-center justify-center shrink-0">
            <Inbox className="w-6 h-6" />
          </div>
        </Link>

        <Link
          href="/admin/proyectos"
          className="bg-white border border-zinc-200 hover:border-[#FF5000] p-6 transition-colors flex items-center justify-between"
        >
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-zinc-500">
              Proyectos Visibles
            </p>
            <p className="font-display text-4xl font-black text-[#0F172A] mt-1">
              {publishedProjectsCount}
            </p>
            <p className="text-xs text-zinc-500 mt-1">
              Publicados en el portafolio
            </p>
          </div>
          <div className="w-12 h-12 bg-zinc-100 text-[#0F172A] flex items-center justify-center shrink-0">
            <FolderKanban className="w-6 h-6" />
          </div>
        </Link>

        <Link
          href="/admin/configuracion"
          className="bg-white border border-zinc-200 hover:border-[#FF5000] p-6 transition-colors flex items-center justify-between"
        >
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-zinc-500">
              Última Actualización
            </p>
            <p className="font-display text-lg sm:text-xl font-bold text-[#0F172A] mt-2">
              {updatedAt}
            </p>
            <p className="text-xs text-[#FF5000] font-semibold mt-1">
              Ver historial de copias →
            </p>
          </div>
          <div className="w-12 h-12 bg-zinc-100 text-[#0F172A] flex items-center justify-center shrink-0">
            <Settings className="w-6 h-6" />
          </div>
        </Link>
      </div>

      {/* 4 Tarjetas Gigantes de Acción */}
      <div>
        <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0F172A] mb-4">
          ¿Qué quieres hacer hoy?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.href}
                href={card.href}
                className="group bg-white border-2 border-zinc-200 hover:border-[#FF5000] p-6 sm:p-8 flex flex-col justify-between gap-6 transition-all shadow-2xs hover:shadow-md"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-14 h-14 border flex items-center justify-center shrink-0 ${card.accent}`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-[#0F172A] group-hover:text-[#FF5000] transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-zinc-600 text-sm sm:text-base mt-2 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-end text-sm font-bold uppercase tracking-wider text-[#FF5000]">
                  <span>{card.action}</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
