import Link from "next/link";

const FOOTER_LINKS = [
  {
    label: "Plataforma",
    items: [
      { label: "Inicio", href: "/" },
      { label: "Cursos", href: "/courses" },
      { label: "Lives", href: "/lives" },
      { label: "Apps", href: "/tools" },
    ],
  },
  {
    label: "Comunidad",
    items: [
      { label: "Proyectos", href: "/comunidad" },
      { label: "Foro", href: "#" },
      { label: "Discord", href: "#" },
    ],
  },
  {
    label: "Soporte",
    items: [
      { label: "FAQ", href: "#" },
      { label: "Contacto", href: "#" },
      { label: "Reportar bug", href: "#" },
    ],
  },
  {
    label: "Legal",
    items: [
      { label: "Términos", href: "#" },
      { label: "Privacidad", href: "#" },
      { label: "Cookies", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="rounded-[24px] bg-[#17181B]">
      <div className="mx-auto max-w-[1440px] px-4 py-10 md:px-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {FOOTER_LINKS.map((group) => (
            <div key={group.label}>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#A8AAAE]">
                {group.label}
              </h4>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-[#A8AAAE]/60 transition-colors hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-[rgba(255,255,255,0.06)] pt-6 md:flex-row">
          <div className="flex items-center gap-4 text-sm text-[#A8AAAE]/60">
            <span className="font-bold text-[#F5C53D]">KAPITALIZANDO</span>
            <span>ES</span>
            <span>PE</span>
            <div className="flex gap-3">
              <span className="cursor-pointer transition-colors hover:text-white">🌐</span>
              <span className="cursor-pointer transition-colors hover:text-white">🐦</span>
              <span className="cursor-pointer transition-colors hover:text-white">📷</span>
              <span className="cursor-pointer transition-colors hover:text-white">📺</span>
            </div>
          </div>
          <p className="text-xs text-[#A8AAAE]/40">
            &copy; 2026 Kapitalizando S.A.C. &middot; Hecho en Per&uacute; 🇵🇪
          </p>
        </div>
      </div>
    </footer>
  );
}
