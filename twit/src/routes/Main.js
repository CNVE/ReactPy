import React from "react";
import "Fonts/Fonts.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";



const Main = () => {
  return (
    <motion.div className="authContainer">

      <motion.div className="titlel_Main" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1.5,
        delay:0.5,
        ease: [0, 0.71, 0.2, 1.01]
      }} >
       Pocheoltech_Ask
       Made By 김수현
       </motion.div>
      
      <motion.div className="Home_title" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1.5,
        delay:1,
        ease: [0, 0.71, 0.2, 1.01]
      }} >
       Welcome to Pocheoltech Ask, I'm Admin</motion.div>

       <motion.div className="Home_titleRight" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1.5,
        delay:1.5,
        ease: [0, 0.71, 0.2, 1.01]
      }} >
         Hi ! How to use the App ?</motion.div>

       <motion.div className="Home_title" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1.5,
        delay:2,
        ease: [0, 0.71, 0.2, 1.01]
      }} >
       well, first i have to know you </motion.div>
      
       <motion.div className="Home_title" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1.5,
        delay:2.5,
        ease: [0, 0.71, 0.2, 1.01]
      }} >
         Do you Come to PTAsk ? please sign up !</motion.div>

         <motion.div className="Home_titleRight" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1.5,
        delay:3,
        ease: [0, 0.71, 0.2, 1.01]
      }} >
         OK, I Follow you !!</motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 2,
        delay:5,
        ease: [0, 0.71, 0.2, 1.01]
      }} >   
         <Link to="/Auth">
             <button className="authBtnMain">
               Let's Start !
             </button>
           </Link>

       </motion.div>

      
    </motion.div>
  )
};
export default Main;

