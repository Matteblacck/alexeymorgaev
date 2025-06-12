import styled, { keyframes } from "styled-components";
import { fluidText } from "../05-shared/utils";
import { useEffect, useState } from "react";

// Анимация для появления контейнера
const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const SectionContainer = styled.div`
  width: 100%;
  position: relative;
  background: transparent;
  padding-top: 30vh;
  overflow: hidden;
  @media (max-width: 992px) {
    height: 100vh;
  }
`;

const Container = styled.div`
  position: relative;
  padding: 20px;
  z-index: 5;
  @media (max-width: 992px) {
    height: 100vh;
  }
`;

const GeneralInfo = styled.div`
  min-width: 200px;
  max-width: 500px;
  word-wrap: break-word;
  white-space: normal;
  opacity: 0; /* Начальная невидимость */
  animation: ${fadeIn} 1s forwards; /* Анимация появления */
  
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
`;

const MoreInfo = styled.div`
  min-width: 200px;
  max-width: 600px;
  word-wrap: break-word;
  white-space: normal;
  margin-top: 30vh;
  opacity: 0; /* Начальная невидимость */
  animation: ${fadeIn} 1s forwards; /* Анимация появления */
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
export default function About() {
    
  useEffect(() => {
    const elements = document.querySelectorAll('.hidden');
    const elements2 = document.querySelectorAll(".hidden2");
    
    const observer1 = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting){
                entry.target.classList.add('visible')
                observer.unobserve(entry.target)
            }
        })
    }, {threshold: 0.4})

    const observer2 = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting){
                entry.target.classList.add('visible2')
                observer.unobserve(entry.target)
            }
        })
    }, {threshold: 0.4})

    elements.forEach((element) => observer1.observe(element));
    elements2.forEach((element) => observer2.observe(element));
  }, []);

  const textData = {
    general: [
      "SEVERAL FACTS ABOUT ME:",
      "BORN IN: IRKUTSK",
      "LIVE IN: MOSCOW",
      "LOVE: FRONTEND",
    ],
    more: [
      "ME AS A DEVELOPER:",
      "I LOVE CREATING USER INTERFACES THAT ARE CONVENIENT, BEAUTIFUL, AND FUNCTIONAL. I FOCUS ON BUILDING SCALABLE AND THOUGHTFUL SOLUTIONS, ALWAYS AIMING FOR A BALANCE BETWEEN USABILITY AND AESTHETICS. I’M PASSIONATE ABOUT CONTINUOUS LEARNING AND TACKLING NEW CHALLENGES.",
    ],
  };
  const [reverseMarquee, setReverseMarquee] = useState(false);
  const marqueeText2 = "Warning! Frontend! ";
  return (
    <SectionContainer id="about">
        <MarqueeWrapper
        style={{ transform: "rotate(-20deg)", marginTop: "20vh", zIndex: "4", opacity: '0.3'}}
        onMouseEnter={() => setReverseMarquee(true)}
        onMouseLeave={() => setReverseMarquee(false)}
        className="hidden"
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
              {textData.general[0].split(" ").map((word, index) => (
                <span key={index} className="hidden2">
                  {word}{" "}
                </span>
              ))}
            </h1>
            <p>
              {textData.general.slice(1).map((line, lineIndex) => (
                <span key={lineIndex}>
                  {line.split(" ").map((word, index) => (
                    <span key={index} className="hidden2" style={{ transitionDelay: `${index * 0.1}s` }}>
                      {word}{" "}
                    </span>
                  ))}
                  <br />
                </span>
              ))} 
            </p>
          </GeneralInfo>
          <MoreInfo >
            <h1>
              {textData.more[0].split(" ").map((word, index) => (
                <span key={index} className="hidden2">
                  {word}{" "}
                </span>
              ))}
            </h1>
            <p>
              {textData.more[1].split(" ").map((word, index) => (
                <span key={index} className="hidden2" style={{ transitionDelay: `${index * 0.1}s` }}>
                  {word}{" "}
                </span>
              ))}
            </p>
          </MoreInfo>
        </div>
      </Container>
    </SectionContainer>
  );
}