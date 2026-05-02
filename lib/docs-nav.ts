export type NavItem = {
  title: string;
  href: string;
};

export type NavSection = {
  title: string;
  items: NavItem[];
  defaultOpen?: boolean;
};

export const docsNav: NavSection[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/" },
      { title: "Quick Start", href: "/quick-start" },
    ],
  },
  {
    title: "Platform",
    items: [
      { title: "Overview", href: "/platform" },
      { title: "Galacti Labs", href: "/platform/labs" },
      { title: "Galacti Atlas", href: "/platform/atlas" },
      { title: "Game Server Hosting", href: "/platform/hosting" },
    ],
  },
  {
    title: "API Reference",
    items: [
      { title: "Andromeda API", href: "/api" },
      { title: "Authentication", href: "/api/authentication" },
      { title: "Endpoints", href: "/api/endpoints" },
    ],
  },
  {
    title: "Legal",
    items: [
      { title: "Terms of Service", href: "/terms" },
      { title: "Privacy Policy", href: "/privacy" },
    ],
  },
];
