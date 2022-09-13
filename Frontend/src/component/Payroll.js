import React, { useState } from 'react';
import "./Payroll.css";
import {Link, Outlet} from 'react-router-dom';
import { motion } from 'framer-motion';


function Payroll() {
  const [clickStyle, setClickStyle] = useState(1);
  const handleClick = (idx) => {
    setClickStyle(idx);
    console.log("idx --> ", idx)
  }

  const [small, setSmall] = useState(false)
  return (
    <>
      <div className='dashItems'>
        <Link to='/home/dashboard/Engineering'><div className={` ${clickStyle === 1 ? "activeSection" : ""} ${small ? " sections" : " section"} `} onClick={() => {handleClick(1); setSmall(true)}} ><motion.div whileHover={{ scale: 1.2}}>Engineering</motion.div></div></Link>
        <Link to='/home/dashboard/Operations'><div className={` ${clickStyle === 2 ? "activeSection" : ""} ${small ? " sections" : " section"}`} onClick={() => {handleClick(2);setSmall(true)}} ><motion.div whileHover={{ scale: 1.2}}>Operations</motion.div></div></Link>
        <Link to='/home/dashboard/Accounts'><div className={` ${clickStyle === 3 ? "activeSection" : ""} ${small ? " sections" : " section"} `} onClick={() => {handleClick(3); setSmall(true)}} ><motion.div whileHover={{ scale: 1.2}}>Accounts</motion.div></div></Link>
        <Link to='/home/dashboard/SupplyChain'><div className={` ${clickStyle === 4 ? "activeSection" : ""} ${small ? " sections" : " section"} `} onClick={() => {handleClick(4); setSmall(true)}} ><motion.div whileHover={{ scale: 1.2}}>Supply Chain</motion.div></div></Link>
      </div>
      <Outlet/>
    </>  
  )
}

export default Payroll;