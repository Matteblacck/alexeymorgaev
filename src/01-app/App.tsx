import './App.css';
import 'lenis/dist/lenis.css';
import styled from 'styled-components';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import SideRays from '../05-shared/animations/bg/SideRays';

import Home from '../02-sections/Home';
import About from '../02-sections/About';
import Header from '../02-sections/Header';
import Skills from '../02-sections/Skills';
import Experience from '../02-sections/Experience';
import Contacts from '../02-sections/Contacts';
import { LanguageProvider } from '../05-shared/LanguageProvider';
import { setLenisInstance } from '../05-shared/smoothScroll';

const Background = styled.div`
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100vh;
  height: 100lvh;
  z-index: 0;
  pointer-events: none;
  filter: hue-rotate(var(--ray-hue-shift, 0deg));
  opacity: var(--ray-opacity, 1);
  transition: filter 420ms ease, opacity 420ms ease;
`;

const MainContent = styled.main`
  position: relative;
  z-index: 1;
`;

const Rays = styled.div`
  position: absolute;
  inset: 0;

  &.mobile-top-ray {
    @media (max-width: 767px) {
      left: auto;
      bottom: auto;
      right: -18vw;
      top: -6lvh;
      width: min(118vw, 560px);
      height: min(52lvh, 460px);
      opacity: 0.68;
      -webkit-mask-image: radial-gradient(ellipse at 78% 18%, #000 0%, #000 34%, transparent 68%);
      mask-image: radial-gradient(ellipse at 78% 18%, #000 0%, #000 34%, transparent 68%);
    }
  }

  &.mobile-hidden {
    @media (max-width: 767px) {
      display: none;
    }
  }
`;
function App() {
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;

    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({
      anchors: true,
      lerp: 0.08,
      smoothWheel: true,
      syncTouch: true,
      wheelMultiplier: 0.85,
      respectReducedMotion: true,
    });
    setLenisInstance(lenis);

    const onLenisScroll = () => ScrollTrigger.update();
    const unsubscribeLenisScroll = lenis.on('scroll', onLenisScroll);
    const updateLenis = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const context = reducedMotion ? null : gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-marquee-parallax]', main).forEach((marquee) => {
        const section = marquee.closest<HTMLElement>('[id]');
        if (!section) return;

        gsap.to(marquee, {
          y: 110,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        });
      });

    }, main);

    return () => {
      context?.revert();
      unsubscribeLenisScroll();
      gsap.ticker.remove(updateLenis);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
      setLenisInstance(null);
    };
  }, []);

  return (

    <LanguageProvider>

      <Background>
        <Rays className="mobile-top-ray">
          <SideRays
            speed={2.5}
            rayColor1="#EAB308"
            rayColor2="#96c8ff"
            intensity={3}
            spread={3}
            origin="top-right"
            tilt={0}
            saturation={1.9}
            blend={0.75}
            falloff={1.5}
            opacity={1}
            distance={1.1}
          />
        </Rays>

        <Rays className="mobile-hidden">
          <SideRays
            speed={2.5}
            rayColor1="#7f9fac"
            rayColor2="#b3c987"
            intensity={2.4}
            spread={3}
            origin="bottom-left"
            tilt={0}
            saturation={1}
            blend={0.75}
            falloff={1.5}
            opacity={1}
            distance={1.1}
          />
        </Rays>
      </Background>
      <header>
        <Header />
      </header>

      <MainContent ref={mainRef}>
        <Home />
        <About />
        <Skills />
        <Experience />
        <Contacts />
      </MainContent>
    </LanguageProvider>
  );
}

export default App;
