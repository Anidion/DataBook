import { endSession } from "@/services/session";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ScopedMutator } from "swr/dist/_internal";

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
      href: "/library",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Admin Dashboard",
      href: "/admin",
    },
  ],
  navMenuItems: [
    {
      label: "Library",
      href: "/library",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Admin Dashboard",
      href: "/admin",
      condition: (user: any) => {
        return user && user.isAdmin;
      },
    },
    {
      label: "Logout",
      href: "/",
      highlight: true,
      logout: async (router: AppRouterInstance, mutate: ScopedMutator) => {
        await endSession();
        mutate("/api/session");
        router.push("/");
      },
      condition: (user: any) => user && Object.keys(user).length,
    },
  ],
};
