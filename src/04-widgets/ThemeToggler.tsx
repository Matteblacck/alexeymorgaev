import React, { useState } from 'react';
import styled from 'styled-components';

// Типизация пропсов для компонента Icon
interface IconProps {
  $isToggled: boolean;
}

const ToggleContainer = styled.div<{ $isToggled: boolean }>`
  position: relative;
  width: 60px;
  height: 30px;
  border-radius: 15px;
  background-color: ${({ $isToggled }) => ($isToggled ? '#f0f0f0' : '#333')};
  cursor: pointer;
  transition: background-color 0.3s ease, border-color 0.3s ease;

  /* Убираем рамку по умолчанию */
  border: 1px solid ${({ $isToggled }) => ($isToggled ? '#f0f0f0' : '#333')};

  &:hover {
    border-color: var(--highlited-text); /* Подсветка рамки */
  }
`;

const ToggleBall = styled.div<{ $isToggled: boolean }>`
  position: absolute;
  top: 2px;
  left: 2px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, background-color 0.3s ease;
`;

const Icon = styled.span<IconProps>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  color: ${({ $isToggled }) => ($isToggled ? '#000' : '#fff')};
  transition: color 0.3s ease;
`;

const MoonIcon = styled(Icon)`
  left: 5px;
`;

const SunIcon = styled(Icon)`
  right: 5px;
`;

const ThemeToggle = () => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <ToggleContainer $isToggled={isToggled} onClick={handleToggle}>
      <ToggleBall $isToggled={isToggled} style={{ transform: isToggled ? 'translateX(30px)' : 'translateX(0)' }} />
      <MoonIcon $isToggled={isToggled}></MoonIcon>
      <SunIcon $isToggled={isToggled}></SunIcon>
    </ToggleContainer>
  );
};

export default ThemeToggle;