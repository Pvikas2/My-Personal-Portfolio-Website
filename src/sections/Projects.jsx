import { title } from 'framer-motion/client';
import React, { useMemo } from 'react'
import img1 from '../assets/img1.JPG'
import img2 from '../assets/img2.JPG'
import img3 from '../assets/img3.JPG'
import photo1 from '../assets/photo1.JPG'
import photo2 from '../assets/photo2.PNG'
import photo3 from '../assets/photo3.png'
import { useMotionValueEvent, useScroll } from 'framer-motion';


const useIsMobile = ({ query = "(max-width: 639px)" } = {}) => {
  const [isMobile, setIsMobile] = React.useState(typeof window !== 'undefined' ? window.matchMedia(query).matches : false);

  React.useEffect(() => {
    if(typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia(query);
    const handleChange = () => setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    setIsMobile(mediaQuery.matches);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [query]);

  return isMobile;
}



const Projects = () => {
  const isMobile = useIsMobile();
  const sceneRef = React.useRef(null);

  const projects = useMemo(() => [
      {
        title: "nk studio",
        link: "https://www.nk.studio/",
        bgColor: "#0d4d3d",
        image: isMobile ? photo1 : img1, // use mobile or desktop image
      },
      {
        title: "Gamily",
        link: "https://gamilyapp.com/",
        bgColor: "#3884d3",
        image: isMobile ? photo2 : img2,
      },
      {
        title: "Hungry Tiger",
        link: "https://www.eathungrytiger.com/",
        bgColor: "#dc9317",
        image: isMobile ? photo3 : img3,
      },
  ], [isMobile]);

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"]
  });

  const thresholds = projects.map((_, i) => i+1 / (projects.length));
  const [activeIndex, setActiveIndex] = React.useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = thresholds.findIndex(t => latest < t);
    setActiveIndex(index === -1 ? thresholds.length - 1 : index); 
  });

  const activeProject = projects[activeIndex]


  return (
    <section 
      id="#projects" 
      ref={sceneRef} 
      className='w-full h-screen'
      style={{backgroundColor: activeProject.bgColor, transition: "background-color 0.4s ease", height: `${100*projects.length}vh`}}
    >
      <div className='sticky top-0 h-screen w-full flex items-center justify-center px-4'>
        <h2 className={`text-3xl font-semibold z-10 text-center ${ isMobile ? 'mt-4' : 'mt-8' } text-white drop-shadow-lg`}>
         My works
        </h2>  
        <div className={`relative w-full flex-1 items-center justify-center ${ isMobile ? '-mt-4' : '' }`}>
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-full duration-500 ease-in-out ${ index === activeIndex ? 'opacity-100 z-20' : 'opacity-0 z-0 sm:z-10' }`}
              style={{width: "85%", maxWidth: "1200px"}}
            >

            </div>
          ))}
        </div>
      </div>

    </section>
  )
}

export default Projects