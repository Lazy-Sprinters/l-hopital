import React, { Component } from "react";
import './CentreCards.css';
import './Card.css';

    function CardComponent ({img,alt,Name,Address,Cost,Distance,OpeningTime,ClosingTime,Tags}){
        return( 
          <>
            <li className='cards__item'>
              <div className='cards__item__link'>
                <figure className='cards__item__pic-wrap' >
                  <img
                    className='cards__item__img'
                    alt={alt}
                    src={img}
                  />
                </figure>
                <div className='cards__item__info'>
                  <h6 className='cards__item__text'>{Name}</h6>
                  <h6 className='cards__item__text'>Location:{Address}</h6>
                  <h6 className='cards__item__text'>Minimum Cost:{Cost}</h6>
                  <h6 className='cards__item__text'>Minimum Distance:{Distance}</h6>
                  <h6 className='cards__item__text'>Opening Time:{OpeningTime}</h6>
                  <h6 className='cards__item__text'>Closing Time:{ClosingTime}</h6>
                  <h6 className='cards__item__text'>Feedback Tags:{Tags}</h6>
                </div>
              </div>
            </li>
          </>
          );
    }
    export default CardComponent;