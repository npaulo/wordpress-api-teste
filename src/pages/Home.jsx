import { useEffect, useState } from "react";
import { getPageBySlug, getPagesByParent } from "../api/wordpress";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import ServicesSection from "../components/ServicesSection";
import JoinSection from "../components/JoinSection";
import DefaultSection from "../components/DefaultSection";

export default function Home() {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    async function loadHomeSections() {
      const home = await getPageBySlug("home");
      if (!home?.id) return;

      const children = await getPagesByParent(home.id);
      const ordered = children.sort((a, b) => a.menu_order - b.menu_order);
      setSections(ordered);
    }
    loadHomeSections();
  }, []);

  if (!sections.length) {
    return (
      <div className="flex justify-center items-center h-[50vh] text-gray-500">
        A carregar conteúdo...
      </div>
    );
  }

  const sectionMap = {
    hero: HeroSection,
    "quem-somos": AboutSection,
    servicos: ServicesSection,
    participar: JoinSection,
  };

  return (
    <main className="animate-fade-in space-y-24">
      {sections.map((section) => {
        const Component = sectionMap[section.slug] || DefaultSection;
        return (
          <Component
            key={section.id}
            title={section.title.rendered}
            content={section.content.rendered}
            featured_image_url={section.featured_image_url}
          />
        );
      })}
    </main>
  );
}
