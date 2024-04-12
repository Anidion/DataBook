"use client";

import { useState } from "react";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";

import { Link } from "@nextui-org/link";

import { link as linkStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";

import { ThemeSwitch } from "@/components/theme-switch";

import { Logo } from "@/components/icons";
import { useSwrRequest } from "@/services/useSwrRequest";
import { Spinner } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useSWRConfig } from "swr";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: user, error, isLoading } = useSwrRequest("/api/session");
  const router = useRouter();
  const { mutate } = useSWRConfig();

  return (
    <NextUINavbar
      maxWidth="xl"
      position="sticky"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="max-w-fit gap-3">
          <NextLink className="flex items-center justify-start gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">DataBook</p>
          </NextLink>
        </NavbarBrand>
        <ul className="ml-2 hidden justify-start gap-4 lg:flex">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:font-medium data-[active=true]:text-primary",
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent className="basis-1 pl-4" justify="end">
        {isLoading ? (
          <Spinner size="sm" color="secondary" />
        ) : user && Object.keys(user).length ? (
          `Logged in as ${user.username}`
        ) : (
          "Logged Out"
        )}
      </NavbarContent>

      <NavbarContent>
        <ThemeSwitch />
      </NavbarContent>

      <NavbarContent className="basis-1 pl-4 sm:hidden" justify="end">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) =>
            item?.condition && !item?.condition(user) ? null : (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  color={item.highlight ? "danger" : "foreground"}
                  href={item.href ?? "#"}
                  onClick={
                    item.logout
                      ? () => item.logout(router, mutate)
                      : () => setIsMenuOpen(false)
                  }
                  size="lg"
                >
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ),
          )}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
