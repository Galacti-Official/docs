"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { X, Search } from "lucide-react";
import Image from "next/image";
import SearchModal from "@/components/SearchModal";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showConstructionBar, setShowConstructionBar] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function updateNavbarHeight() {
      if (navRef.current) {
        document.documentElement.style.setProperty(
          "--navbar-height",
          `${navRef.current.offsetHeight}px`
        );
      }
    }
    updateNavbarHeight();
    window.addEventListener("resize", updateNavbarHeight);
    return () => window.removeEventListener("resize", updateNavbarHeight);
  }, [showConstructionBar]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setSearchOpen(false);
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <nav ref={navRef} className="fixed inset-x-0 top-0 z-50 w-full border-b border-white/10 bg-black">
      {showConstructionBar && (
        <div className="border-b border-white/10 bg-accent px-4 py-2 text-sm text-black">
          <div className="mx-auto flex max-w-screen-2xl items-center justify-between gap-3">
            <div className="flex flex-1 justify-center">
              <div className="flex items-center justify-center gap-3 text-center">
                <span className="shrink-0 rounded-full border border-black/15 bg-black/35 px-2.5 py-1 text-[11px] text-white/80 font-semibold uppercase tracking-[0.18em]">
                  Notice
                </span>
                <span className="min-w-0 text-sm text-white/80 font-medium">
                  Website under construction. Some pages and features may be unavailable.
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowConstructionBar(false)}
              className="shrink-0 rounded-full px-2.5 py-1 text-xs text-white/80 transition hover:bg-black/10 hover:text-black"
              aria-label="Hide construction notice"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      <div className="flex w-full items-center gap-4 px-4 py-4">
        {/* Left: Logo */}
        <div className="hidden min-[880px]:flex flex-1 items-center">
          <Link href="/" className="shrink-0">
            <Image
              src="/galacti.svg"
              alt="Galacti Logo"
              width={680}
              height={160}
              priority
              className="h-auto w-[8.75rem] sm:w-[10rem] lg:w-[11.5rem] xl:w-[12.5rem]"
            />
          </Link>
        </div>

        {/* Mobile: Logo */}
        <div className="min-[880px]:hidden">
          <Link href="/" className="shrink-0">
            <Image
              src="/galacti.svg"
              alt="Galacti Logo"
              width={680}
              height={160}
              priority
              className="h-auto w-[8.75rem] sm:w-[10rem]"
            />
          </Link>
        </div>

        {/* Search button — desktop */}
        <button
          onClick={() => setSearchOpen(true)}
          className="hidden min-[880px]:inline-flex w-full min-w-[18rem] max-w-[42rem] items-center gap-2 rounded-md border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-white/50 transition hover:border-white/25 hover:bg-white/10 hover:text-white/80"
        >
          <Search className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>Search...</span>
          <kbd className="ml-1 inline-flex items-center rounded border border-white/15 px-1.5 py-0.5 text-[10px] font-medium text-white/35">
            Ctrl + K
          </kbd>
        </button>

        {/* Log in — desktop */}
        <div className="hidden min-[880px]:flex flex-1 items-center justify-end">
          <div>
            <Link
              href="https://dashboard.galacti.org/login"
              className="rounded-md bg-white px-4 py-2 text-center font-bold text-black transition hover:bg-white/90"
            >
              My Account
            </Link>
          </div>
        </div>

        {/* Mobile: search icon + hamburger */}
        <div className="ml-auto flex items-center gap-2 min-[880px]:hidden">
          <button
            onClick={() => setSearchOpen(true)}
            className="rounded-md p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            className="rounded-md px-3 py-2 transition hover:bg-white/10"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? (
              <Image src="/close.svg" alt="Close menu" width={32} height={32} />
            ) : (
              <Image src="/menu.svg" alt="Open menu" width={32} height={32} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black min-[880px]:hidden">
          <div className="h-full overflow-y-auto px-4 py-6 space-y-6 border-t border-white/10">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
              <Image
                src="/galacti.svg"
                alt="Galacti Logo"
                width={680}
                height={160}
                className="h-auto w-[9.75rem] sm:w-[10.75rem]"
              />
              <button
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-2 py-2 transition hover:bg-white/10"
              >
                <Image src="/close.svg" alt="Close menu" width={32} height={32} />
              </button>
            </div>

            {/* Search */}
            <button
              onClick={() => { setMobileOpen(false); setSearchOpen(true); }}
              className="flex w-full items-center gap-3 rounded-md border border-white/15 bg-white/5 px-4 py-2.5 text-left text-sm text-white/50"
            >
              <Search className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Search...</span>
            </button>

            {/* Log in */}
            <Link
              href="https://dashboard.galacti.org/login"
              onClick={() => setMobileOpen(false)}
              className="block text-center rounded-md bg-white text-black py-2 font-bold hover:bg-white/90 transition"
            >
              Log in
            </Link>
          </div>
        </div>
      )}

      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </nav>
  );
}
