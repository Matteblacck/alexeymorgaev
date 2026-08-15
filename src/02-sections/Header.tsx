import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { fluidText } from '../05-shared/utils';
import { useLanguage } from '../05-shared/useLanguage';
import CardNav from '../05-shared/animations/nav/cardnav/CardNav';
import type { CardNavItem } from '../05-shared/animations/nav/cardnav/CardNav';

const HeaderContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 20px;
    opacity: 0;
    transition: opacity 0.1s ease-out; /* Плавное изменение прозрачности */
    font-weight: 600;
    font-size:${fluidText(20, 11)};
    z-index:1000;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 20px;

    @media (max-width: 768px) {
        display: none;
    }
`;

const NavItem = styled.a`
    text-decoration: none;
    color: var(--text);
    position: relative;
    display: inline-block;
    
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

    &:active::after {
        transform: scaleX(1);
        transform-origin: bottom left;
    }
    
    @media (hover: hover) {
        &:hover::after {
            transform: scaleX(1);
            transform-origin: bottom left;
        }
    }
`;

const BrandColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    flex: 0 0 auto;
`;

const DesktopActions = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 14px;
`;

const Nav = styled.nav`
    display: flex;
    flex-wrap: wrap;
    gap: 8px 12px;
    justify-content: flex-end;
    max-width: min(72vw, 760px);
`;

const LanguageButton = styled.button<{ $mobile?: boolean }>`
    width: ${({ $mobile }) => ($mobile ? '46px' : '52px')};
    height: ${({ $mobile }) => ($mobile ? '36px' : '52px')};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 2px solid var(--highlited-text);
    border-radius: 8px;
    background: rgba(0, 0, 0, 0.18);
    color: var(--text);
    font: inherit;
    font-size: ${({ $mobile }) => ($mobile ? '13px' : fluidText(16, 11))};
    font-weight: 700;
    line-height: 1;
    cursor: pointer;
    transition: border-color 0.3s ease, color 0.3s ease, background 0.3s ease;

    &:hover,
    &:focus-visible {
        border-color: var(--highlited-text);
        color: var(--highlited-text);
        outline: none;
    }
`;

const MobileHeaderContainer = styled.div`
    position: fixed;
    inset: 0 0 auto;
    width: 100%;
    min-height: 92px;
    opacity: 0;
    transition: opacity 0.1s ease-out;
    z-index: 1000;
    display: none;

    @media (max-width: 768px) {
        display: block;
    }

    .mobile-card-nav {
        position: fixed;
        z-index: 1000;
    }

    .mobile-card-nav .card-nav {
        color: var(--text);
        backdrop-filter: blur(12px);
        border-color: rgba(255, 255, 255, 0.14);
    }

    .mobile-card-nav .card-nav-content {
        padding: 0.5rem 0.7rem 0.8rem;
    }
`;

const mobileNavItems: CardNavItem[] = [
    {
        label: 'MAIN',
        bgColor: '#d7ff35',
        textColor: '#050505',
        links: [
            { label: 'HOME', href: '#home', ariaLabel: 'Go to home section' },
            { label: 'ABOUT', href: '#about', ariaLabel: 'Go to about section' },
        ],
    },
    {
        label: 'WORK',
        bgColor: '#96c8ff',
        textColor: '#050505',
        links: [
            { label: 'EXPERIENCE', href: '#experience', ariaLabel: 'Go to experience section' },
            { label: 'PORTFOLIO', href: '#portfolio', ariaLabel: 'Go to portfolio section' },
        ],
    },
    {
        label: 'CONTACT',
        bgColor: '#ffffff',
        textColor: '#050505',
        links: [
            { label: 'CONTACTS', href: '#contacts', ariaLabel: 'Go to contacts section' },
        ],
    },
];

export default function Header() {
    const [opacity, setOpacity] = useState(0);
    const { language, toggleLanguage } = useLanguage();
    const scrollToSection = (target: string) => {
        const sectionId = target.startsWith('#') ? target.slice(1) : target;
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      };

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            const scrollPercentage = scrollPosition / windowHeight;
            setOpacity(Math.min(scrollPercentage, 1));
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
      <>
        <HeaderContainer
            style={{
                opacity: opacity,
            }}
        >
            <BrandColumn>
                <h1>ALEXEY MORGAEV</h1>
            </BrandColumn>
            <DesktopActions>
              <Nav>
                <NavItem href="#" onClick={(e) => {e.preventDefault(); scrollToSection('home') }}>HOME</NavItem>
                <NavItem href="#" onClick={(e) => {e.preventDefault(); scrollToSection('about') }}>ABOUT</NavItem>
                <NavItem href="#" onClick={(e) => {e.preventDefault(); scrollToSection('experience') }}>EXPERIENCE</NavItem>
                <NavItem href="#" onClick={(e) => {e.preventDefault(); scrollToSection('portfolio') }}>PORTFOLIO</NavItem>
                <NavItem href="#" onClick={(e) => {e.preventDefault(); scrollToSection('contacts') }}>CONTACTS</NavItem>
              </Nav>
              <LanguageButton
                type="button"
                onClick={toggleLanguage}
                aria-label={language === 'en' ? 'Switch to Russian' : 'Switch to English'}
              >
                {language === 'en' ? 'RU' : 'EN'}
              </LanguageButton>
            </DesktopActions>
        </HeaderContainer>

        <MobileHeaderContainer
          style={{
            opacity: opacity,
          }}
        >
          <CardNav
            className="mobile-card-nav"
            logoText="ALEXEY MORGAEV"
            logoAlt="Alexey Morgaev"
            items={mobileNavItems}
            baseColor="rgba(0, 0, 0, 0.78)"
            menuColor="var(--text)"
            rightSlot={
              <LanguageButton
                $mobile
                type="button"
                onClick={toggleLanguage}
                aria-label={language === 'en' ? 'Switch to Russian' : 'Switch to English'}
              >
                {language === 'en' ? 'RU' : 'EN'}
              </LanguageButton>
            }
            onNavigate={scrollToSection}
          />
        </MobileHeaderContainer>
      </>
    );
}
