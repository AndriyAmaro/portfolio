import { Footer, Header } from "@/components/layout";
import { About, Contact, Ecosystem, Hero, Projects, Skills } from "@/components/sections";

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
        <Contact />
      </main>
      <Footer />
    </>
  );
}
