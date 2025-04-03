/* eslint-disable @typescript-eslint/no-unused-vars */
import styled, { keyframes } from "styled-components";
import { fluidText } from "../05-shared/utils";

// Основной контейнер, который будет фоном
const SectionContainer = styled.div`
  height: 104vh;
  width: 100%;
  position: relative;
  background: transparent; // Прозрачный фон
  overflow: hidden;
`;

// Контейнер для основного контента
const Container = styled.div`
  position: relative;
  z-index: 5;
  height: 100vh;
  padding: 20px;
`;

const typing = keyframes`
  from { width: 0; }
  to { width: 100%; }
`;

const blink = keyframes`
  50% { opacity: 0.3; }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    visibility: hidden;
  }
  to {
    opacity: 1;
    visibility: visible;
  }
`;

const MyName = styled.div`
  font-weight: 600;
  font-size: ${fluidText(60, 22)};
  white-space: nowrap;
  overflow: hidden;
  width: 0;
  animation: ${typing} 2s steps(40, end) forwards;
`;

const WhoIam = styled.div`
  font-weight: 600;
  font-size: ${fluidText(24, 18)};
  white-space: nowrap;
  overflow: hidden;
  width: 0;
  animation: ${typing} 1.8s steps(80, end) forwards;
  animation-delay: 1s;
  &:after {
    content: "|";
    display: inline-block;
    animation: ${blink} 1s steps(1, start) infinite;
  }
`;

const Navigation = styled.div`
  position: absolute;
  bottom: 0px;
  left: 20px;
  right: 20px;
  opacity: 0;
  visibility: hidden;
  animation: ${fadeIn} 1s ease-in-out forwards;
  animation-delay: 2s;
`;

const NavMenu = styled.ul`
  display: flex;
  flex-wrap: wrap;
  font-weight: 500;
  gap: 15px;
  z-index: 10;
`;

const ListItem = styled.li`
  font-size: ${fluidText(120, 60)};
  animation: ${blink} 4s steps(20, start) infinite;
  line-height: 1.2;
  
  &:active {
    animation: none;
    color: white;
    font-style: italic;
    transform: scaleY(2);
  }
  
  @media (hover: hover) {
    &:hover {
      animation: none;
      color: white;
      font-style: italic;
      transform: scaleY(2);
    }
  }
`;


export default function Home() {

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <SectionContainer id="home">
      {/* Marquee текст как часть фона */}
      {/* <MarqueeWrapper
        style={{ transform: "rotate(30deg)", marginTop: "40vh", zIndex: "5", opacity: "0.7" }}
        onMouseEnter={() => setReverseMarquee(true)}
        onMouseLeave={() => setReverseMarquee(false)}
      >
        <MarqueeTextWrapper
          key={reverseMarquee ? "reverse" : "normal"}
          reverse={reverseMarquee}
        >
          <MarqueeText>{marqueeText1.repeat(1000)}</MarqueeText>
        </MarqueeTextWrapper>
      </MarqueeWrapper>

      <MarqueeWrapper
        style={{
          transform: "rotate(-10deg)",
          marginTop: "25vh",
          zIndex: "6",
        }}
        onMouseEnter={() => setReverseMarquee(true)}
        onMouseLeave={() => setReverseMarquee(false)}
      >
        <MarqueeTextWrapper
          key={reverseMarquee ? "reverse" : "normal"}
          reverse={reverseMarquee}
        >
          <MarqueeText>{marqueeText2.toUpperCase().repeat(1000)}</MarqueeText>
        </MarqueeTextWrapper>
      </MarqueeWrapper> */}

      {/* Основной контент */}
      <Container>
        <div className="d-flex flex-column">
          <MyName className="mb-1">
            <span style={{ color: "var(--highlited-text)" }}>HELLO,</span> MY
            NAME IS ALEXEY
          </MyName>
          <WhoIam className="mt-0">I'M A FRONTEND DEVELOPER</WhoIam>
        </div>

        <Navigation>
          <NavMenu className="d-flex flex-column flex-md-row flex-xxl-row gap-4">
            <div className="d-flex flex-column flex-md-row flex-xxl-row gap-4">
              <ListItem><a href="#" style={{textDecoration:'none', color:"var(--text"}}
              onClick={(e) => {e.preventDefault(); scrollToSection('about') }}>ABOUT</a></ListItem>
              <ListItem><a href="#" style={{textDecoration:'none', color:"var(--text"}}
              onClick={(e) => {e.preventDefault(); scrollToSection('skills') }}>SKILLS</a></ListItem>
            </div>
            <div className="d-flex flex-column flex-xxl-row gap-4">
              <ListItem><a href="#" style={{textDecoration:'none', color:"var(--text"}}
              onClick={(e) => {e.preventDefault(); scrollToSection('portfolio') }}>PORTFOLIO</a></ListItem>
              <ListItem><a href="#contacts" style={{textDecoration:'none', color:"var(--text"}}>CONTACTS</a></ListItem>
            </div>
          </NavMenu>
        </Navigation>
      </Container>
    </SectionContainer>
  );
}
