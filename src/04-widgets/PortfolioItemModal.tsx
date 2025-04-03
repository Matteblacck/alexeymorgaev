import styled from 'styled-components';
import { motion } from 'framer-motion';
import { fluidText } from '../05-shared/utils';
import { useEffect } from 'react';

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

const ModalContainer = styled(motion.div)`
  position: absolute;
  background: transparent;
  padding: 20px;
  border-radius: 8px;
  width: 100vw;
  height: 100vh;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
`;

const MainInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 20px;
  width: 100%;
  height: calc(100vh - 100px);
  padding: 0 5vw;
  padding-top: 10vh;
  position: relative;
  flex: 1;
  overflow-y: auto;
  
  @media (max-width: 992px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 15vh;
    padding-top: 0;
    padding-bottom: 100px;
    height: auto;
    min-height: calc(100vh - 100px);
  }
`;

const Image = styled(motion.div)<{ image: string }>`
  grid-column: 1 / span 7;
  grid-row: 1;
  background-image: url(${(props) => props.image});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  height: 0;
  padding-bottom: 56.25%; /* Maintains 16:9 aspect ratio */
  transform-origin: center;
  will-change: transform, filter;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 10;
  
  @media (max-width: 992px) {
    width: 90vw;
    grid-column: auto;
    grid-row: auto;
    padding-bottom: 50.625%;
    margin-bottom: 5vh;
  }
`;

const Description = styled(motion.div)`
  grid-column: 6 / span 7;
  grid-row: 1;
  align-self: center;
  text-align: start;
  margin-bottom: 20px;
  text-transform: uppercase;
  font-weight: 600;
  font-size: ${fluidText(30, 18)};
  padding: 3rem;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 20;
  border-left: 3px solid var(--highlited-text);
  
  @media (max-width: 992px) {
    grid-column: auto;
    grid-row: auto;
    padding: 2rem;
    width: 90vw;
    max-width: 600px;
    border-left: none;
    border-top: 3px solid var(--highlited-text);
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
`;

const DownBar = styled(motion.div)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 5vw;
  font-weight: 600;
  font-size: ${fluidText(16,14)};
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  position: fixed;
  bottom: 0;
  left: 0;
  background: transparent;
  backdrop-filter: blur(10px);
  z-index: 30;
`;

const StyledLink = styled.a`
  text-decoration: none;
  color: var(--text);
  position: relative;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background-color: var(--text);
    transform: scaleX(0);
    transform-origin: bottom right;
    transition: transform 0.3s ease;
  }

  &:hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`;

const charVariants = {
  hidden: { 
    opacity: 0,
    color: "var(--highlited-text)",
    y: 10,
  },
  visible: {
    opacity: 1,
    color: "var(--text)",
    y: 0,
    transition: { 
      duration: 0.15,
      ease: "easeOut",
    },
  },
};

const downBarVariants = {
  hidden: { 
    opacity: 0, 
    y: 100, // Начальное положение - полностью за пределами экрана снизу
  },
  visible: {
    opacity: 1,
    y: 0, // Конечное положение - прижато к низу экрана
    transition: { 
      duration: 0.5,
      ease: "easeOut",
      delay: 0.3 // Небольшая задержка для эффекта последовательности
    },
  },
  exit: {
    opacity: 0,
    y: 100,
    transition: { 
      duration: 0.4,
      ease: "easeIn",
    },
  }
};

const imageVariants = {
  hidden: { 
    opacity: 0,
    scale: 0.8,
    filter: "blur(10px)",
    y: 100,
    zIndex: 1,
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    y: 0,
    zIndex: 5,
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1],
      delay: 0.2
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    filter: "blur(10px)",
    y: 100,
    zIndex: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

const descriptionVariants = {
  hidden: { 
    opacity: 0,
    x: 100,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1],
      delay: 0.4
    }
  },
  exit: {
    opacity: 0,
    x: 100,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

interface ModalProps {
  onClose: () => void;
  description: string;
  link: string;
  image: { src: string; alt: string };
  title: string;
}

const Modal: React.FC<ModalProps> = ({ onClose, description, link, image, title }) => {
  useEffect(() => {
    document.body.style.overflowY = 'hidden';
    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.01,
        staggerDirection: -1,
      },
    }
  };

  return (
    <ModalOverlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { delay: 0.3, duration: 0.5 } }}
      transition={{ duration: 0.8 }}
    >
      <ModalContainer
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0, transition: { duration: 0.4 } }}
        transition={{ duration: 0.5 }}
      >
        <ContentWrapper>
          <MainInfo>
            <Image
              image={image.src}
              layoutId={`portfolio-image-${title}`}
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            />
            <Description
              variants={descriptionVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{ display: "inline-block" }}
              >
                {description.split("").map((char, index) => (
                  <motion.span key={index} variants={charVariants}>
                    {char}
                  </motion.span>
                ))}
              </motion.div>
            </Description>
          </MainInfo>
          
          <DownBar
            variants={downBarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div>
              <motion.button
                onClick={onClose}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10, transition: { duration: 0.3 } }}
                transition={{ delay: 0.6 }}
                style={{ 
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text)',
                  fontSize: 'inherit',
                  cursor: 'pointer',
                  padding: '6px 0'
                }}
              >
                Сlose
              </motion.button>
            </div>
            <StyledLink href={link} target="_blank" rel="noopener noreferrer">
              Visit site
            </StyledLink>
          </DownBar>
        </ContentWrapper>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Modal;