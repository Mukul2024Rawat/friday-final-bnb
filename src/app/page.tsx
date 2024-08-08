import ExperiencesSection from "@/components/homePage/ExperiencesSection";
import FlexibleSection from "@/components/homePage/FlexibleSection";
import GiftCardsSection from "@/components/homePage/GiftCardsSection";
import HostingSection from "@/components/homePage/HostingSection";
import InspirationSection from "@/components/homePage/InspirationSection";
import MobileMenu from "@/components/navbar/MobileMenu";
import PreFooter from "@/components/PreFooter";
//import Image from "next/image";

export default function Home() {
  return (
    <>
      <main className="pt-0 md:pt-[150px]">
        <FlexibleSection />
        <InspirationSection />
        <ExperiencesSection />
        <GiftCardsSection />
        <HostingSection />
        <PreFooter />
      </main>
    </>
  );
}
