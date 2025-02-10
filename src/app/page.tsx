
import { ReactLenis } from "lenis/react";
import Header from "@/components/layout/header/Header";
import Hero from "@/feature/home/hero/Hero";
import WorkLayout from "@/feature/home/work/WorkLayout";
import Footer from "@/components/layout/footer/Footer";

export default function Home() {

  

    return (
      <ReactLenis root>
        <Header variant="transparent" />
        <Hero />
        <WorkLayout
          projects={[
            {
              project: "Love the Philippines",
              category: "Tourism",
              director: "Josher Gatlabayan",
              trt: "00:00:00",
              source: "ltp-ad-10s",
            },
            {
              project: "Dilaw",
              category: "Music",
              director: "Jaydee Alberto",
              trt: "00:00:00",
              source: "dilaw-mv-10s",
            },
            {
              project: "Ulthera",
              category: "Advertisement",
              director: "Daniel Roxas",
              trt: "00:00:00",
              source: "ulthera-ad-10s",
            },
            {
              project: "It's Always Been Here",
              category: "Short",
              director: "Therese Cortes",
              trt: "00:00:00",
              source: "iabh-short-10s",
            },
            {
              project: "Thermage",
              category: "Advertisement",
              director: "Daniel Roxas",
              trt: "00:00:00",
              source: "sam-ad-6s",
            },
            {
              project: "AirAsia PasGoGo",
              category: "Short",
              director: "John Manalo",
              trt: "00:00:00",
              source: "airasia-ad-10s",
            },
            {
              project: "Love",
              category: "Advertisement",
              director: "John Lexter Laguinday",
              trt: "00:00:00",
              source: "love-short-10s",
            },
            {
              project: "Partnership",
              category: "Advertisement",
              director: "JL",
              trt: "00:00:00",
              source: "partnership-ad-10s",
            },
            {
              project: "Why STIHL",
              category: "Advertisement",
              director: "Iane Artillaga",
              trt: "00:00:00",
              source: "stihl-ad-10s",
            },
          ]}
        />
        <Footer />
      </ReactLenis>
    );



}