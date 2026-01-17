import React, { useEffect } from "react";
import { LanguageProvider } from "./contexts/LanguageContext";
import PreLoader from "@components/common/PreLoader";
import Navigation from "@components/layout/Navigation";
import Footer from "@components/layout/Footer";
import Hero from "@components/home/Hero";
import Clients from "@components/home/Clients";
import About from "@components/home/About";
import Services from "@components/home/Services";
import Portfolio from "@components/home/Portfolio";
import Testimonials from "@components/home/Testimonials";
import Contact from "@components/home/Contact";
import "./index.css";

function App() {
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = "smooth";

    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <LanguageProvider>
      <PreLoader />
      <Navigation />
      <main>
        <Hero />
        <Clients />
        <About />
        <Services />
        <Portfolio />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </LanguageProvider>
  );
}

export default App;
