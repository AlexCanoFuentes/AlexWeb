import Hero from "./components/Hero";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Methodology from "./components/Methodology";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="bg-bg-primary">
      <Hero />
      <Services />
      <Portfolio />
      <Methodology />
      <Contact />
      <Footer />
    </main>
  );
}
