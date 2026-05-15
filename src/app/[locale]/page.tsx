import { setRequestLocale } from "next-intl/server";
import { Footer, Header } from "@/components/layout";
import {
  About,
  CodeInAction,
  Contact,
  Ecosystem,
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
        <Ecosystem />
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
