import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Services from "./components/Services";
import Process from "./components/Process";
import Portfolio from "./components/Portfolio";
import Methodology from "./components/Methodology";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="bg-bg-primary">
      <Navbar />
      <Hero />
      <Stats />
      <Services />
      <Process />
      <Portfolio />
      <Methodology />
      <Contact />
      <Footer />
    </main>
  );
}
