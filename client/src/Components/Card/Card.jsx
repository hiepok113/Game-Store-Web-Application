import React from "react";
import './Card.css';
import card from '../Asset/card'; // Ensure this is the correct path to your data

const Card = () => {
  return (
    <div className='card-container'>
      {card.map((item, i) => (
        <div key={i} className="card">
          <img src={item.img} alt={item.name} className="card-image" />
          <h2 className="card-title">{item.name}</h2>
          <p className="card-description">{item.des}</p>
          <button className="card-button">{item.id === 1 ? 'FREE' : 'Browse'}</button>
        </div>
      ))}
    </div>
  );
}

export default Card;
