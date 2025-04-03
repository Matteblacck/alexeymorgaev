import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { fluidText } from '../05-shared/utils';

const HeaderContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 20px;
    opacity: 0;
    transition: opacity 0.1s ease-out; /* Плавное изменение прозрачности */
    font-weight: 600;
    font-size:${fluidText(20, 10)};
    z-index:1000;
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

export default function Header() {
    const [opacity, setOpacity] = useState(0);
    const scrollToSection = (id: string) => {
        const section = document.getElementById(id);
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
        <HeaderContainer
            style={{
                opacity: opacity,
            }}
            className="d-flex justify-content-between"
        >
            <div>
                <h1>ALEXEY MORGAEV</h1>
            </div>
            <div className="d-flex gap-2">
                <NavItem href="#" onClick={(e) => {e.preventDefault(); scrollToSection('home') }}>HOME</NavItem>
                <NavItem href="#" onClick={(e) => {e.preventDefault(); scrollToSection('about') }}>ABOUT</NavItem>
                <NavItem href="#" onClick={(e) => {e.preventDefault(); scrollToSection('portfolio') }}>PORTFOLIO</NavItem>
                <NavItem href="#" onClick={(e) => {e.preventDefault(); scrollToSection('contacts') }}>CONTACTS</NavItem>
            </div>
        </HeaderContainer>
    );
}