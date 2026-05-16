import { Inter, Archivo, Archivo_Black, JetBrains_Mono } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { ClientShell } from "@/components/ui/ClientShell";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Fase 1 · loaded + exposed, not yet applied to any consumer (zero visual diff)
const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
});
const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-archivo-black",
});
// Fase 4 · mono editorial p/ textos pequenos/informativos (não títulos)
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#16132d" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
      </head>
      <body
        className={`${inter.variable} ${GeistSans.variable} ${archivo.variable} ${archivoBlack.variable} ${jetbrains.variable} font-sans antialiased`}
      >
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
