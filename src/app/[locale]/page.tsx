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
import { SectionDivider } from "@/components/ui/SectionDivider";

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
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Ecosystem />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <CodeInAction />
        <SectionDivider />
        <Timeline />
        <SectionDivider />
        <Services />
        <SectionDivider />
        <Contact />
        <SectionDivider />
      </main>
      <Footer />
    </>
  );
}
