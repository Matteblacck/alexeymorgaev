import styled from "styled-components";
import { fluidText } from "../05-shared/utils";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faTelegram, faGithub, faVk } from "@fortawesome/free-brands-svg-icons";
import { useLanguage } from "../05-shared/useLanguage";

const envelopeSrc = `${import.meta.env.BASE_URL}images/envelope.webp`;

// Основной контейнер, который будет фоном
const SectionContainer = styled.div`
  padding-top: 20vh;
  padding-bottom: 0;
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
  display: flex;
  align-items: center;
  gap: clamp(0.5rem, 1.5vw, 1rem);
  font-size: ${fluidText(48, 20)};
  font-weight: 300;
  color: var(--text);
  font-style: italic;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 0 10px rgba(var(--text-rgb), 0.3);
  position: relative;
  text-align: left;
`;

const EnvelopeImage = styled.img`
  display: block;
  flex: 0 0 auto;
  width: clamp(60px, 7vw, 100px);
  margin-left: -0.85rem;
  height: auto;
  object-fit: contain;
  transform: translate(-8px, 8px) rotate(12deg);
  filter: drop-shadow(0 8px 14px rgba(0, 0, 0, 0.35));

  @media (max-width: 520px) {
    width: 60px;
  }
`;

const WelcomeText = styled.p`
  font-size: ${fluidText(70, 25)};
  color: var(--text);
  line-height: 1.15;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
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
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.85rem;
  max-width: 1000px;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 740px) {
    grid-template-columns: 1fr;
  }
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.9rem;
  min-height: 92px;
  padding: 1rem 1.1rem;
    border: 1px solid var(--surface-border);
  border-radius: 14px;
  background: transparent;
  backdrop-filter: blur(10px);
  color: var(--text);
  text-decoration: none;
  transition: transform 260ms cubic-bezier(0.2, 0.8, 0.2, 1), border-color 260ms ease, background 260ms ease, box-shadow 260ms ease;

  &:hover,
  &:focus-visible {
    transform: translateY(-3px);
    border-color: var(--text);
    background: var(--surface);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
    outline: none;
  }

  .social-icon {
    display: grid;
    flex: 0 0 44px;
    place-items: center;
    width: 44px;
    height: 44px;
    border: 1px solid var(--surface-border);
    border-radius: 11px;
    background: var(--surface);
    color: var(--text);
    transition: transform 260ms ease, background 260ms ease, color 260ms ease;
  }

  .social-icon svg {
    font-size: 23px;
  }

  &:hover .social-icon,
  &:focus-visible .social-icon {
    transform: rotate(-7deg) scale(1.08);
    background: var(--highlited-text);
    color: var(--button-text);
  }

  .link-copy {
    display: flex;
    min-width: 0;
    flex-direction: column;
    gap: 4px;
  }

  .link-copy strong {
    font-size: ${fluidText(20, 17)};
    font-weight: 500;
    line-height: 1.1;
  }

  .link-copy strong.email-address {
    font-size: ${fluidText(14, 12)};
    letter-spacing: -0.035em;
    white-space: nowrap;
  }

  .link-copy small {
    color: var(--text);
    opacity: 0.56;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.12em;
    line-height: 1.2;
  }

  .link-arrow {
    margin-left: auto;
    color: var(--text);
    opacity: 0.62;
    font-size: 20px;
    transition: transform 260ms ease, color 260ms ease;
  }

  &:hover .link-arrow,
  &:focus-visible .link-arrow {
    transform: translate(3px, -3px);
    color: var(--text);
    opacity: 1;
  }

  @media (hover: none) {
    &:active {
      transform: scale(0.985);
    }
  }
`;

const Location = styled.div`
  display: flex;
  align-items: center;
  gap: 0.9rem;
  min-height: 92px;
  padding: 1rem 1.1rem;
    border: 1px solid var(--surface-border);
  border-radius: 14px;
  background: transparent;
  backdrop-filter: blur(10px);
  color: var(--text);

  .location-icon {
    display: grid;
    flex: 0 0 44px;
    place-items: center;
    width: 44px;
    height: 44px;
    border: 1px solid var(--surface-border);
    border-radius: 11px;
    background: var(--surface);
    color: var(--text);
    font-size: 20px;
  }

  .location-copy {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .location-copy strong {
    font-size: ${fluidText(17, 15)};
    font-weight: 500;
    line-height: 1.2;
  }

  .location-copy small {
    display: flex;
    align-items: center;
    gap: 6px;
    color: var(--text);
    opacity: 0.56;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.12em;
    line-height: 1.2;
  }

  @media (max-width: 420px) {
    min-height: 82px;
  }
`;

const FooterBar = styled.footer`
  margin-top: clamp(1.25rem, 3vw, 2.5rem);
  padding: 1.4rem clamp(1.25rem, 5vw, 3.5rem);
  border-top: 1px solid rgba(var(--accent-rgb), 0.36);
  background: var(--surface);
  box-shadow: 0 -18px 56px rgba(0, 0, 0, 0.12);

  @media (max-width: 420px) {
    padding-inline: 0.9rem;
  }
`;

const FooterInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem 2rem;
  max-width: 1500px;
  margin: 0 auto;

  @media (max-width: 600px) {
    display: grid;
    grid-template-columns: auto max-content;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;

    > a {
      grid-column: 1 / -1;
      justify-self: end;
    }
  }

  @media (max-width: 420px) {
    column-gap: 0.5rem;

    > p:first-child {
      font-size: 10px;
      white-space: nowrap;
    }

    > p:nth-child(2) {
      gap: 0.2rem;
      font-size: 8px;
      letter-spacing: 0.04em;
      white-space: nowrap;
    }
  }
`;

const FooterNote = styled.p`
  margin: 0;
  color: var(--text);
  font-size: 12px;
  line-height: 1.5;
  opacity: 0.65;
`;

const FooterCredit = styled.p`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin: 0;
  color: var(--text);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  opacity: 0.72;

  strong {
    color: var(--highlited-text);
  }
`;

const BackToTop = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-decoration: none;
  transition: color 180ms ease;

  span {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--text);
    opacity: 0.82;
    width: 1em;
    height: 1em;
    transition: transform 180ms ease, opacity 180ms ease;
  }

  span svg {
    display: block;
    width: 100%;
    height: 100%;
  }

  &:hover,
  &:focus-visible {
    color: var(--highlited-text);
    outline: none;
  }

  &:hover span,
  &:focus-visible span {
    transform: translateY(-2px);
    opacity: 1;
  }
`;

export default function Contacts() {
  const { language } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <SectionContainer id="contacts">
      <Container>
        <Main>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <Title>
              Contact Me
              <EnvelopeImage src={envelopeSrc} alt="" aria-hidden="true" />
            </Title>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
            <WelcomeText>
              {language === "en"
                ? "I'm Always Open To New Projects And Opportunities. Let's Create Something Amazing Together!"
                : "Я Всегда Открыт К Новым Проектам И Возможностям. Давайте Создадим Что-То Сильное Вместе!"}
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
                <SocialLink href="https://t.me/morgaev" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                  <span className="social-icon"><FontAwesomeIcon icon={faTelegram} /></span>
                  <span className="link-copy">
                    <strong>Telegram</strong>
                    <small>{language === "en" ? "SEND A MESSAGE" : "НАПИСАТЬ"}</small>
                  </span>
                  <span className="link-arrow" aria-hidden="true">↗</span>
                </SocialLink>
                <SocialLink href="mailto:alexeymorgaevdev@gmail.com" aria-label="Email Alexey Morgaev">
                  <span className="social-icon"><FontAwesomeIcon icon={faEnvelope} /></span>
                  <span className="link-copy">
                    <strong className="email-address">alexeymorgaevdev@gmail.com</strong>
                    <small>{language === "en" ? "SEND AN EMAIL" : "НАПИСАТЬ НА ПОЧТУ"}</small>
                  </span>
                  <span className="link-arrow" aria-hidden="true">↗</span>
                </SocialLink>
                <SocialLink href="https://vk.com/matteblackk" target="_blank" rel="noopener noreferrer" aria-label="VK profile">
                  <span className="social-icon"><FontAwesomeIcon icon={faVk} /></span>
                  <span className="link-copy">
                    <strong>VK</strong>
                    <small>{language === "en" ? "OPEN PROFILE" : "ОТКРЫТЬ ПРОФИЛЬ"}</small>
                  </span>
                  <span className="link-arrow" aria-hidden="true">↗</span>
                </SocialLink>
                <SocialLink href="https://github.com/matteblacck" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
                  <span className="social-icon"><FontAwesomeIcon icon={faGithub} /></span>
                  <span className="link-copy">
                    <strong>GitHub</strong>
                    <small>{language === "en" ? "OPEN PROFILE" : "ОТКРЫТЬ ПРОФИЛЬ"}</small>
                  </span>
                  <span className="link-arrow" aria-hidden="true">↗</span>
                </SocialLink>
                <Location>
                  <span className="location-icon"><FontAwesomeIcon icon={faMapMarkerAlt} /></span>
                  <span className="location-copy">
                    <strong>{language === "en" ? "Moscow, Russia" : "Москва, Россия"}</strong>
                    <small>{language === "en" ? "BASED IN" : "МОЯ ЛОКАЦИЯ"}</small>
                  </span>
                </Location>
              </SocialLinks>
            </ContactsWrapper>
          </motion.div>
        </Main>
      </Container>
      <FooterBar>
        <FooterInner>
          <FooterNote>© {year} Alexey Morgaev</FooterNote>
          <FooterCredit>
            {language === "en" ? "Made with" : "Сделано с"}
            <strong>React &amp; TypeScript</strong>
          </FooterCredit>
          <BackToTop href="#home">
            {language === "en" ? "BACK TO TOP" : "НАВЕРХ"}
            <span aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 20V4M5.5 10.5 12 4l6.5 6.5"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </BackToTop>
        </FooterInner>
      </FooterBar>
    </SectionContainer>
  );
}
