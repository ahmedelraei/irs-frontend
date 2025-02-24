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
    }
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Internships",
      href: "/internships",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
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
