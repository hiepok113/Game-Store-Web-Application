import React, { useEffect, useState } from 'react';
import './MyCart.css';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { addCart, deleteCart, getCart, selectCart } from '../../redux/slice/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/slice/userSlice';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const MyCart = () => {
  const dispatch = useDispatch();
  const [cartGame, setCartGame] = useState([]);

  const user = useSelector(selectUser);

  const cart = useSelector(selectCart);
  let userid = null;
  if (user) {
    userid = user.id;
  } else if (!user) {

  }

  const fetchCarts = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/cart/${userid}`);
      response.data.map((item, index) => {
        fetchGameCart(item.gameId)
      })
      return () => {
        setCartGame([]);
      };
    } catch (error) {
      console.error('Error fetching carts:', error);
    }
  };

  useEffect(() => {
    fetchCarts();
  }, []);

  const fetchGameCart = async (gameId) => {
    try {
      const response = await axios.get(`http://localhost:3001/game/${gameId}`);
      setCartGame(prevCartGame => [...prevCartGame, response.data]);

    } catch (error) {
      console.error('Error fetching carts:', error);
    };
  };

  const handleDelete = async (game) => {
    try {
      let userId = null;
      if (user) {
        userId = user.id;
      }
      const gameId = game;
      const result = await axios.delete(`http://localhost:3001/delete-cart/${userId}/${gameId}`)
      if (result.status === 200) {
        alert('Delete success')
        window.location.reload();
        setCartGame([]);
      }
    } catch (e) {
      alert(e.response.data.error);
    }
  };

  let total = 0;
  cartGame.map(game => {
    total += game.price;
  })


  return (
    <div className="my-cart">
      <div className='my-cart-content'>
        <h1>Cart</h1>
        <div className='cart-game-container'>
          {
            cartGame.map(game => {
              return (
                <div className='cart-game-item'>
                  <img src={game.image} alt="" />
                  <div className='cart-game-info'>
                    <span className='cart-game-title'>{game.title}</span>
                    {
                      game.price === 0
                        ?
                        <span className='cart-game-price'>Free</span>
                        :
                        <span className='cart-game-price'>{game.price} VND</span>
                    }
                  </div>
                  <FontAwesomeIcon onClick={() => handleDelete(game._id)} icon={faTrashCan} />
                </div>
              )
            })
          }
        </div>
        <div className='button-checkout-container'>
          <span>Total: <span className='total-text'>{total} VNĐ</span> </span>
          <Link to='/checkout'>Checkout</Link>
        </div>
      </div>
    </div>
  );
};

export default MyCart;
