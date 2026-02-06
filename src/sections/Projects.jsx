import { title } from 'framer-motion/client';
import React, { useMemo } from 'react'
// import img1 from '../assets/img1.JPG'
// import img2 from '../assets/img2.JPG'
import image1 from '../assets/image1.png'
import image2 from '../assets/image2.png'
import img3 from '../assets/img3.JPG'
import photo1 from '../assets/photo1.JPG'
import photo2 from '../assets/photo2.PNG'
import photo3 from '../assets/photo3.png'
import { useMotionValueEvent, motion, useScroll, AnimatePresence } from 'framer-motion';


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
        title: "HireFlow",
        link: "https://hireflow-job-portal.netlify.app/",
        bgColor: "linear-gradient(135deg, rgb(79, 70, 229), rgb(99, 102, 241))",
        image: isMobile ? photo1 : image1, // use mobile or desktop image
      },
      {
        title: "E-shop",
        link: "https://my-ecommerce-shop-website.netlify.app/",
        bgColor: "linear-gradient(45deg, #0ff, #2c5364)",
        image: isMobile ? photo2 : image2,
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

  const thresholds = projects.map((_, i) => (i+1) / (projects.length));
  const [activeIndex, setActiveIndex] = React.useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = thresholds.findIndex(t => latest <= t);
    setActiveIndex(index === -1 ? thresholds.length - 1 : index); 
  });

  const activeProject = projects[activeIndex]


  return (
    <section 
      id="projects" 
      ref={sceneRef} 
      className='text-white relative'
      style={{background: activeProject.bgColor, transition: "background-color 400ms ease", height: `${100*projects.length}vh`}}
    >
      <div className='sticky top-0 h-screen flex flex-col items-center justify-center'>
        <h2 className={`text-3xl font-semibold z-10 text-center ${ isMobile ? 'mt-4' : 'mt-8' }`}>
         My works
        </h2>  
        <div className={`relative w-full flex-1 items-center justify-center ${ isMobile ? '-mt-4' : '' }`}>
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-full duration-500 ${ index === activeIndex ? 'opacity-100 z-20' : 'opacity-0 z-0 sm:z-10' }`}
              style={{width: "85%", maxWidth: "1200px"}}
            >
              <AnimatePresence mode='wait'>
                { index === activeIndex && (
                  <motion.h3
                    key={project.title}
                    initial={{opacity: 0, y: -30}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: 30}}
                    transition={{duration: 0.5, ease: "easeOut"}}
                    className={`block text-center text-[clamp(2rem,6vw,5rem)] text-white/95 sm:absolute sm:-top-20 sm:left-[35%] lg:left-[-5%] sm:mb-0
                      italic font-semibold ${ isMobile ? '-mt-24' : '' }`}
                    style={{zIndex: 5, textAlign: isMobile ? 'center' : 'left', }}
                  >
                    {project.title}
                  </motion.h3>
                )}
              </AnimatePresence>
              <div className={`relative w-full overflow-hidden bg-black/20 shadow-2xl md:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.)] 
                ${isMobile ? 'mb-6 rounded-lg' : 'mb-10 sm:mb-12 rounded-xl'}  h-[62vh] sm:h-[66vh]`}
                style={{zIndex: 10, transition: "box-shadow 250ms ease"}}
                >
                <img 
                  src={project.image} 
                  alt={project.title}
                  className='w-full h-full object-cover drop-shadow-xl md:drop-shadow-2xl'
                  style={{
                    position: "relative",
                    zIndex: 10, 
                    filter: "drop-shadow(0,16px 40px rgba(0,0,0, 0.65)",
                    transition: "filter 200ms ease"
                  }}
                  loading='lazy'
                />
              </div>

            </div>
          ))}
        </div>
        <div className={`absolute ${isMobile ? 'bottom-20': 'bottom-10'}`}>
          <a 
            href={activeProject.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{zIndex: 30}}
            className='inline-block px-6 py-3 rounded-lg font-semibold text-black bg-white hover:bg-gray-200 transition-all'
            aria-label={`View ${activeProject.title} Project`}
          >
            View Projects
          </a>
        </div>
      </div>
    </section>
  )
}

export default Projects