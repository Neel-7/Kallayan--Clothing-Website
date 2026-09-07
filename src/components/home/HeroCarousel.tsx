import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import { heroSlides } from "@/data/catalog";

const AUTOPLAY_MS = 6500;

export function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const scope = useRef<HTMLElement>(null);

  const move = (direction: number) =>
    setActive(
      (current) =>
        (current + direction + heroSlides.length) % heroSlides.length,
    );

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const timer = window.setInterval(() => move(1), AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [paused]);

  useGSAP(
    () => {
      const current = scope.current?.querySelector(".hero-slide.is-active");
      if (!current) return;
      gsap.fromTo(
        current.querySelector(".hero-slide__image"),
        { scale: 1.035, opacity: 0.65 },
        { scale: 1, opacity: 1, duration: 1.15, ease: "power3.out" },
      );
      gsap.fromTo(
        current.querySelectorAll(".hero-slide__content > *"),
        { y: 22, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.72,
          stagger: 0.075,
          ease: "power3.out",
        },
      );
    },
    { scope, dependencies: [active] },
  );

  return (
    <section
      className="hero-carousel"
      ref={scope}
      aria-roledescription="carousel"
      aria-label="Kallayani campaign stories"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="hero-carousel__slides" aria-live="polite">
        {heroSlides.map((slide, index) => (
          <article
            key={slide.id}
            className={`hero-slide hero-slide--${slide.align} hero-slide--${slide.tone} ${index === active ? "is-active" : ""}`}
            aria-hidden={index !== active}
          >
            <img
              className="hero-slide__image"
              src={slide.image.src}
              alt={slide.image.alt}
              style={{ objectPosition: slide.image.position }}
            />
            <div className="hero-slide__veil" />
            <div className="hero-slide__content">
              <p className="section-kicker">{slide.kicker}</p>
              <h1>
                {slide.title}
                <br />
                <em>{slide.italic}</em>
              </h1>
              <p className="hero-slide__description">{slide.description}</p>
              <div className="hero-slide__actions">
                <Link className="solid-link" to={slide.href}>
                  {slide.cta} <ArrowRight size={17} />
                </Link>
                <Link className="underline-link" to={slide.href}>
                  {slide.secondary}
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      <button
        className="hero-arrow hero-arrow--prev"
        onClick={() => move(-1)}
        aria-label="Previous campaign"
      >
        <ArrowLeft size={23} />
      </button>
      <button
        className="hero-arrow hero-arrow--next"
        onClick={() => move(1)}
        aria-label="Next campaign"
      >
        <ArrowRight size={23} />
      </button>

      <div className="hero-progress" aria-label="Choose campaign slide">
        {heroSlides.map((slide, index) => (
          <button
            key={slide.id}
            className={index === active ? "is-active" : ""}
            onClick={() => setActive(index)}
            aria-label={`Show slide ${index + 1}: ${slide.kicker}`}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <i>
              <b
                style={{
                  animationDuration: `${AUTOPLAY_MS}ms`,
                  animationPlayState: paused ? "paused" : "running",
                }}
              />
            </i>
          </button>
        ))}
      </div>
    </section>
  );
}
