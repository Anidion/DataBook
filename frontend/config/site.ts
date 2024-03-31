export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "DataBook",
  description: "Your Own Personal Digital Library",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Library",
      href: "/docs",
    },
    {
      label: "Dashboard",
      href: "/pricing",
    },
  ],
  navMenuItems: [
    {
      label: "Library",
      href: "/docs",
    },
    {
      label: "Dashboard",
      href: "/pricing",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
};
