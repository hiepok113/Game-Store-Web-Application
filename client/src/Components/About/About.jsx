import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1>About Our Game Store</h1>
        <p>Welcome to our game store, where gaming meets excellence!</p>

        <h2>Our Mission</h2>
        <p>At Our Game Store, our mission is to provide gamers with the best possible gaming experience by offering a wide selection of games, excellent customer service, and competitive prices.</p>

        <h2>Why Choose Us?</h2>
        <ul>
          <li>Extensive Collection: We offer a diverse range of games from various genres and platforms.</li>
          <li>Great Deals: Enjoy competitive prices and frequent discounts on popular titles.</li>
          <li>Customer Satisfaction: We prioritize customer satisfaction and aim to exceed your expectations.</li>
          <li>Secure Transactions: Your payments and personal information are always secure with us.</li>
        </ul>
        
        <h2>Contact Us</h2>
        <p>If you have any questions or feedback, please don't hesitate to contact us:</p>
        <ul>
          <li>Email: <a href="mailto:spicygame@gmail.com">spicygame@gmail.com</a></li>
          <li>Phone: <a href="tel:+11234567890">+1 (123) 456-7890</a></li>
          <li>Address: 123 Game Street, Gaming City, GameLand</li>
        </ul>

        <div className="contact-buttons">
          <button onClick={() => window.location.href = 'tel:+11234567890'}>Call Us</button>
          <button onClick={() => window.location.href = 'https://www.facebook.com/duy.nguyenquoc.9277'}>Visit Us on Facebook</button>
          
        </div>
      </div>
    </div>
  );
};
export default About;
