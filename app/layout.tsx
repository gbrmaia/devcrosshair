import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "DevCrosshair - Ferramenta de precisão para desenvolvedores web e QA",
  description:
    "DevCrosshair é uma ferramenta de precisão para desenvolvedores web e profissionais de QA que facilita a medição, inspeção e análise de elementos em páginas web.",
  generator: "Next.js",
  applicationName: "DevCrosshair",
  keywords: [
    "desenvolvimento web",
    "ferramenta de desenvolvimento",
    "QA",
    "teste de software",
    "inspeção de elementos",
    "medição de pixels",
    "crosshair",
    "frontend",
  ],
  authors: [{ name: "Gabriel Maia" }],
  creator: "Gabriel Maia",
  publisher: "Gabriel Maia",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : "http://localhost:3000"
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title:
      "DevCrosshair - Ferramenta de precisão para desenvolvedores web e QA",
    description:
      "Ferramenta de precisão para desenvolvedores web e profissionais de QA que facilita a medição, inspeção e análise de elementos em páginas web.",
    url: "/",
    siteName: "DevCrosshair",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DevCrosshair - Ferramenta de precisão para desenvolvedores web e QA",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "DevCrosshair - Ferramenta de precisão para desenvolvedores web e QA",
    description:
      "Ferramenta de precisão para desenvolvedores web e profissionais de QA que facilita a medição, inspeção e análise de elementos em páginas web.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
      },
    ],
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link
          rel="canonical"
          href={
            process.env.NEXT_PUBLIC_VERCEL_URL
              ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
              : "http://localhost:3000"
          }
        />
      </head>
      <body>
        <Analytics />
        {children}
      </body>
    </html>
  );
}
