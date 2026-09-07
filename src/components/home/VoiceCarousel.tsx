import { useState } from "react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";

const voices = [
  { quote: "A good weave should feel alive before you even drape it.", name: "Madhabi Sen", role: "Textile curator, Kolkata" },
  { quote: "The border carries structure. The body carries light.", name: "Meenakshi Raman", role: "Silk archivist, Chennai" },
  { quote: "We choose fewer pieces so every one can be properly understood.", name: "Ananya Bose", role: "Kallayani buying studio" },
];

export function VoiceCarousel() {
  const [active, setActive] = useState(0);
  const move = (step: number) => setActive((value) => (value + step + voices.length) % voices.length);
  const voice = voices[active];
  return (
    <section className="voices shell" aria-roledescription="carousel" aria-label="Notes from our textile community">
      <div className="voices__portraits" aria-hidden="true">
        <img src="/images/bengal-edit.webp" alt="" /><img src="/images/south-edit.webp" alt="" /><img src="/images/men-campaign.webp" alt="" />
      </div>
      <blockquote key={voice.name}>
        <p>“{voice.quote}”</p>
        <footer><strong>{voice.name}</strong><span>{voice.role}</span></footer>
      </blockquote>
      <div className="voices__controls"><button onClick={() => move(-1)} aria-label="Previous note"><ArrowLeft size={20} /></button><span>{String(active + 1).padStart(2, "0")} / {String(voices.length).padStart(2, "0")}</span><button onClick={() => move(1)} aria-label="Next note"><ArrowRight size={20} /></button></div>
    </section>
  );
}
