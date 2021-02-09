import React, { Component } from "react";
import './Card.css';
import CardItem from './CardItem';

class Card extends Component {

  Add = (e) => {
    this.props.NavAdd();
  };

  View = (e) => {
    this.props.NavView();
  };

  Delete = (e) => {
    this.props.NavDelete();
  };
  render(){
    const { NavAdd, NavView, NavDelete } = this.props;
    return (
      <div className='cards' style={{backgroundImage: "url(" + "/images/Login_home.jpg"+")", backgroundSize:"cover"}}>
        <h1>CHECK OUT THE FEATURES!!</h1>
        <div className='cards__container'>
          <div className='cards__wrapper'>
            <ul className='cards__items'>
              <div  onClick={() => this.Add()}>
                <CardItem
                  src='/images/Add.jpg'
                  text='Add an image of your medical presciption with the date and we will keep it safe for you with us.'
                  label='Maintain your Documents'
                  
                />
              </div>
              <div  onClick={() => this.View()}>
                <CardItem
                  src='/images/View.jpg'
                  text="View your or any users's document just with an access key."
                  label='View documents just by an access key'
                />
              </div>
              <div  onClick={() => this.Delete()}>
                <CardItem
                  src='/images/Delete.jpg'
                  text='Delete the prescriptions not required or the wrong uploads.'
                  label='Delete the undesired ones'
                />
              </div>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;