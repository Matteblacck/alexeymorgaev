import styled, { keyframes } from "styled-components";
import { fluidText } from "../05-shared/utils";
import { Fragment, useEffect, useRef, useState } from "react";
import { useLanguage } from "../05-shared/useLanguage";
import { revealOnScroll } from "../05-shared/revealOnScroll";
import { formatExperienceDuration, totalExperienceMonths } from "./Experience";

const SectionContainer = styled.div`
  width: 100%;
  position: relative;
  background: transparent;
  padding-top: 30vh;
  overflow: hidden;
  @media (max-width: 992px) {
    min-height: 100vh;
    height: auto;
    padding-bottom: 12vh;
  }
`;

const Container = styled.div`
  position: relative;
  padding: 20px;
  z-index: 5;
  @media (max-width: 992px) {
    min-height: 100vh;
    height: auto;
  }
`;

const GeneralInfo = styled.div`
  min-width: 200px;
  max-width: 500px;
  word-wrap: break-word;
  white-space: normal;
  
  h1 span.hidden2,
  p span.hidden2 {
    margin-right: 0.14em;
  }

  h1 span {
    font-weight: 100;
    font-size: ${fluidText(22, 18)};
    margin-bottom: 0.2rem;
    font-style: italic;
  }

  p span {
    font-size: ${fluidText(55, 25)};
    font-weight: 500;
    line-height: 1.2;
  }

  p span.experience-word {
    color: var(--highlited-text);
  }
`;

const MoreInfo = styled.div`
  min-width: 200px;
  max-width: 600px;
  word-wrap: break-word;
  white-space: normal;
  margin-top: 30vh;

  h1 span.hidden2,
  p span.hidden2 {
    margin-right: 0.14em;
  }

  @media (max-width: 992px) {
    margin-top: 0;
  }

  h1 span {
    font-weight: 100;
    font-size: ${fluidText(22, 18)};
    margin-bottom: 0.2rem;
    font-style: italic;
  }

  p span {
    font-size: ${fluidText(40, 25)};
    font-weight: 500;
    line-height: 1.2;
  }

  @media (max-width: 576px) {
    max-width: 100%;

    p span {
      font-size: ${fluidText(31, 22)};
      line-height: 1.16;
    }
  }
`;
const marquee = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
`;
const marqueeReverse = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
`;

const MarqueeWrapper = styled.div`
  width: 150%;
  overflow: hidden;
  white-space: nowrap;
  padding: 10px 0;
  position: absolute;
  z-index: 1;
  opacity: 0.8;
  margin-left: -10%;
  margin-right: -10%;
  
  // Увеличиваем зону наведения на 100px сверху и снизу
  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100px; // Зона наведения (можно увеличить)
    left: 0;
    pointer-events: all; // Делает область активной для наведения
  }

  &::before {
    top: -100px; // Выступает вверх
  }

  &::after {
    bottom: -100px; // Выступает вниз
  }
`;
const MarqueeTextWrapper = styled.div.withConfig({shouldForwardProp: (prop) => prop !== "reverse",})<{ reverse: boolean }>`
    display: flex;
    animation: ${({ reverse }) => (reverse ? marqueeReverse : marquee)} 
      ${({ reverse }) => (reverse ? "20s" : "60s")} linear infinite; // Ускорение обратной анимации
  `;
const MarqueeText = styled.div`
  font-size: 24px;
  font-weight: 500;
  white-space: nowrap;
  padding-right: 20px; // Отступ между копиями текста
`;

const renderAnimatedWords = (text: string, stagger = false, highlight = false) => {
  const words = text.split(" ");

  return words.map((word, index) => (
    <Fragment key={`${index}-${word}`}>
      <span
        className={`hidden2${highlight ? " experience-word" : ""}`}
        style={stagger ? { transitionDelay: `${index * 0.018}s` } : undefined}
      >
        {word}
      </span>
      {index < words.length - 1 ? " " : null}
    </Fragment>
  ));
};

