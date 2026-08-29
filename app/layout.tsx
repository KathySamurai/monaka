import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { asset } from "@/lib/asset";
import "./globals.css";

export const metadata: Metadata = {
  title: "もなか",
  description: "あそびを通して、人と組織の可能性をひらく。",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
  icons: {
    icon: asset("/logo/favicon.png"),
    apple: asset("/logo/favicon.png"),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = {
    "--watercolor-individual": `url("${asset("/images/top/watercolor-individual.jpg")}")`,
    "--watercolor-business": `url("${asset("/images/top/watercolor-business.jpg")}")`,
  } as CSSProperties;

  return (
    <html lang="ja" style={theme}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
