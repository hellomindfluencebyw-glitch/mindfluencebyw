import Hero from "@/components/hero/Hero";
import GlobalNav from "@/components/GlobalNav";
import WhoWeAre from "@/components/sections/WhoWeAre";
import Services from "@/components/sections/Services";
import Method from "@/components/sections/Method";
import SelectedWork from "@/components/sections/SelectedWork";
import BehaviourLab from "@/components/sections/BehaviourLab";
import Founder from "@/components/sections/Founder";
import Connect from "@/components/sections/Connect";

export default function Home() {
  return (
    <main id="main-content">
      <GlobalNav />
      <Hero />
      <WhoWeAre />
      <Services />
      <Method />
      <SelectedWork />
      <BehaviourLab />
      <section id="about"><Founder /></section>
      <Connect />
    </main>
  );
}
