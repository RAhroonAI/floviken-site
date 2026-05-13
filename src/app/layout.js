import "./globals.css";

export const metadata = {
  title: "Floviken — Experiments in AI and medicine",
  description: "I'm Richard Ahroon, a hospitalist and biomedical engineer with active clinical practice in the US. I build small AI tools for clinical problems I personally encounter.",
  keywords: ["Floviken", "Richard Ahroon", "AI in medicine", "clinical AI", "clinical informatics", "hospitalist", "builder MD"],
  authors: [{ name: "Richard Ahroon", url: "https://Floviken.se" }],
  openGraph: {
    title: "Floviken — Experiments in AI and medicine",
    description: "A physician's public laboratory for AI in medicine. Small, shipped tools.",
    url: "https://Floviken.se",
    siteName: "Floviken",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}