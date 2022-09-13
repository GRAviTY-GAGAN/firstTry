import React, { useState } from 'react';
import './Navbar.css'

const Navbar = () => {
  const [open, setOpen] = useState(false);
  console.log(open);

  return (
    <nav className='navbar'>
    <div style={{cursor: 'default'}}>
      Payroll
    </div>
    <div style={{cursor: 'default'}}>Admin</div>
    </nav>
  )
}

export default Navbar;