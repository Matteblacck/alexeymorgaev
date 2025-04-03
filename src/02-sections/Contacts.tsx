import styled from "styled-components";
import { fluidText } from "../05-shared/utils";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faTelegram, faGithub, faVk } from "@fortawesome/free-brands-svg-icons";

// Основной контейнер, который будет фоном
const SectionContainer = styled.div`
  padding-top: 20vh;
  padding-bottom: 10vh;
  position: relative;
  background: transparent;
  overflow: hidden;
`;

// Контейнер для основного контента
const Container = styled.div`
  justify-content: center;
  padding: 2rem;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  text-align: left;
`;

const Title = styled.h1`
  font-size: ${fluidText(48, 18)};
  font-weight: 300;
  color: var(--text);
  font-style: italic;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
  position: relative;
  text-align: left;
`;

const WelcomeText = styled.p`
  font-size: ${fluidText(70, 20)};
  color: var(--text);
  line-height: 1.6;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
  width: 100%;
  text-align: left;
`;

const Divider = styled.div`
  width: 33.33%;
  height: 2px;
  background: var(--highlited-text);
  margin: 0.5rem 0;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 8px;
    height: 8px;
    background: var(--highlited-text);
    border-radius: 50%;
  }
`;

const ContactsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 1rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  align-items: center;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.2rem 1.8rem;
  backdrop-filter: blur(10px);
  border-radius: 14px;
  color: var(--text);
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: ${fluidText(26, 20)};
  font-weight: 500;
  border: 2px solid transparent;
  
  
  &:hover {
    border-color: white;
  }
  
  svg {
    font-size: ${fluidText(36, 28)};
  }
`;

const Location = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.2rem 1.8rem;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 14px;
  color: var(--text);
  font-size: ${fluidText(26, 20)};
  font-weight: 500;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.1), inset 0 -2px 4px rgba(0, 0, 0, 0.2);
  
  svg {
    font-size: ${fluidText(36, 28)};
  }
`;

export default function Contacts() {
  return (
    <SectionContainer id="contacts">
      <Container>
        <Main>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <Title>Contact Me</Title>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
            <WelcomeText>
              I'm Always Open To New Projects And Opportunities. Let's Create Something Amazing Together!
            </WelcomeText>
          </motion.div>

          <Divider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <ContactsWrapper>
              <SocialLinks>
                <SocialLink href="https://github.com/matteblacck" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faGithub} />
                </SocialLink>
                <SocialLink href="https://t.me/mmatteblack" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faTelegram} />
                </SocialLink>
                <SocialLink href="https://vk.com/matteblackk" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faVk} />
                </SocialLink>
                <Location>
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                  Moscow, Russia
                </Location>
              </SocialLinks>
            </ContactsWrapper>
          </motion.div>
        </Main>
      </Container>
    </SectionContainer>
  );
}
