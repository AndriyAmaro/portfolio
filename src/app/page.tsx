import { Footer, Header } from "@/components/layout";
import { About, Contact, Ecosystem, Hero, Projects, Services, Skills } from "@/components/sections";

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
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
