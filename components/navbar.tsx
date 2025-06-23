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
import {
  useDisclosure,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { Button } from "@heroui/react";
import { Link } from "@heroui/react";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { useRouter } from "next/navigation";

import LoginModal from "./LoginModal";

import { authEvents } from "@/lib/authEvents";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  UserIcon,
  Logo,
} from "@/components/icons";

export const Navbar = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const router = useRouter();

  // Check authentication on initial load
  React.useEffect(() => {
    const token = localStorage.getItem("access_token");

    setIsAuthenticated(!!token);
  }, []);

  // Listen for authentication events
  React.useEffect(() => {
    // Handle login events
    const unsubscribeLogin = authEvents.onLogin(() => {
      console.log("Login event detected");
      setIsAuthenticated(true);
    });

    // Handle logout events
    const unsubscribeLogout = authEvents.onLogout(() => {
      console.log("Logout event detected");
      setIsAuthenticated(false);
    });

    // Clean up event listeners
    return () => {
      unsubscribeLogin();
      unsubscribeLogout();
    };
  }, []);

  // Handle logout action
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    authEvents.emitLogout();
    window.location.href = "/";
  };

  return (
    <>
      <LoginModal isOpen={isOpen} onOpenChange={onOpenChange} />
      <HeroUINavbar
        isMenuOpen={isMenuOpen}
        maxWidth="xl"
        position="sticky"
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <NextLink
              className="flex justify-start items-center gap-1"
              href="/"
            >
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
                    "data-[active=true]:text-primary data-[active=true]:font-medium",
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
            <Link
              isExternal
              aria-label="Twitter"
              href={siteConfig.links.twitter}
            >
              <TwitterIcon className="text-default-500" />
            </Link>
            <Link
              isExternal
              aria-label="Discord"
              href={siteConfig.links.discord}
            >
              <DiscordIcon className="text-default-500" />
            </Link>
            <Link isExternal aria-label="Github" href={siteConfig.links.github}>
              <GithubIcon className="text-default-500" />
            </Link>
            <ThemeSwitch />
            {isAuthenticated ? (
              // <Button
              //   className="text-sm font-normal text-default-600 bg-default-100 inline-flex items-center min-w-[120px] px-4"
              //   startContent={<UserIcon className="text-danger" />}
              //   variant="flat"
              //   onPress={() => router.push("/profile")}
              // >
              //   Profile
              // </Button>
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="bordered">Profile</Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  <DropdownItem
                    key="profile"
                    onPress={() => router.push("/profile")}
                  >
                    Edit My Profile
                  </DropdownItem>
                  <DropdownItem
                    key="delete"
                    className="text-danger"
                    color="danger"
                    onPress={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                  >
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ) : (
              <Button
                className="text-sm font-normal text-default-600 bg-default-100 inline-flex items-center min-w-[120px] px-4"
                startContent={<UserIcon className="text-danger" />}
                variant="flat"
                onPress={() => router.push("/login")}
              >
                Login
              </Button>
            )}
          </NavbarItem>
        </NavbarContent>

        <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
          <Link isExternal aria-label="Github" href={siteConfig.links.github}>
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
          {!isAuthenticated && (
            <Button
              className="text-sm font-normal text-default-600 bg-default-100 inline-flex items-center min-w-[120px] px-4"
              startContent={<UserIcon className="text-danger" />}
              variant="flat"
              onPress={() => router.push("/login")}
            >
              Login
            </Button>
          )}
          <NavbarMenuToggle />
        </NavbarContent>

        {isMenuOpen && (
          <NavbarMenu>
            <div className="mx-4 mt-2 flex flex-col gap-2">
              {siteConfig.navMenuItems.map((item, index) => {
                if (item.requiresAuth && !isAuthenticated) return null;
                else if (isAuthenticated && item.notAuthOnly) return null;

                if (item.href === "/logout")
                  return (
                    <NavbarMenuItem key={`${item}-${index}`}>
                      <Link
                        color="danger"
                        size="lg"
                        onPress={() => {
                          handleLogout();
                          setIsMenuOpen(false);
                        }}
                      >
                        {item.label}
                      </Link>
                    </NavbarMenuItem>
                  );

                return (
                  <NavbarMenuItem key={`${item}-${index}`}>
                    <Link
                      color={
                        index === 2
                          ? "primary"
                          : index === siteConfig.navMenuItems.length - 1
                            ? "danger"
                            : "foreground"
                      }
                      href={item.href}
                      size="lg"
                      onPress={() => {
                        setIsMenuOpen(false);
                        router.push(item.href);
                      }}
                    >
                      {item.label}
                    </Link>
                  </NavbarMenuItem>
                );
              })}
            </div>
          </NavbarMenu>
        )}
      </HeroUINavbar>
    </>
  );
};
