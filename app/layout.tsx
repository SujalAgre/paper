import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Paper",
  description: "An open-source AI chat platform with multi-model support.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
