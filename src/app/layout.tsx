import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const BASE_URL = "https://portfolio-andriamaro.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Andri Amaro · Full Stack Developer",
    template: "%s · Andri Amaro",
  },
  description:
    "Full Stack Developer especializado em React, Next.js e Node.js. Criador do Pulse Ecosystem · design system com 100+ componentes que alimenta 3 SaaS apps em producao, 380+ testes automatizados.",
  keywords: [
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "TypeScript Developer",
    "Frontend Developer",
    "Backend Developer",
    "Design System",
    "Pulse Ecosystem",
    "Desenvolvedor Full Stack",
    "Desenvolvedor React",
    "Portfolio Developer",
    "Andri Amaro",
  ],
  authors: [{ name: "Andri Amaro", url: BASE_URL }],
  creator: "Andri Amaro",
  publisher: "Andri Amaro",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: BASE_URL,
    title: "Andri Amaro · Full Stack Developer",
    description:
      "Criador do Pulse Ecosystem · Design system + 3 SaaS apps em producao com 380+ testes. React, Next.js, Node.js, TypeScript.",
    siteName: "Andri Amaro · Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Andri Amaro · Full Stack Developer",
    description:
      "Criador do Pulse Ecosystem · Design system + 3 SaaS apps em producao com 380+ testes.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  category: "technology",
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Andri Amaro",
  url: BASE_URL,
  image: `${BASE_URL}/avatar.jpg`,
  jobTitle: "Full Stack Developer",
  description:
    "Full Stack Developer especializado em React, Next.js e Node.js. Criador do Pulse Ecosystem.",
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "Tailwind CSS",
    "Prisma",
    "Socket.io",
    "Docker",
    "Design Systems",
  ],
  sameAs: [
    "https://github.com/AndriyAmaro",
    "https://linkedin.com/in/andri-amaro",
  ],
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Frontend Development",
        description: "React, Next.js, Design Systems, SPAs",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Backend Development",
        description: "Node.js, APIs REST, PostgreSQL, Redis",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Full Stack Applications",
        description: "Aplicacoes completas do design ao deploy",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#16132d" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
