import { Footer, Header } from "@/components/layout";
import { About, CodeInAction, Contact, Ecosystem, Hero, Projects, Services, Skills, Timeline } from "@/components/sections";
import { SectionDivider } from "@/components/ui/SectionDivider";

export default function Home() {
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
      </main>
      <Footer />
    </>
  );
}
