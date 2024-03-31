import { useSWRConfig } from "swr";
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
      label: "Logout",
      href: "/",
      logout: async (router: AppRouterInstance, mutate: ScopedMutator) => {
        await endSession();
        mutate("/api/session");
        router.push("/");
      },
      condition: (user: any) => user && Object.keys(user).length,
    },
  ],
};
