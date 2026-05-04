"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { slugify } from "@/lib/slugify";

type Heading = { id: string; text: string; level: number };

export default function TableOfContents() {
  const pathname = usePathname();
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll("article h2, article h3")
    ) as HTMLElement[];

    els.forEach((el) => {
      if (!el.id && el.textContent) {
        el.id = slugify(el.textContent);
      }
    });

    const hs = els.map((el) => ({
      id: el.id,
      text: el.textContent ?? "",
      level: el.tagName === "H2" ? 2 : 3,
    }));

    setHeadings(hs);
    setActive(hs[0]?.id ?? "");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-80px 0px -55% 0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  if (headings.length === 0) return null;

  return (
    <aside className="dashboard-scrollbar hidden xl:block sticky top-[var(--navbar-height)] h-[calc(100vh-var(--navbar-height))] w-52 shrink-0 overflow-y-auto bg-black border-l border-white/10 px-5 py-8">
      <p className="mb-3 font-subheading text-[10px] uppercase tracking-[0.18em] text-white/40">
        On this page
      </p>
      <ul className="space-y-1">
        {headings.map((h) => (
          <li key={h.id} className={h.level === 3 ? "pl-3" : ""}>
            <a
              href={`#${h.id}`}
              className={`block py-0.5 text-sm transition-colors ${
                active === h.id
                  ? "text-white"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
