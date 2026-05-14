import { ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  href?: string;
}

export function SectionHeader({ title, subtitle, href }: SectionHeaderProps) {
  return (
    <div className="mb-4 flex items-end justify-between">
      <div>
        <h2 className="text-lg font-semibold text-[#101012]">{title}</h2>
        {subtitle && (
          <p className="mt-0.5 text-sm text-[#6B6F72]">{subtitle}</p>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className="flex items-center gap-0.5 text-sm font-medium text-[#F04A8A] transition-colors hover:text-[#F04A8A]/80"
        >
          Ver todo
          <ChevronRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
