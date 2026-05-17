import "./globals.css";

export const metadata = {
  title: "Floviken — Experiments in AI and medicine",
  description: "I'm Richard Ahroon, a hospitalist and biomedical engineer with active clinical practice in the US. I build small AI tools for clinical problems I personally encounter.",
  keywords: ["Floviken", "Richard Ahroon", "AI in medicine", "clinical AI", "clinical informatics", "hospitalist", "builder MD"],
  authors: [{ name: "Richard Ahroon", url: "https://Floviken.se" }],
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
    description: "A physician's public laboratory for AI in medicine. Small, shipped tools.",
    url: "https://Floviken.se",
    siteName: "Floviken",
    locale: "en_US",
    type: "website",
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
