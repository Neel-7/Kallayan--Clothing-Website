import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { heroSlides } from "@/data/catalog";

const AUTOPLAY_MS = 6000;

export function HeroCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!api || paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => api.scrollNext(), AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [api, paused]);

  return (
    <Carousel
      className="hero-carousel"
      opts={{ loop: true }}
      setApi={setApi}
      aria-label="Kallayani campaign stories"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <CarouselContent className="hero-carousel__content">
        {heroSlides.map((slide) => (
          <CarouselItem key={slide.id} className="hero-slide">
            <img className="hero-slide__image" src={slide.image.src} alt={slide.image.alt} style={{ objectPosition: slide.image.position }} />
            <div className="hero-slide__shade" />
            <div className="hero-slide__copy">
              <h1>{slide.title}</h1>
              <p>{slide.description}</p>
              <Button asChild><Link to={slide.href}>{slide.cta}</Link></Button>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hero-carousel__previous" />
      <CarouselNext className="hero-carousel__next" />
    </Carousel>
  );
}
