import React, { useState } from 'react';
import { GoArrowUpRight } from 'react-icons/go';
import './CardNav.css';

type CardNavLink = {
  label: string;
  href: string;
  ariaLabel: string;
};

export type CardNavItem = {
  label: string;
  bgColor: string;
  textColor: string;
  links: CardNavLink[];
};

export interface CardNavProps {
  logo?: string;
  logoText?: string;
  logoAlt?: string;
  items: CardNavItem[];
  className?: string;
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
  rightSlot?: React.ReactNode;
  onNavigate?: (href: string) => void;
}

const CardNav: React.FC<CardNavProps> = ({
  logo,
  logoText,
  logoAlt = 'Logo',
  items,
  className = '',
  baseColor = '#fff',
  menuColor,
  buttonBgColor,
  buttonTextColor,
  rightSlot,
  onNavigate
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleMenu = () => {
    setIsHamburgerOpen((current) => !current);
    setIsExpanded((current) => !current);
  };

  return (
    <div className={`card-nav-container ${className}`}>
      <nav className={`card-nav ${isExpanded ? 'open' : ''}`} style={{ backgroundColor: baseColor }}>
        <div className="card-nav-top">
          <button
            type="button"
            className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            aria-label={isExpanded ? 'Close menu' : 'Open menu'}
            aria-expanded={isExpanded}
            style={{ color: menuColor || '#000' }}
          >
            <div className="hamburger-line" />
            <div className="hamburger-line" />
          </button>

          <div className="logo-container">
            {logo ? (
              <img src={logo} alt={logoAlt} className="logo" />
            ) : (
              <span className="logo-text">{logoText}</span>
            )}
          </div>

          {rightSlot && <div className="card-nav-right-slot">{rightSlot}</div>}

          <button
            type="button"
            className="card-nav-cta-button"
            style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
          >
            Get Started
          </button>
        </div>

        <div className="card-nav-content" aria-hidden={!isExpanded}>
          {(items || []).map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="nav-card"
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              <div className="nav-card-label">{item.label}</div>
              <div className="nav-card-links">
                {item.links?.map((lnk, i) => (
                  <a
                    key={`${lnk.label}-${i}`}
                    className="nav-card-link"
                    href={lnk.href}
                    aria-label={lnk.ariaLabel}
                    onClick={(event) => {
                      if (onNavigate) {
                        event.preventDefault();
                        onNavigate(lnk.href);
                      }
                      setIsHamburgerOpen(false);
                      setIsExpanded(false);
                    }}
                  >
                    <GoArrowUpRight className="nav-card-link-icon" aria-hidden="true" />
                    {lnk.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CardNav;
