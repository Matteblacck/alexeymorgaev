import styled, { keyframes } from "styled-components";
import { fluidText } from "../05-shared/utils";
import { useEffect, useState } from "react";
import TechMarquee from "../05-shared/TechMarquee";

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
// const Arrows = styled.div`
//   display: flex;
//   margin-top: 2.5rem;
//   justify-content: center;

//   & > * {
//     margin: 0 -40px; // Добавьте это свойство для уменьшения расстояния между стрелками
//   }
// `;
// interface ArrowProps {
//   style?: CSSProperties;
//   className?: string;
// }
// const Arrow: React.FC<ArrowProps> = ({ style, className }) => (
//     <svg width="150" height="50" xmlns="http://www.w3.org/2000/svg" style={style} className={className}>
//       <line x1="10" y1="25" x2="130" y2="25" stroke="black" strokeWidth="1" />
//       <polygon points="135,25 125,20 125,30" fill="black" />
//     </svg>
//   );
const SkillsContainer = styled.div`
    h3{
        font-weight: 100;
    }
`
const SkillTypeContainer = styled.div`
`
const SkillTypeItem = styled.div`
    position: relative;
    padding: 0.8rem 1.2rem;
    border-radius: 12px;
    overflow: hidden;
    transition: all 0.3s ease-in-out;

    p {
        font-size: ${fluidText(25, 14)};
        font-weight: 500;
        margin: 0;
        position: relative;
        z-index: 1;
    }

    &:hover {
        color: var(--highlited-text);
        transform: translateY(-3px);
        border-color: var(--highlited-text);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        background: rgba(255, 255, 255, 0.05);
    }

    &::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 12px;
        padding: 2px;
        background: linear-gradient(90deg, 
            transparent,
            var(--highlited-text),
            var(--highlited-text),
            transparent
        );
        background-size: 200% 100%;
        -webkit-mask: 
            linear-gradient(#fff 0 0) content-box, 
            linear-gradient(#fff 0 0);
        mask: 
            linear-gradient(#fff 0 0) content-box, 
            linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
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
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 12px;
        padding: 1px;
        background: radial-gradient(circle at 50% 50%, 
            var(--highlited-text) 0%,
            transparent 70%
        );
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
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
export default function Skills() {
    const hardskills = [
        'HTML(HTML5), JSX',
        'CSS (CSS3), SASS (SCSS), Bootstrap',
        'JavaScript (ES6+, OOP), TypeScript',
        'React(React Hooks, Router, Context API, Formik, React DND)',
        'Redux(Redux Toolkit, Redux Persist, Redux DevTools)',
        'Styled Components',
        'Webpack, Vite',
        'Rest API',
        'Feature-Sliced Design, BEM',
        'Git(GitHub)',
        'Figma',
        'English Level-B2'
    ]
    const softskills = [
        "I'm responsible for the deadlines",
        "I'm good with time management",
        'I know ho to calmly handle conflict situations',
        "I pay close attention to the details",
        "I always strive to keep my code clean.",
        "I welcome constructive criticism, I know how to admit my mistakes ",
        "I'm m motivated to constantly improve my skills and learn new things",


    ]

    useEffect(() =>{
        const elements = document.querySelectorAll('.hidden');
        const elements1 = document.querySelectorAll('.hidden1');
        const elements2 = document.querySelectorAll('.hidden2');
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting){
                    entry.target.classList.add('visible')
                    observer.unobserve(entry.target)
                }
            })
        }, {threshold: 0.2})

        const observer1 = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting){
                    entry.target.classList.add('visible1')
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

        elements.forEach(element => observer.observe(element))
        elements1.forEach(element => observer1.observe(element))
        elements2.forEach(element => observer2.observe(element))

    })
    const [reverseMarquee, setReverseMarquee] = useState(false);
    const marqueeText2 = "HARD SK!LLS SOFT SK!LLS ";
  return (
    <SectionContainer id="skills">
      
        <MarqueeWrapper
        style={{ transform: "rotate(20deg)", marginTop: "70vh", zIndex: "3", opacity: '0.3'}}
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
        <Container className="d-flex justify-content-center" >
        <SkillsContainer className="d-flex justify-content-center gap-3 flex-column flex-md-row pt-5">
                <div className="col-mg-6">
                <h3 className="text-md-end text-start mb-2 hidden2">HARD SKILLS</h3>
                    <SkillTypeContainer>
                        {hardskills.map((s, index) => (
                            <SkillTypeItem className='mb-1 hidden2 text-md-end text-start' key={index}><p>{s.toUpperCase()}</p></SkillTypeItem>
                        ))}
                    </SkillTypeContainer>
                </div>
            
                <div className="col-md-6">
                <h3 className="mb-2 hidden1">SOFT SKILLS</h3>
                    <SkillTypeContainer>
                    {softskills.map((s, index) => (
                            <SkillTypeItem className='mb-1 hidden1 text-start' key={index}><p>{s.toUpperCase()}</p></SkillTypeItem>
                        ))}
                    </SkillTypeContainer>
                </div>
            
        </SkillsContainer>
      </Container>
    </SectionContainer>
      
  );
}
