import Hero from "@/components/hero/Hero";
import NeuralSpine from "@/components/NeuralSpine";
import MobileNav from "@/components/MobileNav";
import WhoWeAre from "@/components/sections/WhoWeAre";
import HowWeThink from "@/components/sections/HowWeThink";
import FrontalLobe from "@/components/sections/FrontalLobe";
import BrocasArea from "@/components/sections/BrocasArea";
import Hippocampus from "@/components/sections/Hippocampus";
import OccipitalLobe from "@/components/sections/OccipitalLobe";
import LimbicSystem from "@/components/sections/LimbicSystem";
import Results from "@/components/sections/Results";
import Founder from "@/components/sections/Founder";
import Connect from "@/components/sections/Connect";

// Journey order per the second-level brief (#21):
// THE MIND -> WHO WE ARE -> HOW WE THINK -> WHAT WE DO ->
// WHAT WE'VE CREATED -> WHY IT WORKED -> THE RESULTS -> THE FOUNDER -> LET'S CONNECT
export default function Home() {
  return (
    <main id="main-content">
      <NeuralSpine />
      <MobileNav />
      <Hero />
      <WhoWeAre />
      <HowWeThink />
      <FrontalLobe />
      <BrocasArea />
      <Hippocampus />
      <OccipitalLobe />
      <LimbicSystem />
      <Results />
      <Founder />
      <Connect />
    </main>
  );
}
