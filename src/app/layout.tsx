import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/provider/ReqctQuerryProvider";
import { Router } from "next/router";


const font = Inter({subsets: ["latin"], weight:["400"]});

export const metadata: Metadata = {
  title: "Trip Planner",
  description: "Basic application to plan your trip",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["trip", "planner", "trip planner"],
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  authors: [
    { name: "Szymon Pasieczny" },
    {
      name: "Szymon Pasieczny",
      url: "https://www.linkedin.com/in/szymon-pasieczny-4a664b215/",
    },
  ],  
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Trip Planner",
  },
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  icons: [
    { rel: "apple-touch-icon", url: "icons/icon-128x128.png" },
    { rel: "icon", url: "icons/icon-128x128.png" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <ReactQueryProvider>
          <body className={font.className}>{children}</body>
        </ReactQueryProvider>
    </html>
  );
}
