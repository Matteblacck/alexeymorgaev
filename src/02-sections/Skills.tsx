import styled, { keyframes } from "styled-components";
import { fluidText } from "../05-shared/utils";
import { useEffect, useRef, useState } from "react";
import TechMarquee from "../05-shared/TechMarquee";
import { techIcons } from "../05-shared/Icons";
import { revealOnScroll } from "../05-shared/revealOnScroll";

const SectionContainer = styled.div`
  width: 100%;
  position: relative;
  background: transparent; // Прозрачный фон
  overflow: hidden; // Скрываем всё, что выходит за пределы контейнера
`;

// Контейнер для основного контента
const Container = styled.div`
  position: relative;
  padding: 20px;
  z-index: 5;
  width: 100%; // Добавьте это
  padding-top: 20vh;
  @media (max-width: 768px) {
  }
`;
const SkillsContainer = styled.div`
  h3 {
    font-weight: 100;
  }
`;
const SkillTypeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const SkillTypeItem = styled.div<{ $align?: "left" | "right" }>`
  display: grid;
  grid-template-columns: ${({ $align }) =>
    $align === "left" ? "minmax(0, 1fr) 34px" : "34px minmax(0, 1fr)"};

  align-items: center;

  gap: 12px;

  position: relative;

  padding: 0.65rem 0.85rem;

  border-radius: 8px;

  overflow: hidden;

  transition: all 0.3s ease-in-out;

  svg {
    width: 24px;

    height: 24px;

    justify-self: center;

    flex-shrink: 0;

    font-size: 24px;

    position: relative;

    z-index: 2;

    ${({ $align }) => $align === "left" && "grid-column: 2;"}
  }

  p {
    font-size: ${fluidText(25, 14)};

    font-weight: 500;

    margin: 0;

    position: relative;

    z-index: 2;

    min-width: 0;

    line-height: 1.15;

    text-align: ${({ $align }) => ($align === "left" ? "right" : "left")};

    ${({ $align }) => $align === "left" && "grid-column: 1; grid-row: 1;"}
  }

  &:hover {
    color: var(--highlited-text);
    transform: translateY(-3px);
    border-color: var(--highlited-text);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    background: rgba(255, 255, 255, 0.05);
  }

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 8px;
    padding: 2px;
    background: linear-gradient(
      90deg,
      transparent,
      var(--highlited-text),
      var(--highlited-text),
      transparent
    );
    background-size: 200% 100%;
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    z-index: 0;
  }

  &:hover::before {
    opacity: 1;
    animation: borderGlow 2s linear infinite;
  }

  @keyframes borderGlow {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 8px;
    padding: 1px;
    background: radial-gradient(
      circle at 50% 50%,
      var(--highlited-text) 0%,
      transparent 70%
    );
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    z-index: 0;
  }

  &:hover::after {
    opacity: 0.5;
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 0.5;
    }
    50% {
      transform: scale(1.05);
      opacity: 0.3;
    }
    100% {
      transform: scale(1);
      opacity: 0.5;
    }
  }

  @media (max-width: 767px) {
    grid-template-columns: 34px minmax(0, 1fr);

    svg {
      grid-column: 1;
    }

    p {
      grid-column: 2;
      grid-row: 1;
      text-align: left;
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
  background: var(--background);
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
const MarqueeTextWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "reverse",
})<{ reverse: boolean }>`
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
export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const frontend = [
    { icon: techIcons.html, text: "HTML (HTML5), JSX" },
    { icon: techIcons.css, text: "CSS (CSS3), SASS (SCSS), Bootstrap" },
    { icon: techIcons.javascript, text: "JavaScript (ES6+), TypeScript" },
    {
      icon: techIcons.react,
      text: "React",
    },
    { icon: techIcons.nextjs, text: "Next.js" },
    {
      icon: techIcons.redux,
      text: "Redux",
    },
    { icon: techIcons.reactQuery, text: "TanStack Query" },
    { icon: techIcons.styledComponents, text: "Styled Components" },
    { icon: techIcons.mui, text: "Material UI (MUI), Radix UI" },
    { icon: techIcons.socketio, text: "Socket.IO" },
    { icon: techIcons.webpack, text: "Webpack, Vite" },
    { icon: techIcons.api, text: "REST API" },
    { icon: techIcons.fsd, text: "Feature-Sliced Design, BEM" },
    { icon: techIcons.figma, text: "Figma" },
    { icon: techIcons.english, text: "English Level - B2" },
  ];

  const backend = [
    { icon: techIcons.nodejs, text: "Node.js" },
    { icon: techIcons.nestjs, text: "NestJS 11" },
    { icon: techIcons.postgresql, text: "PostgreSQL" },
    { icon: techIcons.prisma, text: "Prisma ORM" },
    { icon: techIcons.jwt, text: "JWT Authentication & Authorization" },
    { icon: techIcons.api, text: "REST API Development" },
    { icon: techIcons.socketio, text: "Socket.IO" },
    { icon: techIcons.s3, text: "S3-compatible Storage" },
    { icon: techIcons.smtp, text: "SMTP, Web Push Notifications" },
    { icon: techIcons.docker, text: "Docker" },
    { icon: techIcons.nginx, text: "Nginx" },
    { icon: techIcons.gitlab, text: "GitLab CI/CD" },
    { icon: techIcons.git, text: "Git (GitHub, GitLab)" },
    { icon: techIcons.deploy, text: "Production Deployment" },
    { icon: techIcons.jest, text: "Jest" },
    { icon: techIcons.cypress, text: "Cypress" },
    { icon: techIcons.k6, text: "k6 Load Testing" },
  ];

  useEffect(() => {
    return revealOnScroll(sectionRef.current, [
      { selector: ".hidden", visibleClass: "visible" },
      { selector: ".hidden1", visibleClass: "visible1" },
      { selector: ".hidden2", visibleClass: "visible2" },
    ]);
  }, []);
  const [reverseMarquee, setReverseMarquee] = useState(false);
  const marqueeText2 = "HARD SK!LLS ";
  return (
    <SectionContainer ref={sectionRef} id="skills">
      <MarqueeWrapper
        style={{
          transform: "rotate(20deg)",
          marginTop: "70vh",
          zIndex: "3",
          opacity: "0.3",
        }}
        onMouseEnter={() => setReverseMarquee(true)}
        onMouseLeave={() => setReverseMarquee(false)}
      >
        <MarqueeTextWrapper
          key={reverseMarquee ? "reverse" : "normal"}
          reverse={reverseMarquee}
        >
          <MarqueeText>{marqueeText2.repeat(1000)}</MarqueeText>
        </MarqueeTextWrapper>
        <TechMarquee />
      </MarqueeWrapper>
      <Container className="d-flex justify-content-center">
        <SkillsContainer className="d-flex justify-content-center gap-3 flex-column flex-md-row pt-5">
          <div className="col-md-6">
            <h3 className="text-md-end text-start mb-2 hidden2">
              FRONTEND SKILLS
            </h3>
            <SkillTypeContainer>
              {frontend.map(({ icon, text }, index) => (
                <SkillTypeItem
                  $align="left"
                  className="hidden2"
                  key={index}
                >
                  {icon}
                  <p>{text.toUpperCase()}</p>
                </SkillTypeItem>
              ))}
            </SkillTypeContainer>
          </div>

          <div className="col-md-6">
            <h3 className="mb-2 hidden1">BACKEND & DEVOPS SKILLS</h3>
            <SkillTypeContainer>
              {backend.map(({ icon, text }, index) => (
                <SkillTypeItem
                  $align="right"
                  className="hidden1"
                  key={index}
                >
                  {icon}
                  <p>{text.toUpperCase()}</p>
                </SkillTypeItem>
              ))}
            </SkillTypeContainer>
          </div>
        </SkillsContainer>
      </Container>
    </SectionContainer>
  );
}
