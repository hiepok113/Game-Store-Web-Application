import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectCart } from '../../redux/slice/cartSlice';
import { selectUser } from '../../redux/slice/userSlice';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const MyCart = () => {
  const dispatch = useDispatch();
  const [cartGame, setCartGame] = useState([]);
  const user = useSelector(selectUser);
  const cart = useSelector(selectCart);

  const userid = user?.id || null;

  const fetchCarts = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/cart/${userid}`);
      response.data.map((item) => {
        fetchGameCart(item.gameId);
      });
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
      setCartGame(prev => [...prev, response.data]);
    } catch (error) {
      console.error('Error fetching carts:', error);
    }
  };

  const handleDelete = async (gameId) => {
    try {
      const result = await axios.delete(`http://localhost:3001/delete-cart/${userid}/${gameId}`);
      if (result.status === 200) {
        alert('Delete success');
        window.location.reload();
        setCartGame([]);
      }
    } catch (e) {
      alert(e.response.data.error);
    }
  };

  const total = cartGame.reduce((sum, game) => sum + game.price, 0);

  return (
    <div className="w-[400px] h-[calc(90%-75px)] absolute top-[85px] right-[30px] bg-white text-black text-left px-6 py-4 rounded-xl shadow-lg">
      <div className="relative h-full">
        <h1 className="text-2xl font-bold mb-4">Cart</h1>
        <div className="flex flex-col gap-y-7">
          {cartGame.map(game => (
            <div key={game._id} className="relative flex items-center w-full">
              <img src={game.image} alt="" className="w-[50px] h-[50px] object-cover mr-3" />
              <div className="flex flex-col">
                <span className="font-medium">{game.title}</span>
                <span className="text-pink-600">{game.price === 0 ? 'Free' : `${game.price} VND`}</span>
              </div>
              <FontAwesomeIcon
                onClick={() => handleDelete(game._id)}
                icon={faTrashCan}
                className="absolute right-0 text-lg cursor-pointer hover:opacity-50"
              />
            </div>
          ))}
        </div>
        <div className="absolute left-0 bottom-6 w-full px-6 border-t border-gray-300 h-[50px] flex items-center justify-between">
          <span className="text-lg">Total: <span className="font-bold text-pink-700">{total} VNĐ</span></span>
          <Link to="/checkout" className="bg-pink-700 hover:bg-pink-800 text-white font-bold rounded-md px-6 py-3 no-underline">Checkout</Link>
        </div>
      </div>
    </div>
  );
};

export default MyCart;
