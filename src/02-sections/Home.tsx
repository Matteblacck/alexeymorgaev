import { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styled, { keyframes } from "styled-components";
import { AnimatePresence, motion, useIsPresent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { fluidText } from "../05-shared/utils";
import { useLanguage } from "../05-shared/useLanguage";
import { scrollToElement } from "../05-shared/smoothScroll";

const star1Src = `${import.meta.env.BASE_URL}images/star1.webp`;
const star2Src = `${import.meta.env.BASE_URL}images/star2.webp`;
const termSrc = `${import.meta.env.BASE_URL}images/term.webp`;
const ampersSrc = `${import.meta.env.BASE_URL}images/ampers.webp`;

gsap.registerPlugin(ScrollTrigger);

const heroReveal = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 22px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const toggleReveal = keyframes`
  from { opacity: 0; filter: blur(6px); }
  to { opacity: 1; filter: blur(0); }
`;

const headlineReveal = keyframes`
  from {
    opacity: 0;
    filter: blur(14px);
    transform: translate3d(0, 30px, 0) scale(0.96);
  }
  to {
    opacity: 1;
    filter: blur(0);
    transform: translate3d(0, 0, 0) scale(1);
  }
`;

const ampersandReveal = keyframes`
  from {
    opacity: 0;
    filter: blur(14px);
    transform: translate3d(0, 30px, 0) scale(0.96);
  }
  to {
    opacity: 1;
    filter: blur(0) drop-shadow(0 14px 22px rgba(0, 0, 0, 0.18));
    transform: translate3d(0, 0, 0) scale(1);
  }
`;

const typewriterReveal = keyframes`
  from { clip-path: inset(0 100% 0 0); }
  to { clip-path: inset(0 0 0 0); }
`;

const GreetingTyping = styled.span<{ $steps: number; $duration: number }>`
  display: inline-block;
  clip-path: inset(0 100% 0 0);
  animation: ${typewriterReveal} ${({ $duration }) => $duration}s steps(${({ $steps }) => $steps}, end) 180ms both;

  @media (prefers-reduced-motion: reduce) {
    clip-path: none;
    animation: none;
  }
`;

const TextSwapSlot = styled.span`
  display: inline-grid;
  justify-items: center;
  vertical-align: baseline;
  line-height: inherit;
`;

const TextSwapLayer = styled(motion.span)<{ $compact?: boolean }>`
  display: block;
  grid-area: 1 / 1;
  white-space: nowrap;
  line-height: inherit;
  text-align: center;

  @media (max-width: 767px) {
    font-size: ${({ $compact }) => $compact ? '0.82em' : '1em'};
  }
`;

function AnimatedTextLayer({ text, compact = false }: { text: string; compact?: boolean }) {
  const isPresent = useIsPresent();
  const prefersReducedMotion = useReducedMotion();

  return (
    <TextSwapLayer
      $compact={compact}
      aria-hidden={!isPresent}
      initial={prefersReducedMotion ? false : { opacity: 0, filter: 'blur(12px)', y: 8, scale: 0.985 }}
      animate={{ opacity: 1, filter: 'blur(0px)', y: 0, scale: 1 }}
      exit={{ opacity: 0, filter: 'blur(14px)', y: -7, scale: 1.02 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.52, ease: 'easeOut' }}
    >
      {text}
    </TextSwapLayer>
  );
}

function AnimatedText({ text, compact = false }: { text: string; compact?: boolean }) {
  return (
    <TextSwapSlot>
      <AnimatePresence initial={false}>
        <AnimatedTextLayer key={text} text={text} compact={compact} />
      </AnimatePresence>
    </TextSwapSlot>
  );
}

function TypewriterGreeting({ text }: { text: string }) {
  const [timing] = useState(() => ({
    steps: Math.max(text.length, 1),
    duration: Math.max(0.75, text.length * 0.034),
  }));

  return (
    <GreetingTyping $steps={timing.steps} $duration={timing.duration}>
      <AnimatedText text={text} />
    </GreetingTyping>
  );
}

const Section = styled.section`
  position: relative;
  isolation: isolate;
  min-height: 100svh;
  overflow: hidden;
  padding: clamp(24px, 4vw, 64px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  color: var(--text);
  background: transparent;

  [data-hero-reveal='greeting'] {
    animation: ${heroReveal} 760ms cubic-bezier(0.2, 0.7, 0.2, 1) 70ms both;
  }

  [data-hero-reveal='title'] {
    animation: ${headlineReveal} 1s cubic-bezier(0.16, 1, 0.3, 1) 1.28s both;
  }

  [data-hero-reveal='footer'] {
    animation: ${heroReveal} 760ms cubic-bezier(0.2, 0.7, 0.2, 1) 2.48s both;
  }

  [data-hero-reveal='language-toggle'] {
    animation: ${toggleReveal} 560ms ease-out 2.48s both;
  }

  [data-parallax] {
    will-change: transform;
    transition:
      transform 700ms cubic-bezier(0.16, 1, 0.3, 1),
      width 560ms ease-in-out,
      top 560ms ease-in-out,
      right 560ms ease-in-out,
      bottom 560ms ease-in-out,
      left 560ms ease-in-out,
      translate 560ms ease-in-out;
  }

  &[data-parallax-active='true'] [data-parallax] {
    transition:
      transform 180ms ease-out,
      width 560ms ease-in-out,
      top 560ms ease-in-out,
      right 560ms ease-in-out,
      bottom 560ms ease-in-out,
      left 560ms ease-in-out,
      translate 560ms ease-in-out;
  }

  @media (max-width: 767px) {
    [data-hero-reveal='greeting'] {
      animation-duration: 620ms;
      animation-delay: 40ms;
    }

    [data-hero-reveal='title'] {
      animation-duration: 860ms;
      animation-delay: 1.18s;
    }

    [data-hero-reveal='footer'] {
      animation-duration: 620ms;
      animation-delay: 2.22s;
    }

    [data-hero-reveal='language-toggle'] {
      animation-delay: 2.22s;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    [data-hero-reveal] {
      animation: none;
    }
  }

  @media (pointer: coarse), (prefers-reduced-motion: reduce) {
    [data-parallax] {
      transform: none !important;
    }
  }
`;

const HeroContent = styled.div`
  --hero-text-gap: clamp(15px, 4vh, 25px);
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--hero-text-gap);

  @media (max-width: 767px) {
    --hero-text-gap: clamp(8px, 1.5vh, 12px);
    transform: translateY(4vh);
  }
`;

const ScrollLayer = styled(motion.div)`
  width: 100%;
`;

const GreetingReveal = styled.div`
  position: relative;
  width: 100%;
`;

const TopPill = styled.div`
  z-index: 1;
  width: 100%;
  min-height: 0;
  padding: 0;
  color: var(--text);
  text-align: center;
  font-size: clamp(16px, 2.4vw, 34px);
  font-weight: 600;
  letter-spacing: -0.04em;
  transform: translate3d(var(--parallax-x, 0px), var(--parallax-y, 0px), 0);

  @media (max-width: 767px) {
    font-size: clamp(20px, 5vw, 26px);
  }
`;

const Main = styled.div`
  width: 100%;
  max-width: 1500px;
  position: relative;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--hero-text-gap);
`;

const Intro = styled.p`
  transform: translate3d(var(--parallax-x, 0px), var(--parallax-y, 0px), 0);
  margin: 0;
  text-align: center;
  font-size: clamp(16px, 2vw, 28px);
  line-height: 1;
  font-weight: 400;
  font-style: italic;
  letter-spacing: -0.04em;
  text-transform: uppercase;
`;

const Headline = styled.h1`
  position: relative;
  z-index: 1;
  margin: 0;
  font-size: clamp(64px, 13.5vw, 205px);
  line-height: 0.82;
  letter-spacing: -0.085em;
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
  transform: translate3d(var(--parallax-x, 0px), var(--parallax-y, 0px), 0);

  > span + span { margin-top: 0.14em; }

  @media (max-width: 600px) {
    font-size: clamp(50px, 16vw, 82px);
    letter-spacing: -0.09em;
  }
`;

const HeadlineLine = styled(motion.span)`
  position: relative;
  display: table;
  width: fit-content;
  margin-inline: auto;
  white-space: nowrap;
  line-height: 0.82em;

  &.role-line {
    width: 5.8em;
    margin-top: 0.14em;
  }

  @media (max-width: 767px) {
    &.role-line {
      width: 5.2em;
    }
  }
`;

const HeadlineGroup = styled.div`
  position: relative;
  align-self: center;
  width: 100%;
  max-width: 100%;
`;

const Star = styled.img<{ $language: 'en' | 'ru' }>`
  position: absolute;
  z-index: 0;
  width: clamp(56px, 10vw, 160px);
  height: auto;
  pointer-events: none;
  user-select: none;

  &.star-top-left {
    display: none;
    top: 0;
    left: 0;
    transform: translate(-45%, -55%) rotate(-12deg) translate3d(var(--parallax-x, 0px), var(--parallax-y, 0px), 0);
  }

  &.star-bottom-right {
    display: none;
    right: 0;
    bottom: 0;
    z-index: 2;
    transform: translate(45%, 52%) rotate(12deg) translate3d(var(--parallax-x, 0px), var(--parallax-y, 0px), 0);
    translate: ${({ $language }) => $language === 'ru' ? '0 0' : '-0.28em 0'};
  }

  &.term {
    top: 0;
    left: 72%;
    width: clamp(82px, 12vw, 190px);
    transform: translate(-50%, -92%) rotate(-18deg) translate3d(var(--parallax-x, 0px), var(--parallax-y, 0px), 0);
  }

  @media (min-width: 1200px) {
    &.term { left: 75%; }
  }

  &.ampers {
    display: none;
    top: 92%;
    left: 23%;
    z-index: 2;
    width: clamp(80px, 11vw, 178px);
    transform: translate(-50%, -30%) rotate(-23deg) translate3d(var(--parallax-x, 0px), var(--parallax-y, 0px), 0);
    translate: ${({ $language }) => $language === 'ru' ? '-0.18em 0' : '0 0'};
  }

  @media (max-width: 991px) {
    &.star-top-left,
    &.star-bottom-right {
      display: block;
    }

    &.ampers {
      display: block;
    }
  }

  @media (max-width: 767px) {
    width: 0.95em;

    &.star-top-left {
      top: -0.54em;
      left: -0.42em;
      transform: rotate(-12deg) translate3d(var(--parallax-x, 0px), var(--parallax-y, 0px), 0);
    }

    &.star-bottom-right {
      right: -0.42em;
      bottom: -0.5em;
      transform: rotate(12deg) translate3d(var(--parallax-x, 0px), var(--parallax-y, 0px), 0);
      translate: ${({ $language }) => $language === 'ru' ? '0 0' : '-0.16em 0'};
    }

    &.term {
      top: -0.32em;
      left: 72%;
      width: 0.9em;
      transform: translateX(-50%) rotate(-28deg) translate3d(var(--parallax-x, 0px), var(--parallax-y, 0px), 0);
    }

    &.ampers {
      display: block;
      top: auto;
      bottom: -0.6em;
      left: 23%;
      width: 1.05em;
      transform: translateX(-50%) rotate(-23deg) translate3d(var(--parallax-x, 0px), var(--parallax-y, 0px), 0);
      translate: ${({ $language }) => $language === 'ru' ? '-0.1em 0' : '0 0'};
    }

  }
`;

const AmpersandAnchor = styled.span`
  position: absolute;
  top: 92%;
  left: 23%;
  width: 0;
  height: 0;
  pointer-events: none;

  @media (max-width: 767px) {
    top: auto;
    bottom: -0.6em;
    height: 0.84em;
  }
`;

const AmpersandDecoration = styled.img<{ $language: 'en' | 'ru' }>`
  position: absolute;
  z-index: 20;
  top: 0;
  left: 0;
  display: block;
  width: clamp(80px, 11vw, 178px);
  height: auto;
  pointer-events: none;
  user-select: none;
  opacity: 0;
  animation: ${ampersandReveal} 1s cubic-bezier(0.16, 1, 0.3, 1) 1.28s both;
  will-change: translate;
  translate: ${({ $language }) => $language === 'ru'
    ? 'calc(-50% - clamp(12px, 2.4vw, 37px) + var(--parallax-x, 0px)) calc(-30% + var(--parallax-y, 0px))'
    : 'calc(-50% + var(--parallax-x, 0px)) calc(-30% + var(--parallax-y, 0px))'};
  rotate: var(--ampersand-rotation, -23deg);
  transition: translate 700ms cubic-bezier(0.16, 1, 0.3, 1), rotate 580ms cubic-bezier(0.16, 1, 0.3, 1);
  filter: drop-shadow(0 14px 22px rgba(0, 0, 0, 0.18));

  &[data-cluster-visual="true"] {
    z-index: 20;
    translate: calc(-50% + var(--parallax-x, 0px)) calc(-50% + var(--parallax-y, 0px));
    rotate: -4deg;
  }

  @media (max-width: 767px) {
    width: clamp(52px, 13vw, 86px);
    animation-duration: 860ms;
    animation-delay: 1.18s;
    translate: ${({ $language }) => $language === 'ru'
      ? 'calc(-50% - clamp(5px, 1.6vw, 8px) + var(--parallax-x, 0px)) var(--parallax-y, 0px)'
      : 'calc(-50% + var(--parallax-x, 0px)) var(--parallax-y, 0px)'};
  }

  @media (max-width: 991px) {
    display: none;
  }

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    animation: none;
  }
`;

type HeroStarCorner = 'top-left' | 'bottom-right';

const HeroStarAnchor = styled.span<{ $corner: HeroStarCorner }>`
  position: absolute;
  width: 0;
  height: 0;
  pointer-events: none;
  ${({ $corner }) => $corner === 'top-left'
    ? 'top: 0; left: 0;'
    : 'right: 0; bottom: 0;'}
`;

const HeroStarDecoration = styled.img<{ $corner: HeroStarCorner; $language: 'en' | 'ru' }>`
  position: absolute;
  z-index: 20;
  top: 0;
  left: 0;
  display: block;
  width: clamp(56px, 10vw, 160px);
  height: auto;
  pointer-events: none;
  user-select: none;
  opacity: 0;
  animation: ${ampersandReveal} 1s cubic-bezier(0.16, 1, 0.3, 1) 1.28s both;
  will-change: left, top, translate, width;
  translate: ${({ $corner, $language }) => $corner === 'top-left'
    ? 'calc(-45% + var(--parallax-x, 0px)) calc(-55% + var(--parallax-y, 0px))'
    : `calc(45% ${$language === 'en' ? '- 0.28em' : ''} + var(--parallax-x, 0px)) calc(52% + var(--parallax-y, 0px))`};
  rotate: ${({ $corner }) => $corner === 'top-left' ? '-12deg' : '12deg'};
  transition: translate 580ms cubic-bezier(0.16, 1, 0.3, 1);
  filter: drop-shadow(0 14px 22px rgba(0, 0, 0, 0.18));

  &[data-cluster-visual="true"] {
    z-index: 20;
    translate: calc(-50% + var(--parallax-x, 0px)) calc(-50% + var(--parallax-y, 0px));
    rotate: ${({ $corner }) => $corner === 'top-left' ? '-8deg' : '8deg'};
  }

  &[data-at-about="true"] {
    z-index: 4;
    translate: calc(-100% - clamp(8px, 0.5vw, 12px) + var(--parallax-x, 0px)) calc(-50% + var(--parallax-y, 0px));
  }

  &[data-at-about="true"][data-heading-side="right"] {
    translate: calc(var(--parallax-x, 0px)) calc(-50% + var(--parallax-y, 0px));
  }

  @media (max-width: 991px) {
    display: none;
  }

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    animation: none;
    transition: none;
  }
`;

const Footer = styled.div`
  z-index: 2;
  width: 100vw;
  margin-left: calc(50% - 50vw);
  padding: 0 clamp(24px, 4vw, 64px);
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 20px;
  text-transform: uppercase;
  font-weight: 600;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: center;
    gap: 14px;
  }
`;

const MobileLanguageToggle = styled.button<{ $language: 'en' | 'ru' }>`
  display: none;

  @media (max-width: 767px) {
    display: inline-flex;
    position: relative;
    align-items: center;
    padding: 3px;
    border: 2px solid var(--highlited-text);
    border-radius: 8px;
    background: rgba(0, 0, 0, 0.24);
    box-shadow: 0 0 18px rgba(179, 201, 135, 0.24);
    color: var(--text);
    font: inherit;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.04em;
    cursor: pointer;
    transform: translateY(-4px);

    &::before {
      position: absolute;
      top: 3px;
      bottom: 3px;
      left: 3px;
      width: calc(50% - 3px);
      border-radius: 6px 9px 9px 9px;
      background: var(--highlited-text);
      box-shadow: 0 0 14px rgba(179, 201, 135, 0.46);
      content: '';
      transform: ${({ $language }) => $language === 'ru' ? 'translateX(100%)' : 'translateX(0)'};
      transition: transform 460ms cubic-bezier(0.34, 1.56, 0.64, 1), border-radius 460ms ease;
    }

    span {
      position: relative;
      z-index: 1;
      min-width: 36px;
      padding: 7px 8px;
      border-radius: inherit;
      opacity: 0.48;
      transition: color 220ms ease, opacity 220ms ease;
    }

    span.active {
      color: #111;
      opacity: 1;
    }

    &:focus-visible {
      outline: 2px solid var(--highlited-text);
      outline-offset: 3px;
    }
  }
`;

const DesktopLanguageToggle = styled.button<{ $language: 'en' | 'ru' }>`
  position: absolute;
  z-index: 2;
  left: 50%;
  bottom: calc(100% + clamp(10px, 1.5vh, 18px));
  display: inline-flex;
  align-items: center;
  padding: 3px;
  border: 2px solid var(--highlited-text);
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.24);
  box-shadow: 0 0 18px rgba(179, 201, 135, 0.24);
  color: var(--text);
  font: inherit;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.04em;
  cursor: pointer;
  transform: translateX(-50%);

  &::before {
    position: absolute;
    top: 3px;
    bottom: 3px;
    left: 3px;
    width: calc(50% - 3px);
    border-radius: 6px 9px 9px 9px;
    background: var(--highlited-text);
    box-shadow: 0 0 14px rgba(179, 201, 135, 0.46);
    content: '';
    transform: ${({ $language }) => $language === 'ru' ? 'translateX(100%)' : 'translateX(0)'};
    transition: transform 460ms cubic-bezier(0.34, 1.56, 0.64, 1), border-radius 460ms ease;
  }

  span {
    position: relative;
    z-index: 1;
    min-width: 40px;
    padding: 8px 10px;
    border-radius: inherit;
    opacity: 0.48;
    transition: color 220ms ease, opacity 220ms ease;
  }

  span.active {
    color: #111;
    opacity: 1;
  }

  &:focus-visible {
    outline: 2px solid var(--highlited-text);
    outline-offset: 3px;
  }

  @media (max-width: 767px) {
    display: none;
  }
`;

const navBlink = keyframes`
  50% { opacity: 0.3; }
`;

const FooterLinks = styled.nav`
  display: block;
  width: 100%;
  text-align: center;
  white-space: nowrap;
  .nav-row { display: contents; }
  .separator {
    display: inline-flex;
    align-items: center;
    padding: 0 clamp(12px, 2vw, 32px);
    font-size: ${fluidText(52, 24)};
    line-height: 1.2;
    /* Compensate for the slash glyph's optical centre in Neue Montreal. */
    transform: translateY(0.04em);
  }
  a {
    display: inline-flex;
    text-decoration: none;
    padding: 0;
    color: var(--text);
    font-size: ${fluidText(52, 24)};
    font-weight: 500;
    line-height: 1.2;
    animation: ${navBlink} 4s steps(20, start) infinite;
    transition: transform 180ms ease, font-style 180ms ease;
  }
  a:hover,
  a:focus-visible {
    animation: none;
    color: var(--text);
    font-style: italic;
    transform: scaleY(1.35);
  }
  @media (max-width: 767px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 7px;

    .nav-row {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .separator {
      padding-inline: clamp(5px, 1.5vw, 7px);
      font-size: clamp(22px, 6.5vw, 26px);
    }
    a { font-size: clamp(22px, 6.5vw, 26px); }
    .separator-between { display: none; }
  }
`;

export default function Home() {
  const { language, toggleLanguage } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const ampersandAnchorRef = useRef<HTMLSpanElement>(null);
  const ampersandImageRef = useRef<HTMLImageElement>(null);
  const star1AnchorRef = useRef<HTMLSpanElement>(null);
  const star2AnchorRef = useRef<HTMLSpanElement>(null);
  const star1ImageRef = useRef<HTMLImageElement>(null);
  const star2ImageRef = useRef<HTMLImageElement>(null);
  const ampersandInAboutRef = useRef(false);
  const decorationsInClusterRef = useRef(false);
  const frameRef = useRef<number | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const role = language === "en" ? ["FULLSTACK", "DEVELOPER"] : ["FULLSTACK", "РАЗРАБОТЧИК"];
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const scatterOpacity = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    prefersReducedMotion ? [1, 1, 1] : [1, 0.76, 0],
  );
  const greetingY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : -115]);
  const introX = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 36]);
  const introY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : -80]);
  const firstLineX = useTransform(scrollYProgress, [0, 1], ["0%", prefersReducedMotion ? "0%" : "-14%"]);
  const firstLineY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : -90]);
  const firstLineRotate = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : -7]);
  const secondLineX = useTransform(scrollYProgress, [0, 1], ["0%", prefersReducedMotion ? "0%" : "14%"]);
  const secondLineY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 95]);
  const secondLineRotate = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 7]);
  const footerY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 90]);

  useLayoutEffect(() => {
    if (prefersReducedMotion) return;

    const root = document.documentElement;
    const body = document.body;
    const previousRootOverflow = root.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    const unlock = () => {
      root.style.overflow = previousRootOverflow;
      body.style.overflow = previousBodyOverflow;
    };

    root.style.overflow = 'hidden';
    body.style.overflow = 'hidden';

    const delay = window.matchMedia('(max-width: 767px)').matches ? 2900 : 3300;
    const timer = window.setTimeout(unlock, delay);

    return () => {
      window.clearTimeout(timer);
      unlock();
    };
  }, [prefersReducedMotion]);

  useLayoutEffect(() => {
    const homeSection = sectionRef.current;
    const homeAnchor = ampersandAnchorRef.current;
    const image = ampersandImageRef.current;
    const star1Anchor = star1AnchorRef.current;
    const star2Anchor = star2AnchorRef.current;
    const star1 = star1ImageRef.current;
    const star2 = star2ImageRef.current;
    const factsHeading = document.querySelector<HTMLElement>("[data-ampersand-facts-heading]");
    const factsColumn = document.querySelector<HTMLElement>("[data-ampersand-facts-column]");
    const lastFact = document.querySelector<HTMLElement>("[data-ampersand-last-fact]");
    const developerColumn = document.querySelector<HTMLElement>("[data-ampersand-developer-column]");
    const developerHeading = developerColumn?.querySelector<HTMLElement>("h1");
    const heroNavigation = document.querySelector<HTMLElement>("[data-hero-navigation]");
    if (!homeSection || !homeAnchor || !image || !star1Anchor || !star2Anchor || !star1 || !star2 || !factsHeading || !factsColumn || !lastFact || !developerColumn || !developerHeading) return;

    const desktopQuery = window.matchMedia("(min-width: 992px)");
    let isDesktop = desktopQuery.matches;
    let isActive = true;
    let triggers: ScrollTrigger[] = [];
    const decorationMoveDuration = 0.44;
    const decorationStagger = 0.42;
    const aboutMoveDuration = 0.36;
    const aboutStagger = 0.26;

    const setPosition = (
      target: HTMLImageElement,
      left: number,
      top: number,
      animate: boolean,
      width?: number,
      delay = 0,
      onStart?: () => void,
      duration = decorationMoveDuration
    ) => {
      gsap.killTweensOf(target);
      const position = { left, top };
      if (width !== undefined) Object.assign(position, { width });
      if (animate) {
        gsap.to(target, {
          ...position,
          delay,
          duration,
          ease: "power3.out",
          overwrite: "auto",
          onStart,
        });
      } else {
        onStart?.();
        gsap.set(target, position);
      }
    };

    const getLayoutPosition = (element: HTMLElement) => {
      let left = 0;
      let top = 0;
      let current: HTMLElement | null = element;
      while (current && current !== document.body) {
        left += current.offsetLeft;
        top += current.offsetTop;
        current = current.offsetParent as HTMLElement | null;
      }
      return { left, top };
    };

    const heroStarWidth = () => Math.min(160, Math.max(56, window.innerWidth * 0.1));
    const heroAmpersandWidth = () => Math.min(178, Math.max(80, window.innerWidth * 0.11));
    const imageHeightAtWidth = (element: HTMLImageElement, width: number) => {
      if (element.naturalWidth) return width * element.naturalHeight / element.naturalWidth;
      return element.offsetWidth ? element.offsetHeight * width / element.offsetWidth : width;
    };

    const positionAtHome = (animate = false) => {
      ampersandInAboutRef.current = false;
      decorationsInClusterRef.current = false;
      image.style.setProperty("--ampersand-rotation", "-23deg");
      image.dataset.clusterVisual = "false";
      star1.dataset.clusterVisual = "false";
      star2.dataset.clusterVisual = "false";
      const position = getLayoutPosition(homeAnchor);
      setPosition(image, position.left, position.top, animate, heroAmpersandWidth());

      const width = heroStarWidth();
      star1.dataset.atAbout = "false";
      star2.dataset.atAbout = "false";
      const firstStarPosition = getLayoutPosition(star1Anchor);
      const secondStarAnchorPosition = getLayoutPosition(star2Anchor);
      setPosition(star1, firstStarPosition.left, firstStarPosition.top, animate, width);
      setPosition(
        star2,
        secondStarAnchorPosition.left - width,
        secondStarAnchorPosition.top - imageHeightAtWidth(star2, width),
        animate,
        width
      );
    };

    const positionAtCluster = (animate = false) => {
      if (!isDesktop) {
        positionAtHome(animate);
        return;
      }

      const staggerFromAbout = animate && ampersandInAboutRef.current;
      ampersandInAboutRef.current = false;
      decorationsInClusterRef.current = true;
      if (!staggerFromAbout) {
        image.dataset.clusterVisual = "true";
        star1.dataset.clusterVisual = "true";
        star2.dataset.clusterVisual = "true";
        star1.dataset.atAbout = "false";
        star2.dataset.atAbout = "false";
        delete star1.dataset.headingSide;
        delete star2.dataset.headingSide;
      }
      image.style.setProperty("--ampersand-rotation", "-4deg");

      const centerX = window.innerWidth / 2;
      const clusterStarWidth = Math.min(66, Math.max(48, window.innerWidth * 0.04));
      const clusterAmpersandWidth = Math.min(148, Math.max(108, window.innerWidth * 0.076));
      const navBottom = heroNavigation?.getBoundingClientRect().bottom ?? window.innerHeight * 0.58;
      const centerY = navBottom + Math.max(24, clusterAmpersandWidth * 0.82);

      setPosition(
        image,
        centerX + window.scrollX,
        centerY + window.scrollY,
        animate,
        clusterAmpersandWidth,
        staggerFromAbout ? decorationStagger : 0,
        () => { image.dataset.clusterVisual = "true"; }
      );
      setPosition(
        star1,
        centerX - 42 + window.scrollX,
        centerY - 10 + window.scrollY,
        animate,
        clusterStarWidth,
        staggerFromAbout ? decorationStagger * 2 : 0,
        () => {
          star1.dataset.atAbout = "false";
          delete star1.dataset.headingSide;
          star1.dataset.clusterVisual = "true";
        }
      );
      setPosition(
        star2,
        centerX + 42 + window.scrollX,
        centerY + 8 + window.scrollY,
        animate,
        clusterStarWidth,
        0,
        () => {
          star2.dataset.atAbout = "false";
          delete star2.dataset.headingSide;
          star2.dataset.clusterVisual = "true";
        }
      );
    };

    const positionAtAbout = (animate = false) => {
      if (!isDesktop) {
        positionAtHome(animate);
        return;
      }

      const staggerFromCluster = animate && decorationsInClusterRef.current;
      ampersandInAboutRef.current = true;
      decorationsInClusterRef.current = false;
      if (!staggerFromCluster) {
        image.dataset.clusterVisual = "false";
        star1.dataset.clusterVisual = "false";
        star2.dataset.clusterVisual = "false";
      }
      const factsRect = factsColumn.getBoundingClientRect();
      const developerRect = developerColumn.getBoundingClientRect();
      const lastFactWord = Array.from(lastFact.querySelectorAll<HTMLElement>(".hidden2")).pop();
      if (!lastFactWord) return;
      const lastFactWordRect = lastFactWord.getBoundingClientRect();
      const aboutAmpersandWidth = Math.min(240, Math.max(100, window.innerWidth * 0.14));
      const centerX = (factsRect.right + developerRect.left) / 2 - window.innerWidth * 0.023;
      const gap = Math.max(4, window.innerWidth * 0.002);
      const homeLanguageOffsetX = language === "ru"
        ? Math.min(37, Math.max(12, window.innerWidth * 0.024))
        : 0;

      image.style.setProperty("--ampersand-rotation", "-4deg");
      setPosition(image,
        centerX + homeLanguageOffsetX + window.scrollX,
        lastFactWordRect.bottom + gap - Math.max(20, window.innerWidth * 0.01) + window.scrollY,
        animate,
        aboutAmpersandWidth,
        staggerFromCluster ? aboutStagger : 0,
        () => { image.dataset.clusterVisual = "false"; },
        aboutMoveDuration
      );

      const alignStarWithHeading = (star: HTMLImageElement, heading: HTMLElement, side: "left" | "right", delay: number) => {
        const headingRect = heading.getBoundingClientRect();
        const starGap = -Math.min(28, Math.max(14, window.innerWidth * 0.014));
        const width = Math.min(
          84,
          Math.max(42, window.innerWidth * 0.04),
          Math.max(24, headingRect.left - starGap)
        );
        const headingEnd = Array.from(heading.querySelectorAll<HTMLElement>(".hidden2")).pop();
        const targetX = side === "right" && headingEnd
          ? headingEnd.getBoundingClientRect().right + starGap
          : headingRect.left - starGap;
        setPosition(
          star,
          targetX + window.scrollX,
          headingRect.top + headingRect.height / 2 + window.scrollY,
          animate,
          width,
          staggerFromCluster ? delay : 0,
          () => {
            star.dataset.atAbout = "true";
            star.dataset.headingSide = side;
            star.dataset.clusterVisual = "false";
          },
          aboutMoveDuration
        );
      };

      alignStarWithHeading(star1, factsHeading, "left", 0);
      alignStarWithHeading(star2, developerHeading, "right", aboutStagger * 2);

      if (animate) {
        window.dispatchEvent(new CustomEvent("portfolio:about-image-arrival", {
          detail: { stagger: aboutStagger },
        }));
      }
    };

    const syncPosition = () => {
      if (!isActive) return;
      if (isDesktop && ampersandInAboutRef.current) {
        positionAtAbout(false);
      } else if (isDesktop && decorationsInClusterRef.current) {
        positionAtCluster(false);
      } else {
        positionAtHome(false);
      }
    };

    const createTriggers = () => {
      triggers.forEach((trigger) => trigger.kill());
      triggers = [];
      isDesktop = desktopQuery.matches;

      if (!isDesktop) {
        positionAtHome();
        return;
      }

      const factsCenter = factsHeading.getBoundingClientRect().top + factsHeading.offsetHeight / 2;
      const clusterStartScroll = homeSection.getBoundingClientRect().top + window.scrollY + Math.max(180, window.innerHeight * 0.3);
      ampersandInAboutRef.current = factsCenter <= window.innerHeight * 0.72;
      decorationsInClusterRef.current = !ampersandInAboutRef.current && window.scrollY >= clusterStartScroll;
      syncPosition();

      triggers.push(ScrollTrigger.create({
        trigger: homeSection,
        start: () => `top top-=${Math.round(Math.max(180, window.innerHeight * 0.3))}`,
        end: "bottom top",
        onEnter: () => positionAtCluster(true),
        onLeaveBack: () => positionAtHome(true),
      }));

      triggers.push(ScrollTrigger.create({
        trigger: factsHeading,
        start: "center 72%",
        onEnter: () => positionAtAbout(true),
        onEnterBack: () => positionAtAbout(true),
        onLeaveBack: () => positionAtCluster(true),
      }));
    };

    createTriggers();

    const resizeObserver = new ResizeObserver(syncPosition);
    [homeAnchor, homeAnchor.parentElement, star1Anchor, star1Anchor.parentElement, star2Anchor, star2Anchor.parentElement, heroNavigation, factsColumn, factsHeading, lastFact, developerColumn, developerHeading]
      .filter((element): element is HTMLElement => element !== null)
      .forEach((element) => resizeObserver.observe(element));

    void document.fonts?.ready.then(syncPosition);
    image.addEventListener("load", syncPosition);
    star1.addEventListener("load", syncPosition);
    star2.addEventListener("load", syncPosition);

    const handleResize = () => {
      if (desktopQuery.matches !== isDesktop) {
        createTriggers();
      } else {
        syncPosition();
      }
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      isActive = false;
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
      image.removeEventListener("load", syncPosition);
      star1.removeEventListener("load", syncPosition);
      star2.removeEventListener("load", syncPosition);
      triggers.forEach((trigger) => trigger.kill());
      gsap.killTweensOf([image, star1, star2]);
    };
  }, [language]);

  const updateParallax = (reset = false) => {
    const section = sectionRef.current;
    if (!section) return;

    const elements = Array.from(section.querySelectorAll<HTMLElement>('[data-parallax]'));
    [ampersandImageRef.current, star1ImageRef.current, star2ImageRef.current].forEach((decoration) => {
      if (decoration) elements.push(decoration);
    });

    elements.forEach((element) => {
      const depth = Number(element.dataset.parallax ?? 0);
      const x = reset ? 0 : pointerRef.current.x * depth;
      const y = reset ? 0 : pointerRef.current.y * depth;
      element.style.setProperty('--parallax-x', `${x}px`);
      element.style.setProperty('--parallax-y', `${y}px`);
    });
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    pointerRef.current = {
      x: ((event.clientX - bounds.left) / bounds.width - 0.5) * 2,
      y: ((event.clientY - bounds.top) / bounds.height - 0.5) * 2,
    };
    event.currentTarget.dataset.parallaxActive = 'true';
    [ampersandImageRef.current, star1ImageRef.current, star2ImageRef.current].forEach((decoration) => {
      decoration?.style.setProperty('transition-duration', '180ms');
    });

    if (frameRef.current === null) {
      frameRef.current = requestAnimationFrame(() => {
        updateParallax();
        frameRef.current = null;
      });
    }
  };

  const resetParallax = () => {
    if (sectionRef.current) sectionRef.current.dataset.parallaxActive = 'false';
    [ampersandImageRef.current, star1ImageRef.current, star2ImageRef.current].forEach((decoration) => {
      decoration?.style.setProperty('transition-duration', '700ms');
    });
    updateParallax(true);
  };

  return (
    <Section id="home" ref={sectionRef} onPointerMove={handlePointerMove} onPointerLeave={resetParallax}>
      <HeroContent>
        <ScrollLayer style={{ y: greetingY, opacity: scatterOpacity }}>
          <GreetingReveal data-hero-reveal="greeting">
            <DesktopLanguageToggle
              data-hero-reveal="language-toggle"
              $language={language}
              type="button"
              onClick={toggleLanguage}
              aria-label={language === 'en' ? 'Switch to Russian' : 'Switch to English'}
            >
              <span className={language === 'en' ? 'active' : ''}>EN</span>
              <span className={language === 'ru' ? 'active' : ''}>RU</span>
            </DesktopLanguageToggle>
            <TopPill data-parallax="10">
              <TypewriterGreeting text={language === "en" ? "HELLO, MY NAME IS ALEXEY" : "ПРИВЕТ, МЕНЯ ЗОВУТ АЛЕКСЕЙ"} />
            </TopPill>
          </GreetingReveal>
        </ScrollLayer>
        <Main data-hero-reveal="title">
          <ScrollLayer style={{ x: introX, y: introY, opacity: scatterOpacity }}>
            <Intro data-parallax="10">
              <AnimatedText text={language === 'en' ? "I'M" : 'Я'} />
            </Intro>
          </ScrollLayer>
          <HeadlineGroup>
            <Headline data-parallax="10" aria-label={role.join(" ")}>
              <HeadlineLine style={{ x: firstLineX, y: firstLineY, rotate: firstLineRotate, opacity: scatterOpacity }}>
                <Star $language={language} data-parallax="24" className="star-top-left" src={star1Src} alt="" aria-hidden="true" />
                <HeroStarAnchor ref={star1AnchorRef} $corner="top-left" aria-hidden="true" />
                <Star $language={language} data-parallax="19" className="term" src={termSrc} alt="" aria-hidden="true" />
                {role[0]}
              </HeadlineLine>
              <HeadlineLine className="role-line" style={{ x: secondLineX, y: secondLineY, rotate: secondLineRotate, opacity: scatterOpacity }}>
                <Star $language={language} data-parallax="24" className="star-bottom-right" src={star2Src} alt="" aria-hidden="true" />
                <HeroStarAnchor ref={star2AnchorRef} $corner="bottom-right" aria-hidden="true" />
                <Star
                  $language={language}
                  data-parallax="16"
                  className="ampers"
                  src={ampersSrc}
                  alt=""
                  aria-hidden="true"
                />
                <AmpersandAnchor ref={ampersandAnchorRef} aria-hidden="true" />
                <AnimatedText text={role[1]} compact={language === 'ru'} />
              </HeadlineLine>
            </Headline>
          </HeadlineGroup>
        </Main>
      </HeroContent>
      <ScrollLayer style={{ y: footerY, opacity: scatterOpacity }}>
        <Footer data-hero-reveal="footer">
          <MobileLanguageToggle
            $language={language}
            type="button"
            onClick={toggleLanguage}
            aria-label={language === 'en' ? 'Switch to Russian' : 'Switch to English'}
          >
            <span className={language === 'en' ? 'active' : ''}>EN</span>
            <span className={language === 'ru' ? 'active' : ''}>RU</span>
          </MobileLanguageToggle>
          <FooterLinks data-hero-navigation aria-label={language === "en" ? "Explore" : "Навигация"}>
            <div className="nav-row">
              <a href="#about">ABOUT</a>
              <span className="separator" aria-hidden="true">/</span>
              <a href="#skills">SKILLS</a>
            </div>
            <span className="separator separator-between" aria-hidden="true">/</span>
            <div className="nav-row">
              <a href="#experience">EXPERIENCE</a>
              <span className="separator" aria-hidden="true">/</span>
              <a
                href="#contacts"
                onClick={(event) => {
                  event.preventDefault();
                  const contactsSection = document.getElementById("contacts");
                  if (contactsSection) scrollToElement(contactsSection, 240);
                }}
              >CONTACTS</a>
            </div>
          </FooterLinks>
        </Footer>
      </ScrollLayer>
      {typeof document !== "undefined" && createPortal(
        <>
          <AmpersandDecoration
            ref={ampersandImageRef}
            $language={language}
            src={ampersSrc}
            data-parallax="16"
            alt=""
            aria-hidden="true"
            data-cluster-visual="false"
          />
          <HeroStarDecoration
            ref={star1ImageRef}
            $corner="top-left"
            $language={language}
            src={star1Src}
            data-parallax="24"
            data-at-about="false"
            data-cluster-visual="false"
            alt=""
            aria-hidden="true"
          />
          <HeroStarDecoration
            ref={star2ImageRef}
            $corner="bottom-right"
            $language={language}
            src={star2Src}
            data-parallax="24"
            data-at-about="false"
            data-cluster-visual="false"
            alt=""
            aria-hidden="true"
          />
        </>,
        document.body
      )}
    </Section>
  );
}
