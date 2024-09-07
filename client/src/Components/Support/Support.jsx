import React from 'react';
import './Support.css';

const Support = () => {
  return (
    <div className="support-container">
      <div className="background-shapes"></div>
      <div className="support-content">
        <h1>Support Center</h1>

        <section className="support-section">
          <h2>Account Support</h2>
          <p>Need help with your account? Here's how we can assist:</p>
          <ul>
            <li><strong>How to Create an Account:</strong> Learn how to sign up for an account on our platform.</li>
            <li><strong>Account Management:</strong> Update your profile, change passwords, and manage subscriptions.</li>
            <li><strong>Troubleshooting:</strong> Issues accessing your account or logging in.</li>
          </ul>
        </section>

        <section className="support-section">
          <h2>Order and Payment Support</h2>
          <p>Questions about orders or payments? Check out our support options:</p>
          <ul>
            <li><strong>Placing Orders:</strong> How to purchase games and manage your shopping cart.</li>
            <li><strong>Payment Methods:</strong> Accepted payment options and how to update billing information.</li>
            <li><strong>Refunds and Returns:</strong> Policies and procedures for refunds and cancellations.</li>
          </ul>
        </section>

        <section className="support-section">
          <h2>Technical Support</h2>
          <p>Encountering technical issues? Here are some resources to help:</p>
          <ul>
            <li><strong>Installation Guides:</strong> Step-by-step instructions for installing and configuring games.</li>
            <li><strong>Troubleshooting:</strong> Common issues such as connection problems or performance issues.</li>
            <li><strong>Developer Support:</strong> Links to game developer support for more specific technical issues.</li>
          </ul>
        </section>

        <section className="support-section">
          <h2>FAQs</h2>
          <p>Find answers to common questions:</p>
          <ul>
            <li><strong>General FAQs:</strong> Frequently asked questions about our services and products.</li>
            <li><strong>Game-Specific FAQs:</strong> Answers related to popular games and their functionalities.</li>
          </ul>
        </section>

        <section className="support-section">
          <h2>Contact Us</h2>
          <p>Still need assistance? Contact us:</p>
          <ul>
            <li>Email: <a href="mailto:spicygame@gmail.com">support@gamestore.com</a></li>
            <li>Phone: <a href="tel:+1234567890">+1 (234) 567-890</a></li>
            <li>Address: 123 Game Street, Gaming City, GameLand</li>
          </ul>
          <p>Our support team is available Monday through Saturday, 9 AM to 5 PM (EST).</p>
        </section>
      </div>
    </div>
  );
};

export default Support;
