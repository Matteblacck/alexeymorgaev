import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styled, { keyframes } from "styled-components";

type Language = "en" | "ru";

const accents = [
  { id: "sage", label: { en: "Sage", ru: "Шалфейный" }, color: "#b3c987" },
  { id: "ice", label: { en: "Ice", ru: "Ледяной" }, color: "#91b8c9" },
  { id: "amber", label: { en: "Amber", ru: "Янтарный" }, color: "#d2b27a" },
  { id: "lilac", label: { en: "Lilac", ru: "Сиреневый" }, color: "#b5a2d1" },
  { id: "acid", label: { en: "Lime", ru: "Лайм" }, color: "#d7ff35" },
  { id: "coral", label: { en: "Coral", ru: "Коралловый" }, color: "#ee8d7a" },
  { id: "sky", label: { en: "Sky", ru: "Голубой" }, color: "#72bde3" },
  { id: "rose", label: { en: "Rose", ru: "Розовый" }, color: "#d98bb7" },
  { id: "electric", label: { en: "Electric blue", ru: "Электрик" }, color: "#4d6fff" },
  { id: "turquoise", label: { en: "Turquoise", ru: "Бирюзовый" }, color: "#16d9c3" },
  { id: "violet", label: { en: "Violet", ru: "Фиолетовый" }, color: "#a855f7" },
  { id: "orange", label: { en: "Orange", ru: "Оранжевый" }, color: "#ff6a3d" },
] as const;

type AccentId = (typeof accents)[number]["id"];
const BASE_BACKGROUND = "#000000";

const controlReveal = keyframes`
  from { opacity: 0; transform: translate3d(0, 5px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
`;

const ThemePanel = styled.div`
  --theme-reveal-delay: 2.48s;
  position: absolute;
  z-index: 15;
  top: clamp(94px, 12vh, 138px);
  right: clamp(20px, 4vw, 64px);
  display: grid;
  gap: 12px;
  width: 270px;
  box-sizing: border-box;
  padding: 13px 10px 14px;
  background: transparent;
  color: var(--text);

  @media (max-width: 767px) {
    --theme-reveal-delay: 2.22s;
    position: relative;
    top: auto;
    right: auto;
    left: auto;
    align-self: center;
    width: min(290px, calc(100vw - 24px));
    margin-top: clamp(124px, 11vh, 142px);
    padding: 15px 10px 16px;
  }
`;

const ControlRow = styled.div`
  width: 100%;
  animation: ${controlReveal} 440ms cubic-bezier(0.2, 0.75, 0.25, 1) both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const SwatchTray = styled.div`
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  grid-template-rows: repeat(2, 30px);
  align-items: center;
  justify-items: center;
  row-gap: 4px;
  width: 100%;
  min-height: 64px;
`;

const AccentSwatch = styled.label<{ $color: string; $selected: boolean }>`
  position: relative;
  display: grid;
  width: 30px;
  height: 30px;
  place-items: center;
  cursor: pointer;

  input {
    position: absolute;
    inset: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    margin: 0;
    opacity: 0;
    cursor: pointer;
  }

  span {
    position: relative;
    display: block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${({ $color }) => $color};
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.2);
    transition: transform 180ms ease, box-shadow 180ms ease;
  }

  span::after {
    position: absolute;
    inset: -5px;
    border: 1px solid rgba(255, 255, 255, 0.88);
    border-radius: 50%;
    box-shadow: 0 0 12px ${({ $color }) => `${$color}88`};
    content: "";
    opacity: ${({ $selected }) => ($selected ? 1 : 0)};
    transform: scale(${({ $selected }) => ($selected ? 1 : 0.72)});
    transition: opacity 180ms ease, transform 180ms ease;
  }

  &:hover span,
  input:focus-visible + span {
    box-shadow:
      inset 0 0 0 1px rgba(255, 255, 255, 0.24),
      0 0 16px ${({ $color }) => `${$color}99`};
    transform: scale(1.16);
  }

  input:focus-visible + span::after {
    border-color: var(--highlited-text);
    opacity: 1;
  }

  @media (prefers-reduced-motion: reduce) {
    span,
    span::after {
      transition: none;
    }
  }
`;

function parseHex(hex: string) {
  const value = hex.replace("#", "");
  return [0, 2, 4].map((index) => Number.parseInt(value.slice(index, index + 2), 16));
}

function toHex(rgb: number[]) {
  return `#${rgb.map((value) => Math.round(value).toString(16).padStart(2, "0")).join("")}`;
}

function blendHex(from: string, to: string, amount: number) {
  const source = parseHex(from);
  const target = parseHex(to);
  return toHex(source.map((channel, index) => channel + (target[index] - channel) * amount));
}

function luminance(hex: string) {
  const channels = parseHex(hex).map((channel) => {
    const normalized = channel / 255;
    return normalized <= 0.04045 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
  });
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}

function contrastRatio(first: string, second: string) {
  const values = [luminance(first), luminance(second)].sort((a, b) => b - a);
  return (values[0] + 0.05) / (values[1] + 0.05);
}

function contrastingText(background: string) {
  return contrastRatio(background, "#ffffff") >= contrastRatio(background, "#111111")
    ? "#ffffff"
    : "#111111";
}

function readableAccent(background: string, accent: string, text: string) {
  if (contrastRatio(background, accent) >= 4.5) return accent;

  let low = 0;
  let high = 1;
  for (let attempt = 0; attempt < 20; attempt += 1) {
    const middle = (low + high) / 2;
    if (contrastRatio(background, blendHex(accent, text, middle)) >= 4.5) high = middle;
    else low = middle;
  }
  return blendHex(accent, text, high);
}

