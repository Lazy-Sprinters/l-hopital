import React from 'react';
import '../App.css';
import { Button1 } from './Button';
import { Link } from 'react-router-dom';
import './HeroSection.css';

function HeroSection() {
  return (
    <div className='hero-container'>
      <img src='/images/homech1.jpg' className="home-img"/>
      <h1>HealthCare Documenting Made Easy</h1>
      <p>What are you waiting for?</p>
      <div className='hero-btns'>
        <Link to='/register'>
          <Button1
            className='btns'
            buttonStyle='btn--outline'
            buttonSize='btn--large'
          >
            REGISTER
          </Button1>
        </Link>
        <Link to='/login'>
          <Button1
            className='btns'
            buttonStyle='btn--primary'
            buttonSize='btn--large'
          >
            LOGIN 
          </Button1>
        </Link>
      </div>
    </div>
  );
}

export default HeroSection;