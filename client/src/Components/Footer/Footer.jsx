import React from 'react'
import './Footer.css'

import ins_icon from '../Asset/ins.png'
import face_icon from '../Asset/facebook.png'
import footer_logo from '../Asset/logo.png'

const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-logo">
            <img src={footer_logo} alt="" />
            <p>SPICY GAME</p>

        </div>
        <ul className="footer-links">
            <li>STORE</li>
            <li>ABOUT</li>
            <li>SUPPORT</li>
        </ul>
        <div className="footer-social-icon">
            <div className="footer-icons-container">
                <img src={ins_icon} alt="" />

            </div>
            <div className="footer-icons-container">
                <img src={face_icon} alt="" />

            </div>
           
            <div className="footer-copyright"><hr/>
            <p>Copyright @2024 -  Designed by SPICY GAME </p>

            </div>

        </div>

  </div>
    
  )
}

export default Footer;
