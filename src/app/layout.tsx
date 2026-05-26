// @ts-ignore: Importing CSS for side effects
import "./globals.css";
// @ts-ignore: Importing CSS for side effects
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prestine Pros Cleaning Gift Certificates",
  description: "Gift professional cleaning services with a digital certificate."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
