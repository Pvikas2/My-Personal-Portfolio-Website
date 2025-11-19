import { motion } from 'framer-motion'
import p from '../assets/p.jpeg'
import React from 'react'

const About = () => {
  const glows = [
    "-top-10 -left-10 w-[360px] h-[360px] opacity-20 blur-[120px]",
    "bottom-0 right-10 w-[420px] h-[420px] opacity-15 blur-[140px] delay-300",
    "top-0.5 left-0.5 -translate-x-0.5 -tranlslate-y-0.5 w-[220px] h-[220px] opacity-10 blur-[100px]"
  ]

  const status = [
    {label: "Experience", value: "4+ years"},
    {label: "Speciality", value: "Full Stack"},
    {label: "Focus", value: "Performace & UX"},
  ]

  return (
    <section 
      className='w-full min-h-screen flex items-center justify-center relative bg-black text-white overflow-hidden'
      id="about"
    >
      <div className='absolute inset-0 pointer-events-none'>
        {glows.map((c, i) => (
          <div
            key={i}
            className={`absolute rounded-full bg-linear-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] animate-pulse ${c}`}
          >
          </div>
        ))}
      <div className='relative z-10 max-w-6xl w-full mx-auto px-6 md:px-10 lg:px-12 py-20 flex flex-col gap-12'>
        <motion.div 
          className='flex flex-col md:flex-row items-center md:items-stretch gap-8'
          initial={{opacity: 0, y: 24}}
          whileInView={{opacity: 1, y: 0}}
          transition={{duration: 0.6}}
          viewport={{once: true, amount: 0.4}}
        >
          <motion.div 
            className='relative w-40 h-40 md:w-[200px] md:h-[200px] rounded-2xl overflow-hidden shdaow-2xl bg-linear-to-br from-[#1cd8d2]/20 to-[#302b63]/20 border-[#1cd8d2]/25'
            whileHover={{ scale: 1.02 }}
            transition={{ type:"spring", stiffness: 200, damping: 18 }}
          > 
            <img src={p} alt="profile" className='absolute inset-0'/>
          </motion.div>
          <div>
            <h2 className='text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-[#1cd8d2] via-[#00bf8f] to-[#1cd8d2]'>
              Vikas Pimpale
            </h2>
            <p className='mt-2 text-lg sm:text-xl text-white/90 font-semibold'>
              Full Stack Developer
            </p>
            <p className='mt-4 text-gray-300 leading-relaxed text-base sm:text-lg max-w-2xl md:max-w-3xl'>
              I build scalable, modern application with a strong focus on clean architechture, delightful UX, and performance, My toolkit spans Javascript, React Js, Next Js, TypeScript,
              Tailwind CSS, web components, and Restful API - bringing ideas to life from concept to production with robust APIs and smooth interface. 
            </p>
            <div className='mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-xl'>
              {status.map((item, i) => (
                <motion.div
                  key={i}
                  className='rounded xl border border-white/10 px-4 bg-white/5 py-3 text-center'
                  initial={{opacity: 0, y: 10}}
                  whileInView={{opacity: 1, y: 0}}
                  transition={{delay:0.05 * i, duration: 0.4}}
                  viewport={{once: true, amount: 0.3}}
                >
                  <div className='text-sm text-gray-400'>{item.label}</div>
                  <div className='text-base font-semibold'>{item.value}</div>
                </motion.div>
              ))}
            </div>
            <div className='mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start'>
              <a href='#projects' className='inline-flex items-center justify-center rounded-lg bg-white cursor-pointer text-black font-semibold px-5 py-3 hover:bg-hray-200 transition '>View Projects</a>
              <a href='#contact' className='inline-flex items-center justify-center rounded-lg border cursor-pointer border-white/20 bg-white/10  text-white px-5 py-3 hover:bg-white/80 transition '>Get In Touch</a>
            </div>
          </div>
        </motion.div>
        <motion.div>
          <h3 className='text-2xl sm:text-3xl font-bold text-white mb-3'>About Me</h3>
          <p className='text-gray-300 leading-relaxed font-bold text-base sm:text-lg'>
            I'm a Software Developer, Web Developer, and Full Stack Developer — passionate about building fast, resilient applications and writing clean, scalable code. 
          </p>
          <p className='mt-4 text-gray-400 text-base sm:text-lg'>
            I love turning ideas into user-friendly digital experiences, and I consistently share my work and open-source contributions through GitHub.   
          </p>
        </motion.div>
      </div>
      </div>
    </section>
  )
}

export default About