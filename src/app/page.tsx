import { Footer, Header } from "@/components/layout";
import { About, Contact, Ecosystem, Hero, Projects, Services, Skills, Timeline } from "@/components/sections";

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
        <Timeline />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
