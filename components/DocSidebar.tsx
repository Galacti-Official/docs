"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { docsNav, type NavSection } from "@/lib/docs-nav";

function SidebarSection({
  section,
  pathname,
  onNavigate,
}: {
  section: NavSection;
  pathname: string;
  onNavigate: () => void;
}) {
  const containsActive = section.items.some((item) => item.href === pathname);
  const [open, setOpen] = useState(containsActive || section.defaultOpen !== false);

  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-md px-3 py-1.5 mb-0.5 group hover:bg-white/5 transition-colors"
      >
        <span className="font-subheading text-[10px] uppercase tracking-[0.18em] text-white/50 group-hover:text-white/75 transition-colors">
          {section.title}
        </span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-white/40 group-hover:text-white/70 transition-all duration-200 ${
            open ? "rotate-0" : "-rotate-90"
          }`}
        />
      </button>

      <div
        className={`grid transition-all duration-200 ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <ul className="space-y-0.5 pb-2">
            {section.items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className={`block rounded-md px-3 py-1.5 text-sm transition-colors ${
                    pathname === item.href
                      ? "bg-white/10 text-white font-medium"
                      : "text-white/55 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function DocSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const nav = (
    <nav className="px-4 py-6 space-y-4">
      {docsNav.map((section) => (
        <SidebarSection
          key={section.title}
          section={section}
          pathname={pathname}
          onNavigate={() => setMobileOpen(false)}
        />
      ))}
    </nav>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:block sticky top-[4.5rem] h-[calc(100vh-4.5rem)] w-60 shrink-0 overflow-y-auto border-r border-white/10">
        {nav}
      </aside>

      {/* Mobile toggle button */}
      <button
        className="fixed bottom-5 right-5 z-50 md:hidden flex items-center gap-2 rounded-full border border-white/15 bg-zinc-900 px-4 py-2.5 text-sm text-white shadow-xl"
        onClick={() => setMobileOpen((v) => !v)}
        aria-label="Toggle navigation"
      >
        {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        <span>{mobileOpen ? "Close" : "Menu"}</span>
      </button>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-x-0 top-[var(--navbar-height)] bottom-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`fixed left-0 top-[var(--navbar-height)] bottom-0 z-50 w-72 overflow-y-auto bg-zinc-950 border-r border-white/10 transition-transform duration-200 md:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
          <span className="font-subheading text-xs uppercase tracking-widest text-white/50">
            Docs
          </span>
          <button
            onClick={() => setMobileOpen(false)}
            className="rounded-md p-1.5 text-white/50 hover:bg-white/10 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        {nav}
      </aside>
    </>
  );
}
