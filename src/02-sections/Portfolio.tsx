import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import greenharvestImage from "../assets/greenharvest_landing.png";
import notes2Image from "../assets/notes2.png";
import taskmanagerImage from "../assets/taskmanager.png"
import { fluidText } from "../05-shared/utils";
import { useEffect, useState } from "react";
import PortfolioItemModal from '../04-widgets/PortfolioItemModal'
const SectionContainer = styled.div`
  width: 100%;
  padding-top: 30vh;
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

const Title = styled.h1`
    display: flex;
    color: var(--text);
    font-size: ${fluidText(36,25)};
    font-weight: 500;
    margin-bottom: 10vh;
    margin-left: 20vw;
    opacity: 0;
    transform: translateY(50px);
    visibility: hidden;
    transition: all 0.8s ease-out;
    
    &.visibleImage {
      opacity: 1;
      transform: translateY(0);
      visibility: visible;
    }
` 
const PortfolioItemImage = styled(motion.div)<{ image: string }>`
  background-image: url(${(props) => props.image});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 40vw;
  aspect-ratio: 16 / 9;
  filter: grayscale(100%) blur(1px) brightness(0.6);
  transition: all 0.3s ease-out;
  cursor: pointer;
  position: relative;
  transform-origin: center;
  will-change: transform, filter;
  z-index: 1;
  opacity: 0;
  transform: translateY(50px);
  visibility: hidden;
  transition: all 0.8s ease-out;

  &.visibleImage, &.visibleImage2 {
    opacity: 1;
    transform: translateY(0);
    visibility: visible;
  }

  &:hover {
    transform: scale(1.1) translateY(-10px);
    z-index: 6;
    filter: grayscale(100%) brightness(0.8);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 1200px){
    width: 50vw;
  }
  @media (max-width: 768px){
    width: 90vw;
  }
`;
const PortfolioItem = styled.div`
  display: flex;
  margin-bottom: 60px;
  position: relative; 
  max-width: 100vw;
  overflow: hidden;
`;

const PortfolioTextWrapper = styled.div`
  position: absolute;
  top: 50%; /* Центрируем */
  transform: translateY(-50%);
  z-index: 2;
  pointer-events: none;
  padding: 10px 20px;
  color: var(--text);

  @media (max-width: 768px) {
    left: 50% !important;
    right: auto !important;
    transform: translate(-50%, -50%);
  }
`;

const PortfolioTitle = styled.div`
  font-size: ${fluidText(100, 40)};
  font-weight: 700;
  white-space: nowrap;
  transform: scaleY(5) scaleX(1.5);
  color:var(--text);
  line-height: 5rem;
  opacity: 0;
  transform: translateY(50px) scaleY(2) scaleX(1.5);
  visibility: hidden;
  transition: all 0.8s ease-out;

  &.visible2 {
    opacity: 1;
    transform: translateY(0) scaleY(3.5) scaleX(1.5);
    visibility: visible;
  }
