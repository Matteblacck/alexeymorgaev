import React from "react";
import styled from "styled-components";
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
const StyledButton = styled.button`
    font-weight: 600 ;
    background-color: transparent;
    border:none;
    color:var(--text);
`
export default function Button(props: ButtonProps) {
  return <StyledButton {...props} />;
}