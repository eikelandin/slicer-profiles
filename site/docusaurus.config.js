// @ts-check
// The docs site: the Markdown pages in ../docs, generated tables included (src/docs.py), published on GitHub Pages.

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "slicer-profiles",
  tagline: "Bambu Studio presets for the Bambu Lab H3C: third-party filaments and print styles on the stock parents",
  url: "https://eikelandin.github.io",
  baseUrl: "/slicer-profiles/",
  organizationName: "eikelandin",
  projectName: "slicer-profiles",
  trailingSlash: false,
  // No link check: explicit, since Docusaurus defaults broken links (and from v4 anchors) to throw
  onBrokenLinks: "warn",
  onBrokenAnchors: "warn",
  markdown: { format: "detect", hooks: { onBrokenMarkdownLinks: "warn" } },
  i18n: { defaultLocale: "en", locales: ["en"] },
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: "../docs",
          // Keeps docs/agents/ unpublished; a set exclude replaces the defaults (https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-docs#exclude), so they are repeated.
          exclude: ["**/_*.{js,jsx,ts,tsx,md,mdx}", "**/_*/**", "**/*.test.{js,jsx,ts,tsx}", "**/__tests__/**", "agents/**"],
          routeBasePath: "docs",
          sidebarPath: false,
          // Docusaurus appends the page path relative to site/ ("../docs/install.md").
          editUrl: "https://github.com/eikelandin/slicer-profiles/edit/main/site/",
        },
        blog: false,
        theme: {},
      }),
    ],
  ],
  themeConfig: {
    navbar: {
      title: "slicer-profiles",
      items: [
        { to: "/docs/install", label: "Install", position: "left" },
        { to: "/docs/profiles", label: "What the presets do", position: "left" },
        { to: "/docs/catalog", label: "Catalog", position: "left" },
        { href: "https://github.com/eikelandin/slicer-profiles", label: "GitHub", position: "right" },
      ],
    },
    footer: {
      copyright: "Code and docs ISC, data and presets CC0 1.0",
    },
  },
};

module.exports = config;
