import Loader       from "@/components/Loader";
import Cursor       from "@/components/Cursor";
import Nav          from "@/components/Nav";
import Hero         from "@/components/Hero";
import StatsMarquee from "@/components/StatsMarquee";
import Experience   from "@/components/Experience";
import Skills       from "@/components/Skills";
import Portfolio    from "@/components/Portfolio";
import Training     from "@/components/Training";
import Contact      from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Loader />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <StatsMarquee />
        <Experience />
        <Skills />
        <Portfolio />
        <Training />
        <Contact />
      </main>
    </>
  );
}
