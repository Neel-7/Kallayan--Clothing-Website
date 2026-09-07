import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stories = [
  {
    name: "Jamdani",
    place: "Bengal",
    text: "Extra weft motifs are placed by hand, one small decision at a time.",
    image: "/images/bengal-edit.webp",
  },
  {
    name: "Kanjeevaram",
    place: "Tamil Nadu",
    text: "Body and border meet through the korvai technique, creating strength at the seam.",
    image: "/images/south-edit.webp",
  },
  {
    name: "Handloom cotton",
    place: "Shantipur",
    text: "A breathable cloth with tiny irregularities that record the rhythm of the loom.",
    image: "/images/men-campaign.webp",
  },
];

export function CraftMarquee() {
  const items = ["Jamdani", "Kanjeevaram", "Kantha", "Tant", "Kasavu", "Ikat"];
  return (
    <div className="craft-marquee" aria-label="Featured textile traditions">
      <div className="craft-marquee__track">
        {[...items, ...items].map((item, index) => <span key={`${item}-${index}`}>{item}<i aria-hidden="true">◆</i></span>)}
      </div>
    </div>
  );
}

export function CraftStory() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 901px)", () => {
      ScrollTrigger.create({ trigger: scope.current, start: "top 12%", end: "bottom 78%", pin: ".craft-story__intro", pinSpacing: false });
      gsap.utils.toArray<HTMLElement>(".craft-story__card").forEach((card, index) => {
        gsap.fromTo(card, { y: 80 + index * 20, scale: 0.9, opacity: 0.35 }, {
          y: 0, scale: 1, opacity: 1, ease: "none",
          scrollTrigger: { trigger: card, start: "top 88%", end: "top 38%", scrub: true },
        });
      });
    });
    return () => mm.revert();
  }, { scope });

  return (
    <section className="craft-story shell" id="craft" ref={scope}>
      <div className="craft-story__intro">
        <p className="section-kicker">Know the cloth</p>
        <h2>What the eye misses,<br /><em>the hand remembers.</em></h2>
        <p>We name the weave, region, fibre, and technique because provenance belongs beside the product—not beneath it.</p>
      </div>
      <div className="craft-story__cards">
        {stories.map((story, index) => (
          <article className="craft-story__card" key={story.name} style={{ zIndex: index + 1 }}>
            <img src={story.image} alt={`${story.name} textile story`} />
            <div><span>{story.place}</span><h3>{story.name}</h3><p>{story.text}</p></div>
          </article>
        ))}
      </div>
    </section>
  );
}
