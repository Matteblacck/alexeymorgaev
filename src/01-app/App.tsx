import './App.css';
import styled from 'styled-components';

import SideRays from '../05-shared/animations/bg/SideRays';

import Home from '../02-sections/Home';
import About from '../02-sections/About';
import Header from '../02-sections/Header';
import Skills from '../02-sections/Skills';
import Portfolio from '../02-sections/Portfolio';
import Contacts from '../02-sections/Contacts';
import { useState, useEffect } from 'react';

const Background = styled.div`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  pointer-events: none;
`;

const Rays = styled.div`
  position: absolute;
  inset: 0;
`;
function App() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {

    const resize = () => setWidth(window.innerWidth);

    window.addEventListener('resize', resize);

    return () => window.removeEventListener('resize', resize);

  }, []);

  const isXs = width < 576;

  const isSm = width >= 576 && width < 768;

  // const isMd = width >= 768 && width < 992;

  return (

    <>

      <Background>
        <Rays>
           <SideRays
          speed={isXs ? 2 : isSm ? 2 : 2.5}
          rayColor1="#EAB308"
          rayColor2="#96c8ff"
          intensity={isXs ? 1.5 : isSm ? 1.8 : 3}
          spread={isXs ? 0.9 : isSm ? 1.5 : 3}
          origin="top-right"
          tilt={isXs ? -15 : isSm ? -10 : 0}
          saturation={1.9}
          blend={0.75}
          falloff={isXs ? 2.5 : isSm ? 2 : 1.5}
          opacity={isXs ? 0.9 : 1}
        />
        </Rays>
       
        <Rays>
           <SideRays
          speed={isXs ? 1.5 : isSm ? 2 : 2.5}
          rayColor1="#7cf4ee"
          rayColor2="#d7ff35"
          intensity={isXs ? 1.5 : isSm ? 1.8 : 3}
          spread={isXs ? 0.9 : isSm ? 1.5 : 3}
          origin="bottom-left"
          tilt={isXs ? -25 : isSm ? -10 : 0}
          saturation={1.7}
          blend={0.75}
          falloff={isXs ? 2 : isSm ? 2 : 1.5}
          opacity={isXs ? 0.6 : 1}
        />
        </Rays>


      </Background>
      <header>
        <Header />
      </header>

      <main>
        <Home />
        <About />
        <Skills />
        <Portfolio />
        <Contacts />
      </main>
    </>
  );
}

export default App;