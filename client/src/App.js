import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Header from './Components/Header/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StoreCategory from './Pages/StoreCategory';
import Store from './Pages/Store';

import Signin from './Pages/Signin';
import Signup from './Pages/Signup';
import Checkout from './Components/Checkout/Checkout';
import MyCart from './Components/MyCart/MyCart';
import GameDetailPage from './Components/GameDetailPage/GameDetailPage';
import AllGame from './Pages/AllGame';
import Support from './Pages/SupportPage';
import SupportPage from './Pages/SupportPage';
import AboutPage from './Pages/AboutPage';
import GameDetail from './Pages/GameDetail';
import CategoryDetail from './Pages/CategoryDetail';
import CheckoutMany from './Components/CheckoutMany/CheckoutMany';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route path='/' element={<Store />}>
          </Route>
          <Route path='/categories' element={<StoreCategory />} />
          <Route path='/categories/:id' element={<CategoryDetail />} />
          <Route path='/register' element={<Signup />} />
          <Route path='/login' element={<Signin />} />
          <Route path='/allgame' element={<AllGame />} />
          <Route path='/allgame/:id' element={<GameDetail />} />
          <Route path="/checkout/" element={<CheckoutMany />} />
          <Route path="/checkout/:gameId" element={<Checkout />} />
          <Route path="/gamedetailpage/:id" element={<Checkout />} />
          <Route path="/gamedetailpage/:id" element={<MyCart />} />
          <Route path='/support' element={<SupportPage />} />
          <Route path='/about' element={<AboutPage />} />
        </Routes>
        


      </div>
    </BrowserRouter>
  );
}

export default App;
