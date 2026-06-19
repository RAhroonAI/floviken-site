import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://floviken.se"),
  // Backup to the X-Robots-Tag HTTP header in next.config.mjs: emits
  // <meta name="robots" content="noindex, nofollow"> into every page's <head>.
  // Inherited by all routes, so the whole site is kept out of search results
  // while remaining fully reachable via direct links.
  robots: { index: false, follow: false },
  title: "Floviken — Experiments in AI and medicine",
  description: "A physician's public laboratory for AI in medicine. Small, shipped clinical tools by Richard Ahroon, hospitalist and biomedical engineer.",
  authors: [{ name: "Richard Ahroon", url: "https://floviken.se" }],
  applicationName: "Floviken",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/icon-180.png", sizes: "180x180", type: "image/png" }],
  },
  appleWebApp: {
    capable: true,
    title: "Floviken",
    statusBarStyle: "default",
  },
  openGraph: {
    title: "Floviken — Experiments in AI and medicine",
    description: "A physician's public laboratory for AI in medicine. Small, shipped clinical tools by Richard Ahroon, hospitalist and biomedical engineer.",
    url: "https://floviken.se",
    siteName: "Floviken",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://floviken.se/og-image.png",
        width: 1200,
        height: 630,
        alt: "Floviken — experiments in AI and medicine",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Floviken — Experiments in AI and medicine",
    description: "A physician's public laboratory for AI in medicine. Small, shipped clinical tools by Richard Ahroon, hospitalist and biomedical engineer.",
    images: ["https://floviken.se/og-image.png"],
  },
};

export const viewport = {
  themeColor: "#F1ECDE",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body>{children}</body>
    </html>
  );
}
