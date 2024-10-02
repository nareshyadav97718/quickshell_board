import React, { useState } from 'react'
import './Navbar.css'
import ChooseBy from '../ChooseBy/ChooseBy';
import display from '../../icons/Display.svg'
import down from '../../icons/down.svg'

function Navbar({ onUpdateTickets }) {
    const [open, setOpen]=useState(false);

    const handleButton =()=>{
        setOpen(!open);
        
    }
  return (
    <div className='container'>
       <button onClick={()=>{handleButton()}}><img src={display}/>  Display <img src={down} /></button>
       {
        open&&<ChooseBy onUpdateTickets={onUpdateTickets}   />
        
       }
    </div>
  )
}

export default Navbar
