import styled, { keyframes } from "styled-components";

const scroll = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
`;

const MarqueeContainer = styled.div<{ style?: React.CSSProperties }>`
    width: 100%;
    overflow: hidden;
    background: var(--background);
    padding: 2rem 0;
    position: relative;
    border-top: 1px solid gray;
    border-bottom: 1px solid gray;
`;

const MarqueeWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 3rem;
    padding: 0 2rem;
    animation: ${scroll} 30s linear infinite;
    width: max-content;
`;

const TechLogo = styled.img`
    height: 50px;
    width: auto;
    filter: grayscale(40%);
    opacity: 0.5;
    transition: all 0.3s ease;
    transform-origin: center;
    
    &:hover {
        filter: grayscale(0%);
        opacity: 1;
        transform: scale(1.1) rotateY(360deg);
    }
`;

const techLogos = [
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', alt: 'HTML5' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', alt: 'CSS3' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', alt: 'JavaScript' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', alt: 'TypeScript' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', alt: 'React' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg', alt: 'Redux' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg', alt: 'SASS' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg', alt: 'Bootstrap' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg', alt: 'Webpack' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg', alt: 'Vite' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', alt: 'Git' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', alt: 'Figma' }
];

export default function TechMarquee() {
    return (
        <MarqueeContainer>
            <MarqueeWrapper>
                {[...techLogos, ...techLogos, ...techLogos].map((logo, index) => (
                    <TechLogo 
                        key={index} 
                        src={logo.src} 
                        alt={logo.alt}
                        title={logo.alt}
                    />
                ))}
            </MarqueeWrapper>
        </MarqueeContainer>
    );
}