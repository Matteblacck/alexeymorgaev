/* eslint-disable @typescript-eslint/no-unused-vars */
import styled, { keyframes } from "styled-components";
import { fluidText } from "../05-shared/utils";
import { motion } from "framer-motion";

// Основной контейнер
const SectionContainer = styled.div`
  height: 104vh;
  width: 100%;
  position: relative;
  background: transparent;
  overflow: hidden;
`;

// Контейнер для контента
const Container = styled.div`
  position: relative;
  z-index: 5;
  height: 100vh;
  padding: 20px;
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

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

// Варианты анимации для символов
const charVariants = {
  hidden: { 
    opacity: 0,
    y: 5
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const nameContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.4
    }
  }
};

const titleContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 2
    }
  }
};

// Компонент для анимированного текста
const AnimatedText = styled(motion.div)`
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  display: inline-block;
`;

const NameText = styled(AnimatedText)`
  font-size: ${fluidText(60, 22)};
`;

const TitleText = styled(AnimatedText)`
  font-size: ${fluidText(24, 18)};
`;

const GradientChar = styled(motion.span)`
  background: linear-gradient(270deg, var(--highlited-text), var(--text), var(--highlited-text));
  background-size: 400% 400%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${gradientAnimation} 6s ease infinite;
  display: inline-block;
`;

const Navigation = styled.div`
  position: absolute;
  bottom: 0px;
  left: 20px;
  right: 20px;
  opacity: 0;
  visibility: hidden;
  animation: ${fadeIn} 1.5s ease-in-out forwards;
  animation-delay: 3s;
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

  const renderAnimatedName = () => {
    const text = "HELLO, MY NAME IS ALEXEY";

    return (
      <NameText
        variants={nameContainerVariants}
        initial="hidden"
        animate="visible"
      >
        {text.split("").map((char, index) => (
          <GradientChar key={`name-${index}`} variants={charVariants}>
            {char === " " ? "\u00A0" : char}
          </GradientChar>
        ))}
      </NameText>
    );
  };

  const renderAnimatedTitle = () => {
    const text = "I'M A FRONTEND DEVELOPER";

    return (
      <TitleText
        variants={titleContainerVariants}
        initial="hidden"
        animate="visible"
      >
        {text.split("").map((char, index) => (
          <GradientChar key={`title-${index}`} variants={charVariants}>
            {char === " " ? "\u00A0" : char}
          </GradientChar>
        ))}
      </TitleText>
    );
  };

  return (
    <SectionContainer id="home">
      <Container>
        <div className="d-flex flex-column">
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {renderAnimatedName()}
            <div style={{ marginTop: '0.5rem' }}>
              {renderAnimatedTitle()}
            </div>
          </div>

          <Navigation>
            <NavMenu className="d-flex flex-column flex-md-row flex-xxl-row gap-4">
              <div className="d-flex flex-column flex-md-row flex-xxl-row gap-4">
                <ListItem><a href="#" style={{textDecoration:'none', color:"var(--text"}} onClick={(e) => {e.preventDefault(); scrollToSection('about')}}>ABOUT</a></ListItem>
                <ListItem><a href="#" style={{textDecoration:'none', color:"var(--text"}} onClick={(e) => {e.preventDefault(); scrollToSection('skills')}}>SKILLS</a></ListItem>
              </div>
              <div className="d-flex flex-column flex-xxl-row gap-4">
                <ListItem><a href="#" style={{textDecoration:'none', color:"var(--text"}} onClick={(e) => {e.preventDefault(); scrollToSection('portfolio')}}>PORTFOLIO</a></ListItem>
                <ListItem><a href="#contacts" style={{textDecoration:'none', color:"var(--text"}}>CONTACTS</a></ListItem>
              </div>
            </NavMenu>
          </Navigation>
        </div>
      </Container>
    </SectionContainer>
  );
}