export default function About() {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);

  const experienceLabel = language === "en" ? "EXPERIENCE" : "ОПЫТ РАБОТЫ";
  const experienceDuration = formatExperienceDuration(totalExperienceMonths, language).toUpperCase();
    
  useEffect(() => {
    return revealOnScroll(sectionRef.current, [
      { selector: ".hidden", visibleClass: "visible" },
      { selector: ".hidden2", visibleClass: "visible2" },
    ]);
  }, [language]);

  const textData = {
    en: {
      general: [
        "SEVERAL FACTS ABOUT ME:",
        `${experienceLabel}: ${experienceDuration}`,
        "LIVE IN: MOSCOW",
        "LOVE: CODE",
      ],
      more: [
        "ME AS A DEVELOPER:",
        "I'M A FULL-STACK ENGINEER WHO ENJOYS TAKING OWNERSHIP OF COMPLEX FEATURES FROM IDEA TO PRODUCTION. I WORK ACROSS THE ENTIRE STACK: BUILDING MODERN USER INTERFACES, DEVELOPING ROBUST BACKEND SERVICES, DESIGNING DATABASES, AND ARCHITECTING SCALABLE SOLUTIONS THAT SOLVE REAL PROBLEMS.",
      ],
    },
    ru: {
      general: [
        "НЕСКОЛЬКО ФАКТОВ ОБО МНЕ:",
        `${experienceLabel}: ${experienceDuration}`,
        "ЖИВУ В: МОСКВЕ",
        "ЛЮБЛЮ: КОД",
      ],
      more: [
        "Я КАК РАЗРАБОТЧИК:",
        "Я FULL-STACK РАЗРАБОТЧИК, КОТОРОМУ НРАВИТСЯ БРАТЬ НА СЕБЯ СЛОЖНЫЕ ФИЧИ ОТ ИДЕИ ДО ПРОДАКШЕНА. РАБОТАЮ ПО ВСЕМУ СТЕКУ: СОЗДАЮ СОВРЕМЕННЫЕ ИНТЕРФЕЙСЫ, РАЗВИВАЮ НАДЕЖНЫЕ BACKEND-СЕРВИСЫ, ПРОЕКТИРУЮ БАЗЫ ДАННЫХ И АРХИТЕКТУРУ РЕШЕНИЙ ДЛЯ РЕАЛЬНЫХ ЗАДАЧ.",
      ],
    },
  }[language];
  const [reverseMarquee, setReverseMarquee] = useState(false);
  const marqueeText2 = "Warning! Frontend! ";
  return (
    <SectionContainer ref={sectionRef} id="about">
        <MarqueeWrapper
        style={{ transform: "rotate(-20deg)", marginTop: "20vh", zIndex: "4", opacity: '0.3'}}
        onMouseEnter={() => setReverseMarquee(true)}
        onMouseLeave={() => setReverseMarquee(false)}
        className="hidden about-marquee"
        data-marquee-parallax
      >
        <MarqueeTextWrapper
          key={reverseMarquee ? "reverse" : "normal"}
          reverse={reverseMarquee}
        >
          <MarqueeText>{marqueeText2.toUpperCase().repeat(1000)}</MarqueeText>
        </MarqueeTextWrapper>
      </MarqueeWrapper>
      <Container >
        <div className="d-flex justify-content-around flex-column flex-lg-row gap-5 justify-content-center">
          <GeneralInfo>
            <h1>
              {renderAnimatedWords(textData.general[0])}
            </h1>
            <p>
              {textData.general.slice(1).map((line, lineIndex) => (
                <span key={lineIndex}>
                  {renderAnimatedWords(line, true, lineIndex === 0)}
                  <br />
                </span>
              ))} 
            </p>
          </GeneralInfo>
          <MoreInfo >
            <h1>
              {renderAnimatedWords(textData.more[0])}
            </h1>
            <p>
              {renderAnimatedWords(textData.more[1], true)}
            </p>
          </MoreInfo>
        </div>
      </Container>
    </SectionContainer>
  );
}
