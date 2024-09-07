import React, { useEffect, useState } from 'react';
import './GameDetailPage.css';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const GameDetailPage = () => {
  const { id } = useParams();
  const [game, setGame] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/game/${id}`);
        setGame(response.data);
      } catch (error) {
        console.error('Error fetching game:', error);
      }
    };

    fetchGame();

    return () => {
      setGame({})
    };
  }, [id]);

  const handleBuyNow = () => {
    navigate(`/checkout/${id}`);
  };

  const formatPrice = (price) => {
    if (!price) return '';

    if (price === 0) return 'FREE';
    return price.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ',') +' VNĐ';
  };


  return (
    <div className="container">
      <div className="main-content">
        <header className="header">
          <div className="user-options">
          </div>
        </header>
        <div className="content-wrapper">
          <div className="game-details">
            <h1 className="game-title">{game.title}</h1>
            <div className="rating">{game.rating}/10</div>
            <div className="features">
              <span className="feature">{game.feature}</span>
            </div>
            <div className="tabs">
              <button className="tab">Overview</button>
            </div>
            <div className="image-carousel">
              <Carousel>
                <div>
                  <img src={game.image} alt="Screenshot 1" />
                </div>
              </Carousel>
            </div>
            <div className="about-game">
              <h2>About this game</h2>
              <img src={game.image} alt="About the game" />
              <p className="description">
                {game.description}
              </p>
            </div>
            <div className="system-requirements">
              <h2>System Requirements</h2>
              <div className="requirements">
                <div className="minimum">
                  <h3>MINIMUM:</h3>
                  <ul>
                    <li>Requires a 64-bit processor and operating system</li>
                    <li>OS: Windows 10</li>
                    <li>Processor: INTEL CORE I5-8400 or AMD RYZEN 3 3300X</li>
                    <li>Memory: 12 GB RAM</li>
                    <li>Graphics: NVIDIA GEFORCE GTX 1060 3 GB or AMD RADEON RX 580 4 GB</li>
                    <li>DirectX: Version 12</li>
                    <li>Storage: 60 GB available space</li>
                    <li>Sound Card: Windows Compatible Audio Device</li>
                  </ul>
                </div>
                <div className="recommended">
                  <h3>RECOMMENDED:</h3>
                  <ul>
                    <li>Requires a 64-bit processor and operating system</li>
                    <li>OS: Windows 10/11</li>
                    <li>Processor: INTEL CORE I7-8700K or AMD RYZEN 5 3600X</li>
                    <li>Memory: 16 GB RAM</li>
                    <li>Graphics: NVIDIA GEFORCE GTX 1070 8 GB or AMD RADEON RX VEGA 56 8 GB</li>
                    <li>DirectX: Version 12</li>
                    <li>Storage: 60 GB available space</li>
                    <li>Sound Card: Windows Compatible Audio Device</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <aside className="purchase-info">
            <img src={game.logo} alt="Logo" className="game-logo" />
            <div className="purchase-buttons">
              <button className="buy-button" onClick={handleBuyNow}>Buy Now</button>
            </div>
            <div className="price">{formatPrice(game.price)}</div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default GameDetailPage;
