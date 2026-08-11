import './App.css';
import styled from 'styled-components';

import SideRays from '../05-shared/animations/bg/SideRays';

import Home from '../02-sections/Home';
import About from '../02-sections/About';
import Header from '../02-sections/Header';
import Skills from '../02-sections/Skills';
import Experience from '../02-sections/Experience';
import Portfolio from '../02-sections/Portfolio';
import Contacts from '../02-sections/Contacts';

const Background = styled.div`
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100vh;
  height: 100lvh;
  z-index: 0;
  pointer-events: none;
`;

const Rays = styled.div`
  position: absolute;
  inset: 0;

  &.mobile-top-ray {
    @media (max-width: 767px) {
      left: auto;
      bottom: auto;
      right: -18vw;
      top: -6lvh;
      width: min(118vw, 560px);
      height: min(52lvh, 460px);
      opacity: 0.68;
      -webkit-mask-image: radial-gradient(ellipse at 78% 18%, #000 0%, #000 34%, transparent 68%);
      mask-image: radial-gradient(ellipse at 78% 18%, #000 0%, #000 34%, transparent 68%);
    }
  }

  &.mobile-hidden {
    @media (max-width: 767px) {
      display: none;
    }
  }
`;
function App() {
  return (

    <>

      <Background>
        <Rays className="mobile-top-ray">
          <SideRays
            speed={2.5}
            rayColor1="#EAB308"
            rayColor2="#96c8ff"
            intensity={3}
            spread={3}
            origin="top-right"
            tilt={0}
            saturation={1.9}
            blend={0.75}
            falloff={1.5}
            opacity={1}
            distance={1.1}
          />
        </Rays>

        <Rays className="mobile-hidden">
          <SideRays
            speed={2.5}
            rayColor1="#7cf4ee"
            rayColor2="#d7ff35"
            intensity={3}
            spread={3}
            origin="bottom-left"
            tilt={0}
            saturation={1.7}
            blend={0.75}
            falloff={1.5}
            opacity={1}
            distance={1.1}
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
        <Experience />
        <Portfolio />
        <Contacts />
      </main>
    </>
  );
}

export default App;
