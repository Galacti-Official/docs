"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { docsNav } from "@/lib/docs-nav";

const allItems = docsNav.flatMap((section) => section.items);

export default function DocPagination() {
  const pathname = usePathname().replace(/\/$/, "") || "/";
  const index = allItems.findIndex((item) => item.href === pathname);

  if (index === -1) return null;

  const prev = index > 0 ? allItems[index - 1] : null;
  const next = index < allItems.length - 1 ? allItems[index + 1] : null;

  if (!prev && !next) return null;

  return (
    <div className="not-prose mt-12 flex items-stretch gap-3 border-t border-white/10 pt-6">
      {prev ? (
        <Link
          href={prev.href}
          className="group flex flex-1 items-center gap-3 rounded-lg border border-white/10 px-4 py-4 transition-colors hover:border-white/20 hover:bg-white/[0.03]"
        >
          <ChevronLeft className="h-4 w-4 shrink-0 text-white/30 transition-colors group-hover:text-white/60" />
          <div className="min-w-0">
            <p className="font-subheading mb-0.5 text-[10px] uppercase tracking-[0.15em] text-white/35">
              Previous
            </p>
            <p className="truncate text-sm text-white/70 transition-colors group-hover:text-white">
              {prev.title}
            </p>
          </div>
        </Link>
      ) : null}

      {next ? (
        <Link
          href={next.href}
          className="group flex flex-1 items-center justify-end gap-3 rounded-lg border border-white/10 px-4 py-4 text-right transition-colors hover:border-white/20 hover:bg-white/[0.03]"
        >
          <div className="min-w-0">
            <p className="font-subheading mb-0.5 text-[10px] uppercase tracking-[0.15em] text-white/35">
              Next
            </p>
            <p className="truncate text-sm text-white/70 transition-colors group-hover:text-white">
              {next.title}
            </p>
          </div>
          <ChevronRight className="h-4 w-4 shrink-0 text-white/30 transition-colors group-hover:text-white/60" />
        </Link>
      ) : null}
    </div>
  );
}
