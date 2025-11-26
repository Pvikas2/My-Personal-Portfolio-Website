import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useMemo, useRef } from 'react'

const experiences = [
  {
    role: "HVAC Design Engineer",
    company: "A K Enterprises",
    duration: "2019-2021",
    description: "Designed and engineered HVAC systems for residential and commercial projects following ASHRAE standards. Achieved 25% energy reduction in a commercial project and LEED Platinum certification with 40% emission reduction. Tools: AutoCAD, MS Excel, Heat Load Calculation Sheets.",
  },
  {
    role: "SDE-I Full stack developer",
    company: "eKincare",
    duration: "2021 - 2023",
    description: "Ekincare is a B2B/B2C health tech platform providing health benefits and analytics for corporate clients. Built features like Employee List, Mental Wellness, Stepathons, Analytics Revamp, and Spending Account. Implemented multi-factor authentication, manager search functionality, and company policy management. Developed landing pages and validation checklists for employee claim reimbursement. Resolved UI issues to enhance responsiveness and user experience across mobile and web platforms.",
  },
  {
    role: "Software Enginner II",
    company: "TrcaceLink",
    duration: "2023 - 2025",
    description: "At TraceLink, I developed and maintained the Gen2 Opus-UI using Web Components, Lit, and Shoelace to improve responsiveness, performance, and accessibility. I delivered end-to-end supply chain features on a meta-driven architecture and built real-time updates using WebSockets over GraphQL. I created reusable UI components like a rich text editor, media uploader, and currency input with full localization support. I also implemented cross-window communication with postMessage, managed AWS deployments (S3, Jenkins, CI/CD), and collaborated with teams to build modular, scalable UI components using React, Tailwind, and HTML5.",
  },
];

function ExperienceItem ({exp, idx, start, end, scrollYProgress, layout }){
  const scale = useTransform(scrollYProgress, [start, end], [0, 1]);
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const y = useTransform(scrollYProgress, [start, end], [idx%2===0 ? 30 : -30, 0]);
  const x = useTransform(scrollYProgress, [start, end], [-24, 0]);
  if(layout === 'desktop'){
    return (
      <div className='relative flex flex-1 justify-center items-center '>
        <motion.div 
        className='z-10 w-7 h-7 rounded-full bg-white shadow-[0_0_0_8px_rgba(255,255,255,0.1)]'
        style={{scale, opacity}}
        >
        </motion.div>
        <motion.div className={`absolute ${idx%2===0 ? '-top-8' : '-bottom-8'} w-[3px] bg-white/40`} 
        style={{height: 40, opacity}}>
        </motion.div>
        <motion.article
          className={`absolute bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-4 w-[520px] shadow-lg
          ${idx%2 === 0 ? 'bottom-12' : 'top-12'} `}
          style={{duration: y, opacity}}
          transition={{duration: 0.4, delay: idx*0.15}}
          >
          <h3 className='text-xl font-semibold mb-1'>{exp.role}</h3>
          <h4 className='text-md font-medium text-gray-400 mb-3'>{exp.company} | {exp.duration}</h4>
          <p className='text-gray-300 text-sm wrap-break-word leading-relaxed'>{exp.description}</p>
        </motion.article>
      </div>
    )
  }
  return (
    <div className="relative flex items-start">
      <motion.div className='absolute -left-3.5 top-3 z-10 w-7 h-7 rounded-full bg-white shadow-[0_0_0_8px_rgba(255,255,255,0.1)]'
      style={{scale, opacity}}
      >
      </motion.div>
      <motion.article
        className={`bg-gray-900/80 backdrop-blur border border-gray-700/0 rounded-xl p-5 w-[90vw] max-w-sm ml-6 shadow-lg`}
        style={{opacity, x}}
        transition={{duration: 0.4, delay: idx*0.15}}
      >
        <h3 className='text-lg font-semibold wrap-break-word'>
          {exp.role}
        </h3>
        <p classNsme='text-lg font-semibold break-words'>
          {exp.company} || {exp.duration} 
        </p>
        <p 
          className='text-sm text-gray-300 wrap-break-word '
        >
          {exp.description}
        </p>
      </motion.article>
    </div>
  )

}



const Experience = () => {
  const sceneRef = useRef(null);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const SCENE_HEIGHT_VH = isMobile ? 160*experiences.length : 120*experiences.length;
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"]
  });

  const thresholds = useMemo(() => experiences.map((_, idx) => (idx+1) / experiences.length), []);
  const lineSize = useTransform(scrollYProgress, (v) => `${v * 100}%`);
  return (
    <section id="experience" className='relative bg-black text-white'>
      <div
        ref={sceneRef}
        style={{ height: `${SCENE_HEIGHT_VH}vh`, minHeight: "120vh" }}
        className='relative'
      >
        <div className='sticky top-0 h-screen flex flex-col'>
          <h2 className='text-4xl sm:text-5xl font-semibold mt-5 text-center'>
            Experience
          </h2>
          <div className='flex flex-1 items-center justify-center px-6 pb-10'>
              {!isMobile && (
                <div className='relative w-full max-w-7xl'>
                  <div className='relative h-1.5 bg-white/15 rounded'>
                    <motion.div 
                      className='absolute left-0 top-0 h-1.5 bg-white rounded origin-left'
                      style={{width: lineSize}}
                    >
                    </motion.div>              
                  </div>
                  <div className='relative flex justify-between mt-0'>
                    {experiences.map((exp, idx) => (
                      <ExperienceItem 
                        key={idx}
                        exp={exp}
                        idx={idx}
                        start={idx == 0 ? 0 : thresholds[idx - 1]}
                        end={thresholds[idx]}
                        scrollYProgress={scrollYProgress}
                        layout='desktop'
                      />
                    ))}
                  </div>
                </div>
              )}

              {isMobile && (
                <div className='relative w-full max-w-md'>
                  <div className='absolute left-0 top-0 botton-0 w-0.5 bg-white/15 rounded'>
                    <motion.div 
                      className='absolute left-0 top-0 w-1.5 bg-white rounded origin-top'
                      style={{width: lineSize}}
                    >
                    </motion.div>              
                  </div>
                  <div className='relative flex flex-col gap-10 ml-10 mt-6 pb-28'>
                    {experiences.map((exp, idx) => (
                      <ExperienceItem 
                        key={idx}
                        exp={exp}
                        idx={idx}
                        start={idx == 0 ? 0 : thresholds[idx - 1]}
                        end={thresholds[idx]}
                        scrollYProgress={scrollYProgress}
                        layout='mobile'
                      />
                    ))}

                  </div>
                </div>
              )}


          </div>
        </div>

      </div>
    </section>
  )
}

export default Experience