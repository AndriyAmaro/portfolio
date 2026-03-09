import { Footer, Header } from "@/components/layout";
import { About, CodeInAction, Contact, Ecosystem, Hero, Projects, Services, Skills, Timeline } from "@/components/sections";

export default function Home() {
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
