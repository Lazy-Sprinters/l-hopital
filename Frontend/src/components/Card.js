import React from 'react';
import './Card.css';
import CardItem from './CardItem';

function Card() {
  return (
    <div className='cards'>
      <h1>Check out these features provided by the site!!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='/images/ocr.jpg'
              text='For the ease of patients as well as doctors OCR technology can be used to convert the clicked prescriptions to readable text.'
              label='OCR TECHNOLOGY'
            />
            <CardItem
              src='/images/database.jpg'
              text='Your presciptions is maintaned securely and in chronological order to make your interaction easier.'
              label='DATABASE MANAGEMENT'
            />
            <CardItem
              src='/images/life_made_easy.jpg'
              text='No need to carry your medical history documents along with you every tie you visit a doctor.'
              label='LIFE MADE EASY'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Card;