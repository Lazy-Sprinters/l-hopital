import React from 'react';
import './Footer.css';
import { Button } from './Button';
import { Link } from 'react-router-dom';

function Footer() {
  
  return (
    <div className='footer-container'>
      <div class='footer-links'>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h2>About Us</h2>
            <h4>A unique-minded group with full of enthusiasm and thinking to change the world to a better one.</h4>
          </div>

          <div class='footer-link-items'>
            <h2>Social Media</h2>
            <Link to='/'>Instagram</Link>
            <Link to='/'>Linkedin</Link>
            <Link to='/'>Youtube</Link>
            <Link to='/'>Twitter</Link>
          </div>
          
        </div>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h2>Developers</h2>
            <Link to='/'>Anuraj Agarwal</Link>
            <Link to='/'>Pavitra Goyal</Link>
            <Link to='/'>Samarthya Jha</Link>
          </div>
            <div class='footer-link-items'>
            <h2>Mail</h2>
            <h4><a href="mailto:anuraj.agarwal@vitstudent.ac.in">Click here to mail us.</a></h4>
          </div>
        </div>
      </div>
      <section class='social-media'>
        <div class='social-media-wrap'>
          <div class='footer-logo'>
            <Link to='/' className='social-logo'>
               MEDICOS
            </Link>
          </div>
          <small class='website-rights'>MEDICOS © 2020</small>
          <div class='social-icons'>
            <ul> 
              <li>
                <a href="#">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span class="fab fa-facebook"></span>
                </a> 
              </li>
              <li>
                <a href="#">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span class="fab fa-twitter"></span>
                </a> 
              </li>
              <li>
                <a href="#">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span class="fab fa-instagram"></span>
                </a> 
              </li>
              <li>
                <a href="#">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span class="fab fa-github"></span>
                </a> 
              </li>
              <li>
                <a href="#">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span class="fab fa-linkedin"></span>
                </a> 
              </li>
            </ul>  
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