function hue(hex: string) {
  const [r8, g8, b8] = parseHex(hex);
  const [r, g, b] = [r8, g8, b8].map((channel) => channel / 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  if (delta === 0) return 0;
  if (max === r) return ((g - b) / delta + (g < b ? 6 : 0)) * 60;
  if (max === g) return ((b - r) / delta + 2) * 60;
  return ((r - g) / delta + 4) * 60;
}

export default function ThemeControls({ language }: { language: Language }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [accentId, setAccentId] = useState<AccentId>("sage");
  const [hoverAccentId, setHoverAccentId] = useState<AccentId | null>(null);
  const [focusAccentId, setFocusAccentId] = useState<AccentId | null>(null);
  const previewAccentId = hoverAccentId ?? focusAccentId;
  const activeAccent = accents.find((option) => option.id === previewAccentId)
    ?? accents.find((option) => option.id === accentId)
    ?? accents[0];
  const text = "#ffffff";
  const readableActiveAccent = readableAccent(BASE_BACKGROUND, activeAccent.color, text);
  const rayHueShift = ((hue(activeAccent.color) - hue(accents[0].color) + 540) % 360) - 180;

  useLayoutEffect(() => {
    const root = document.documentElement;
    const surface = blendHex(BASE_BACKGROUND, text, 0.045);
    const [backgroundRed, backgroundGreen, backgroundBlue] = parseHex(BASE_BACKGROUND);
    const [textRed, textGreen, textBlue] = parseHex(text);
    const [accentRed, accentGreen, accentBlue] = parseHex(readableActiveAccent);
    root.style.setProperty("--background", BASE_BACKGROUND);
    root.style.setProperty("--background-rgb", `${backgroundRed}, ${backgroundGreen}, ${backgroundBlue}`);
    root.style.setProperty("--text", text);
    root.style.setProperty("--text-rgb", `${textRed}, ${textGreen}, ${textBlue}`);
    root.style.setProperty("--highlited-text", readableActiveAccent);
    root.style.setProperty("--accent-rgb", `${accentRed}, ${accentGreen}, ${accentBlue}`);
    root.style.setProperty("--button-bg", readableActiveAccent);
    root.style.setProperty("--button-text", contrastingText(readableActiveAccent));
    root.style.setProperty("--surface", surface);
    root.style.setProperty(
      "--surface-border",
      `rgba(${textRed}, ${textGreen}, ${textBlue}, 0.14)`,
    );
    root.style.setProperty("--modal-backdrop", "rgba(0, 0, 0, 0.86)");
    root.style.setProperty(
      "--header-scrim-rgb",
      `${backgroundRed}, ${backgroundGreen}, ${backgroundBlue}`,
    );
    root.style.setProperty("--ray-hue-shift", `${rayHueShift}deg`);
    root.style.colorScheme = text === "#ffffff" ? "dark" : "light";
  }, [activeAccent, readableActiveAccent, rayHueShift, text]);

  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    gsap.registerPlugin(ScrollTrigger);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealDelay = window.matchMedia("(max-width: 767px)").matches ? 2.22 : 2.48;
    let revealed = false;
    let revealTween: gsap.core.Tween | undefined;
    let visibilityTween: gsap.core.Tween | undefined;
    let directionTrigger: ScrollTrigger | undefined;

    const setVisible = (visible: boolean) => {
      revealTween?.kill();
      if (revealed === visible) return;

      revealed = visible;
      visibilityTween?.kill();
      gsap.set(panel, { pointerEvents: visible ? "auto" : "none" });
      visibilityTween = gsap.to(panel, {
        autoAlpha: visible ? 1 : 0,
        y: visible ? 0 : -9,
        duration: reducedMotion ? 0 : 0.34,
        ease: "power2.out",
        overwrite: true,
      });
    };

    const context = gsap.context(() => {
      gsap.set(panel, { autoAlpha: 0, y: 9, pointerEvents: "none" });
      revealTween = gsap.to(panel, {
        autoAlpha: 1,
        y: 0,
        duration: reducedMotion ? 0 : 0.62,
        delay: reducedMotion ? 0 : revealDelay,
        ease: "power3.out",
        onComplete: () => {
          revealed = true;
          gsap.set(panel, { pointerEvents: "auto" });
        },
      });

      let lastDirection = 0;
      directionTrigger = ScrollTrigger.create({
        start: 0,
        end: () => ScrollTrigger.maxScroll(window),
        onUpdate: (self) => {
          const scrollPosition = self.scroll();
          if (scrollPosition <= 24) {
            if (self.direction === -1) setVisible(true);
            return;
          }

          if (self.direction === lastDirection) return;
          lastDirection = self.direction;
          setVisible(self.direction === -1);
        },
      });
    }, panel);

    return () => {
      directionTrigger?.kill();
      revealTween?.kill();
      visibilityTween?.kill();
      context.revert();
    };
  }, []);

  const setAccent = (accent: AccentId) => setAccentId(accent);

  return (
    <ThemePanel
      ref={panelRef}
      role="radiogroup"
      aria-label={language === "en" ? "Accent color" : "Акцентный цвет"}
    >
      <ControlRow>
        <SwatchTray>
          {accents.map((option) => (
            <AccentSwatch
              key={option.id}
              $color={option.color}
              $selected={accentId === option.id}
              onPointerEnter={() => setHoverAccentId(option.id)}
              onPointerLeave={() => setHoverAccentId(null)}
            >
              <input
                type="radio"
                name="theme-accent"
                value={option.id}
                checked={accentId === option.id}
                aria-label={option.label[language]}
                onFocus={() => setFocusAccentId(option.id)}
                onBlur={() => setFocusAccentId(null)}
                onChange={() => setAccent(option.id)}
              />
              <span />
            </AccentSwatch>
          ))}
        </SwatchTray>
      </ControlRow>
    </ThemePanel>
  );
}
