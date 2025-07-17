import React, { useEffect, useState } from 'react';
import './Checkout.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Checkout = () => {
  const { gameId } = useParams();
  const [game, setGame] = useState({});
  const bankAccount = {
    name: 'Nguyen Quoc Duy',
    number: '300599991',
    bank: 'VIB'
  };

  const [paymentMethod, setPaymentMethod] = useState('banking');
  const [userAccountNumber, setUserAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiration, setExpiration] = useState('');
  const [cvv, setCvv] = useState('');
  const transactionMessage = `Thanh toan game ${Math.random().toString(36).substring(7)}`;

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/game/${gameId}`)
      .then(response => setGame(response.data))
      .catch(error => console.error('Error fetching game details:', error));
  }, [gameId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (paymentMethod === 'banking') {
      alert(`Check out success. Your banking number is ${userAccountNumber} with ${game.price} VND`);
      navigate('/');
      window.location.reload();
    } else {
      alert(`Check out success. Your credit card number is ${cardNumber} with ${game.price} VND`);
      navigate('/');
      window.location.reload();
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="order-item">
            <img src={game.image} alt={game.title} />
            <div>
              <p>{game.title}</p>
              <p>{game.price} VNĐ</p>
            </div>
          </div>
          <div className="order-total">
            <p>Total</p>
            <p>{game.price} VNĐ</p>
          </div>
        </div>
        <div className="payment-method">
          <h2>Payment Method</h2>
          <div className="payment-options">
            <label>
              <input
                type="radio"
                value="banking"
                checked={paymentMethod === 'banking'}
                onChange={() => setPaymentMethod('banking')}
              />
              Banking
            </label>
            <label>
              <input
                type="radio"
                value="creditcard"
                checked={paymentMethod === 'creditcard'}
                onChange={() => setPaymentMethod('creditcard')}
              />
              Credit Card
            </label>
          </div>
          {paymentMethod === 'banking' ? (
            <div className="bank-details">
              <h3>Bank Transfer</h3>
              <p>Chủ tài khoản: {bankAccount.name}</p>
              <p>Số tài khoản: {bankAccount.number}</p>
              <p>Ngân hàng: {bankAccount.bank}</p>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Số tài khoản của bạn</label>
                  <input
                    type="text"
                    value={userAccountNumber}
                    onChange={(e) => setUserAccountNumber(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Nội dung chuyển khoản</label>
                  <input
                    type="text"
                    value={transactionMessage}
                    readOnly
                  />
                </div>
                <p className="terms-text">
                  By clicking "Place Order" below, I represent that I am over 18 and an authorized user of this payment method, I agree to the <a href="#">End User License Agreement</a>.
                </p>
                <button type="submit" className="btn-place-order">Place Order</button>
              </form>
            </div>
          ) : (
            <div className="credit-card-details">
              <h3>Credit Card</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Expiration Date</label>
                  <input
                    type="text"
                    value={expiration}
                    onChange={(e) => setExpiration(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>CVV</label>
                  <input
                    type="text"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    required
                  />
                </div>
                <p className="terms-text">
                  By clicking "Place Order" below, I represent that I am over 18 and an authorized user of this payment method, I agree to the <a href="#">End User License Agreement</a>.
                </p>
                <button type="submit" className="btn-place-order">Place Order</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
