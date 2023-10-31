import React from "react";
import "Fonts/Fonts.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";



const Main = () => {
  return (
    <motion.div className="authContainer" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
    transition={{
      duration: 1.5,
      delay: 0.5,
      ease: [0, 0.71, 0.2, 1.01]
    }}  >

      <motion.div className="titlel_Main">
       Pocheoltech_Ask</motion.div>
      
      <motion.div className="Home_title">
       Welcome to Pocheoltech Ask, I'm Admin</motion.div>

       <motion.div className="Home_titleRight">
         Hi ! How to use the App ?</motion.div>

       <motion.div className="Home_title">
       well, first i have to know you </motion.div>
      
       <motion.div className="Home_title">
         Do you Come to PTAsk ? please sign up !</motion.div>

         <motion.div className="Home_titleRight">
         OK, I Follow you !!</motion.div>
         <motion.div>
      
           
        
       </motion.div>
      
       <Link to="/Auth">
             <button className="authBtnMain" style={{delay: 1}}>
               Sign up & Log in
             </button>
           </Link>

      
    </motion.div>
  )
};
export default Main;

