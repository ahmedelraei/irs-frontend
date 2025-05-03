export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "IRS - Get hired with ease!",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Internships",
      href: "/internships",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
      requiresAuth: false,
    },
    {
      label: "Login",
      href: "/login",
      notAuthOnly: true,
    },
    {
      label: "Register",
      href: "/register",
      notAuthOnly: true,
    },
    {
      label: "Profile",
      href: "/profile",
      requiresAuth: true,
    },
    {
      label: "Internships",
      href: "/internships",
      requiresAuth: true,
    },
    {
      label: "Logout",
      href: "/logout",
      requiresAuth: true,
    },
  ],
  links: {
    github: "https://github.com/ahmedelraei",
    twitter: "https://twitter.com/exfresher",
    docs: "https://github.com/ahmedelraei",
    discord: "https://discord.gg/",
    sponsor: "https://patreon.com/",
  },
};