`;

interface ProjectData {
  description: string;
  image: string;
  title: string;
  link: string;
}

const projectsData: Record<string, ProjectData> = {
  landing: {
    description: "A comprehensive landing page for Green Harvest, showcasing the brand's mission and products.",
    image: greenharvestImage,
    title: "LANDING",
    link: "https://matteblacck.github.io/greenharvest-landing/",
  },
  notes: {
    description: "A note-taking application that allows users to organize their thoughts and ideas efficiently.",
    image: notes2Image,
    title: "NOTES",
    link: "",
  },
  manager: {
    description: "A task management tool designed to help users track and complete their daily tasks effectively.",
    image: taskmanagerImage,
    title: "TASK MANAGER",
    link: "",
  },
};
export default function Portfolio(){

    const marqueeText = ' PORTFOL!O '
    useEffect(() => {
      const elements = document.querySelectorAll(".hiddenImage")
      const elements2 = document.querySelectorAll(".hiddenImage2")
      const elements3 = document.querySelectorAll(".hidden2");
      
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
              if (entry.isIntersecting){
                entry.target.classList.add('visibleImage')
                observer.unobserve(entry.target)
              }
            })
      }, {threshold: 0.2})
      
      const observer2 = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
              if (entry.isIntersecting){
                entry.target.classList.add('visibleImage2')
                observer.unobserve(entry.target)
              }
            })
      }, {threshold: 0.2})
      
      const observer3 = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting){
                entry.target.classList.add('visible2')
                observer.unobserve(entry.target)
            }
        })
      }, {threshold: 0.5})
      
      elements.forEach(element => observer.observe(element))
      elements2.forEach(element => observer2.observe(element))
      elements3.forEach(element => observer3.observe(element));
      
      // Очистка обработчиков при размонтировании компонента
      return () => {
        elements.forEach(element => observer.unobserve(element));
        elements2.forEach(element => observer2.unobserve(element));
        elements3.forEach(element => observer3.unobserve(element));
      };
    }, [])
    
    
    const [selectedItem, setSelectedItem] = useState<ProjectData | null>(null);
    
    const handleCloseModal = () => {
      setSelectedItem(null);
    };
    
    // Управление скроллом при открытии/закрытии модального окна
    useEffect(() => {
      if (selectedItem) {
        document.documentElement.style.overflowY = 'hidden';
        document.body.style.overflowY = 'hidden';
      } else {
        document.documentElement.style.overflowY = 'auto';
        document.body.style.overflowY = 'auto';
      }
      
      return () => {
        document.documentElement.style.overflowY = 'auto';
        document.body.style.overflowY = 'auto';
      };
    }, [selectedItem]);
    
    return (
      <>
        <SectionContainer id='portfolio'>
          <MarqueeWrapper
            style={{
              marginTop: "50vh",
              transform: "rotate(-28deg)",
              opacity: "0.4",
            }}
          >
            <MarqueeTextWrapper reverse={false}>
              <MarqueeText>{marqueeText.repeat(1000)}</MarqueeText>
            </MarqueeTextWrapper>
          </MarqueeWrapper>
          <Container>
            <Title className="hiddenImage">MY PORTFOLIO</Title>
            <PortfolioItem >
              <PortfolioItemImage 
                image={greenharvestImage} 
                className="hiddenImage" 
                id='landing' 
                onClick={() => setSelectedItem(projectsData.landing)}
                layoutId={`portfolio-image-${projectsData.landing.title}`}
              />
              <PortfolioTextWrapper style={{ left: "20vw" }}>
                <PortfolioTitle className="hidden2">LANDING</PortfolioTitle>
              </PortfolioTextWrapper>
            </PortfolioItem>

            <PortfolioItem className="d-flex justify-content-end">
              <PortfolioItemImage 
                image={notes2Image} 
                className="hiddenImage2" 
                id='notes' 
                onClick={() => setSelectedItem(projectsData.notes)}
                layoutId={`portfolio-image-${projectsData.notes.title}`}
              />
              <PortfolioTextWrapper style={{ right: "30vw" }}>
                <PortfolioTitle className="hidden2">NOTES</PortfolioTitle>
              </PortfolioTextWrapper>
            </PortfolioItem>

            <PortfolioItem className="d-flex justify-content-start">
              <PortfolioItemImage 
                image={taskmanagerImage} 
                className="hiddenImage" 
                id='manager' 
                onClick={() => setSelectedItem(projectsData.manager)}
                layoutId={`portfolio-image-${projectsData.manager.title}`}
                initial={{ opacity: 1, scale: 1 }}
                animate={{ 
                  opacity: selectedItem?.title === projectsData.manager.title ? 0 : 1,
                  scale: selectedItem?.title === projectsData.manager.title ? 0.8 : 1
                }}
                transition={{ duration: 0.3 }}
              />
              <PortfolioTextWrapper style={{ left: '15vw' }}>
                <PortfolioTitle className="hidden2">BOARDS</PortfolioTitle>
              </PortfolioTextWrapper>
            </PortfolioItem>
          </Container>
        </SectionContainer>

        <AnimatePresence mode="wait">
          {selectedItem && (
            <PortfolioItemModal
              onClose={handleCloseModal}
              description={selectedItem.description}
              link={selectedItem.link}
              image={{ src: selectedItem.image, alt: selectedItem.title }}
              title={selectedItem.title}
            />
          )}
        </AnimatePresence>
      </>
    );
}