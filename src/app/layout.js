import "./globals.css";

export const metadata = {
  title: "Ljuslab — Experiments in AI and medicine",
  description: "I'm Richard Ahroon, a hospitalist and biomedical engineer based in Karlstad, Sweden, working part-time in the US. I build small AI tools for clinical problems I personally encounter.",
  keywords: ["Ljuslab", "Richard Ahroon", "AI in medicine", "clinical AI", "Swedish healthtech", "Karlstad", "builder MD"],
  authors: [{ name: "Richard Ahroon", url: "https://ljuslab.se" }],
  openGraph: {
    title: "Ljuslab — Experiments in AI and medicine",
    description: "A physician's public laboratory for AI in medicine. Small, shipped tools.",
    url: "https://ljuslab.se",
    siteName: "Ljuslab",
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