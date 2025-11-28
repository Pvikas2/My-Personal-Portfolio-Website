import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import React from 'react'
import { useState } from 'react';
import ParticlesBackground from '../components/ParticlesBackground';
import Astra from '../assets/Astra.png'

const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
const PUBLIC_ID = import.meta.env.VITE_PUBLIC_KEY;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    budget: "",
    idea: ""
  })
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target
    if(name === 'budget' && value && !/^\d+$/.test(value)) return;
    setFormData((prev) => ({...prev, [name]: value}))
    if(errors[name]) setErrors((p) => ({...p, [name]: ""}))
  }

  const validateForm = () => {
    const required = ["name", "email", "service", "idea"]
    const newErrors = {};
    required.forEach((f) => !formData[f].trim() && (newErrors[f] = "Please fill in this field."));
    if(formData.service !== "other" && !formData.budget?.trim())
      newErrors.budget = "Please fill in this field";
    setErrors(newErrors);
    return !Object.keys(newErrors).length;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!validateForm()) return;
    setStatus("sending");
    try{
      await emailjs.send(
        SERVICE_ID, 
        TEMPLATE_ID,
        {
          ...formData,
          from_name: formData.name,
          reply_to: formData.email,
        },
        PUBLIC_ID
      );
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        service: "",
        budget: "",
        idea: ""
      })
    }
    catch(err){
      console.error("EmailJs Error::", err);
      setStatus("Something went wrong");
    }

  }


  return (
    <section id='contact' className='w-full min-h-screen relative bg-black overflow-hidden text-white py-20 px-6 md:px-20 flex flex-col md:flex-row items-center gap-10'>
      <ParticlesBackground/>
      <div className='relative z-10 w-full flex flex-col md:flex-row otems-center gap-10'>
        <motion.div
         className='w-full md:w-1/2 flex justify-center'
         initial={{opacity:0, x: -50}}
         whileInView={{opacity: 1, x: 0}}
         transition={{duration: 0.6}}
        >
          <motion.img 
            src={Astra}
            alt="Contact"
            className='w-72 md:w-140 rounded-2xl shadow-lg object-cover'
            animate={{y: [0, -10, 0]}}
            transition={{duration: 2, repeat: Infinity, ease: "easeInOut"}}
          >

          </motion.img>
        </motion.div>
        {/* Right Side */}
        <motion.div 
          className='w-full md:w-1/2 bg-white/5 p-8 rounded-2xl shadow-lg border border-white/10'
          initial={{opacity: 0, x: 50}}
          whileInView={{opacity: 1, x:0}}
          transition={{duration: 0.6}}
        >
          <h2 className='text-3xl font-bold mb-6'>
            Lets Work Together
          </h2> 
          <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
            {/* Name */}
            <div className='flex flex-col'>
              <label className='mb-1'>Your name<span className='text-red-500'>*</span></label>
              <input
                type="text"
                placeholder='Your name'
                value={formData.name}
                name="name"
                onChange={handleChange}
                className={`p-3 rounded-md bg-white/10 border ${errors.name ? "border-red-500" : "bg-gray-500"} text-white focus:outline-none focus:border-green-500`}
              />
              {errors.name && <p className='text-red-500 text-xs'>{errors.name}</p>}
            </div>

            {/* Email */}
            <div className='flex flex-col'>
              <label className='mb-1'>Your email<span className='text-red-500'>*</span></label>
              <input
                type="text"
                placeholder='Your email'
                value={formData.email}
                name="email"
                onChange={handleChange}
                className={`p-3 rounded-md bg-white/10 border ${errors.email ? "border-red-500" : "bg-gray-500"} text-white focus:outline-none focus:border-green-500`}
              />
              {errors.email && <p className='text-red-500 text-xs'>{errors.email}</p>}
            </div>         
              
            {/* Service Needed */}
            <div className='flex flex-col'>
              <label className='mb-1'>Service Needed<span className='text-red-500'>*</span></label>
              <select
                value={formData.service}
                name="service"
                onChange={handleChange}
                className={`p-3 rounded-md bg-white/10 border ${errors.service ? "border-red-500" : "bg-gray-500"} text-white focus:outline-none focus:border-green-500`}
              >
                <option value="" disabled className='pointer-events-none bg-transparent'>Something in mind?</option>
                <option value="Web Development" className='text-black'>Web Developement</option>
                <option value="Mobile Application" className='text-black'>Mobile Application</option>
                <option value="other" className='text-black'>Others</option>
              </select>
              {errors.service && <p className='text-red-500 text-xs'>{errors.service}</p>}
            </div>    

            {/* Budget */}
            { formData.service && formData.service !== "other" && <div className='flex flex-col'>
              <label className='mb-1'>Budget<span className='text-red-500'>*</span></label>
              <input
                type="text"
                placeholder=''
                value={formData.budget}
                name="budget"
                onChange={handleChange}
                className={`p-3 rounded-md bg-white/10 border ${errors.budget ? "border-red-500" : "bg-gray-500"} text-white focus:outline-none focus:border-green-500`}
              />
              {errors.budget && <p className='text-red-500 text-xs'>{errors.budget}</p>}
            </div>
            }

            {/* Explain your Idea */}
            <div className='flex flex-col'>
              <label className='mb-1'>Explain Your Idea<span className='text-red-500'>*</span></label>
              <textarea
                placeholder='Enter Your Idea'
                value={formData.idea}
                rows={5}
                name="idea"
                onChange={handleChange}
                className={`p-3 rounded-md bg-white/10 border ${errors.idea ? "border-red-500" : "bg-gray-500"} text-white focus:outline-none focus:border-green-500`}
              />
              {errors.idea && <p className='text-red-500 text-xs'>{errors.idea}</p>}
            </div>
            {status && (
                <p className={`text-sm ${status === 'success' ? 'text-green-400' : status === "error" ? "text-red-400" : "text-yellow-400"} `} >
                  {status === "sending" ? "sending" : status === 'success' ? "Message has been sen successfully ✅" : "Something went wrong ❌" }
                </p>
              )
            }
            <motion.button
              className='bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-3 rounded-md  font=semibold transition'
              whileHover={{scale: 1.05}}
              whileTap={{scale:0.95}}
              disabled={status === 'pending'}
              type="submit"
            >
            {status === "sending" ? "sending..." : "Send Message" }
            </motion.button>
          </form>
        </motion.div>
      </div>

    </section>
  )
}

export default Contact