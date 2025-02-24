"use client";
import * as React from "react";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { useDisclosure } from "@heroui/react";
import { Button } from "@heroui/button";
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  UserIcon,
  SearchIcon,
  Logo,
} from "@/components/icons";
import LoginModal from "./LoginModal";
import { useRouter } from 'next/navigation';


export const Navbar = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const router = useRouter();

  return (
    <>
      <LoginModal isOpen={isOpen} onOpenChange={onOpenChange} />
      <HeroUINavbar maxWidth="xl" position="sticky" isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <NextLink className="flex justify-start items-center gap-1" href="/">
              <Logo />
              <p className="font-bold text-inherit text-lg">IRS</p>
            </NextLink>
          </NavbarBrand>
          <ul className="hidden lg:flex gap-4 justify-start ml-2">
            {siteConfig.navItems.map((item) => (
              <NavbarItem key={item.href}>
                <NextLink
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-primary data-[active=true]:font-medium"
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

        <NavbarContent
          className="hidden sm:flex basis-1/5 sm:basis-full"
          justify="end"
        >
          <NavbarItem className="hidden sm:flex gap-2">
            <Link isExternal aria-label="Twitter" href={siteConfig.links.twitter}>
              <TwitterIcon className="text-default-500" />
            </Link>
            <Link isExternal aria-label="Discord" href={siteConfig.links.discord}>
              <DiscordIcon className="text-default-500" />
            </Link>
            <Link isExternal aria-label="Github" href={siteConfig.links.github}>
              <GithubIcon className="text-default-500" />
            </Link>
            <ThemeSwitch />
            <Button
              className="text-sm font-normal text-default-600 bg-default-100 inline-flex items-center min-w-[120px] px-4"
              startContent={<UserIcon className="text-danger" />}
              variant="flat"
              onPress={onOpen}
            >
              Login
            </Button>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
          <Link isExternal aria-label="Github" href={siteConfig.links.github}>
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
          <Button
            className="text-sm font-normal text-default-600 bg-default-100 inline-flex min-w-[120px] px-4"
            startContent={<UserIcon className="text-danger" />}
            variant="flat"
            onPress={onOpen}
          >
            Login
          </Button>
          <NavbarMenuToggle />
        </NavbarContent>

        {isMenuOpen && (
          <NavbarMenu>
            <div className="mx-4 mt-2 flex flex-col gap-2">
              {siteConfig.navMenuItems.map((item, index) => (
                <NavbarMenuItem key={`${item}-${index}`}>
                  <Link
                    color={
                      index === 2
                        ? "primary"
                        : index === siteConfig.navMenuItems.length - 1
                        ? "danger"
                        : "foreground"
                    }
                    size="lg"
                    href={item.href}
                    onPress={() => {setIsMenuOpen(false); router.push(item.href)}}
                  >
                    {item.label}
                  </Link>
                </NavbarMenuItem>
              ))}
            </div>
          </NavbarMenu>
        )}
      </HeroUINavbar>
    </>
  );
};
