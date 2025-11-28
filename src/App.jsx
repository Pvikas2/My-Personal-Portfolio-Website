import React from "react"
import CustomCursor from "./components/CustomCursor"
import Navbar from "./components/Navbar"
import About from "./sections/About"
import Contact from "./sections/Contact"
import Experience from "./sections/Experience"
import Footer from "./sections/Footer"
import Home from "./sections/Home"
import Projects from "./sections/Projects"
import Skills from "./sections/Skills"
import IntroAnimation from "./components/IntroAnimation"

function App() {
  const [introDone, setIntroDone] = React.useState(false);

  return (
    <>
      {!introDone && <IntroAnimation onFinish={() => setIntroDone(true)}/>}
      { introDone && (
        <div className="relative gradient text-white">
          <CustomCursor/>
          <Navbar/>
          <Home/>
          <About/>
          <Skills/>
          <Projects/>
          <Experience/>
          <Contact/>
          <Footer/>
        </div>
      )}
    </>
  )
}

export default App
