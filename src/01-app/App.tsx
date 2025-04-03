import './App.css'
import Home from '../02-sections/Home'
import About from '../02-sections/About'
import Header from '../02-sections/Header';
import Skills from '../02-sections/Skills';
import Portfolio from '../02-sections/Portfolio';
import Contacts from '../02-sections/Contacts';

function App() {

  return (
    <>
    <header>
      <Header/>
    </header>
    <main>
      <Home/>
      <About/>
      <Skills/>
      <Portfolio/>
      <Contacts/>
    </main>
      
    </>
  )
}

export default App
