import { setRequestLocale } from "next-intl/server";
import { Footer, Header } from "@/components/layout";
import {
  About,
  ClaudeSection,
  CodeInAction,
  Contact,
  Hero,
  Projects,
  Services,
  Skills,
  Timeline,
} from "@/components/sections";
type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <ClaudeSection />
        <Projects />
        <CodeInAction />
        <Timeline />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
