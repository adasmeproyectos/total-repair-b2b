"use client";

/**
 * components/ui/ServiceCard.tsx
 * Tarjeta de servicio reutilizable — unifica los estilos de Empresas (bento)
 * y Hogar (card con ícono).
 */

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  /** bento: fondo oscuro + imagen (B2B) | card: fondo con ícono (Hogar) | minimal: lista */
  variant: "bento" | "card" | "minimal";
  title: string;
  description?: string;
  icon?: React.ReactNode;
  image?: string;
  imageAlt?: string;
  /** Eyebrow label sobre el título */
  label?: string;
  /** Link de la tarjeta */
  href?: string;
  /** Tarjeta principal grande (solo en bento) */
  featured?: boolean;
  /** Badge animado ej: "Atención 24/7" */
  badge?: string;
  className?: string;
}

export function ServiceCard({
  variant,
  title,
  description,
  icon,
  image,
  imageAlt = "",
  label,
  href,
  featured = false,
  badge,
  className,
}: ServiceCardProps) {

  if (variant === "bento") {
    return (
      <motion.div
        whileHover={{ borderColor: "#E85B0C" }}
        className={cn(
          "relative border border-zinc-700 bg-zinc-800/40 overflow-hidden group flex flex-col justify-end transition-colors duration-500",
          featured ? "p-10" : "p-8",
          className
        )}
      >
        {/* Imagen de fondo */}
        {image && (
          <>
            <Image
              src={image}
              alt={imageAlt}
              fill
              className="object-cover opacity-20 group-hover:opacity-30 scale-105 group-hover:scale-110 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/60 to-transparent" />
          </>
        )}

        <div className="relative z-10">
          {badge && (
            <span className="inline-block bg-orange-600/20 text-orange-500 border border-orange-600/50 px-3 py-1 text-xs font-bold uppercase tracking-widest mb-4 animate-pulse">
              {badge}
            </span>
          )}
          {label && (
            <span className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-3 block">
              {label}
            </span>
          )}
          <h3 className={cn("font-bold text-white mb-3", featured ? "text-3xl" : "text-xl")}>
            {title}
          </h3>
          {description && (
            <p className={cn("text-zinc-400", featured ? "max-w-md" : "text-sm")}>
              {description}
            </p>
          )}
          {href && (
            <Link
              href={href}
              className="relative z-10 mt-6 text-orange-500 text-sm font-bold uppercase tracking-widest flex items-center gap-2 hover:text-orange-400"
            >
              Ver más{" "}
              <span className="text-lg">→</span>
            </Link>
          )}
        </div>
      </motion.div>
    );
  }

  if (variant === "card") {
    return (
      <motion.div
        whileHover={{ y: -4 }}
        className={cn(
          "bg-white border border-gray-100 p-8 shadow-sm hover:shadow-md transition-all duration-300 group",
          className
        )}
      >
        {icon && (
          <div className="w-14 h-14 bg-orange-50 border border-orange-100 flex items-center justify-center mb-6 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
            {icon}
          </div>
        )}
        {image && (
          <div className="relative h-40 mb-6 overflow-hidden">
            <Image
              src={image}
              alt={imageAlt}
              fill
              className="object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
            />
          </div>
        )}
        <h3 className="text-lg font-bold text-zinc-900 mb-3 group-hover:text-[#E85B0C] transition-colors">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-zinc-500 leading-relaxed">{description}</p>
        )}
        {href && (
          <Link
            href={href}
            className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-orange-600 hover:text-orange-700 uppercase tracking-wider"
          >
            Saber más <span>→</span>
          </Link>
        )}
      </motion.div>
    );
  }

  // variant === "minimal"
  return (
    <div className={cn("flex items-start gap-4 py-4 border-b border-zinc-200 last:border-0", className)}>
      {icon && <div className="text-orange-500 shrink-0 mt-0.5">{icon}</div>}
      <div>
        <h3 className="font-bold text-zinc-900 text-sm mb-1">{title}</h3>
        {description && <p className="text-xs text-zinc-500">{description}</p>}
      </div>
    </div>
  );
}
