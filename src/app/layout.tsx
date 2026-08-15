import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import { MenuProvider } from "@/context/MenuContext";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "La Serafina",
  description: "Menú digital — La Serafina Coffee House",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${montserrat.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <MenuProvider>{children}</MenuProvider>
      </body>
    </html>
  );
}
