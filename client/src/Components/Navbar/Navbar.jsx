import React, { useState, useEffect } from "react";
import './Navbar.css';
import logo from '../Asset/logo.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, logout } from '../../redux/slice/userSlice';
import MyCart from "../MyCart/MyCart";

const Navbar = () => {
    const [cartStatus, setCartStatus] = useState(false);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [activeMenu, setActiveMenu] = useState(location.pathname);

    useEffect(() => {
        setActiveMenu(location.pathname);
    }, [location.pathname]);

    const handleLogout = () => {
        dispatch(logout());
        window.location.reload();
    }

    const handleClickCart = () => {
        if (!user) {
            navigate('/login');
        } else {
            setCartStatus(!cartStatus);
            document.body.style.overflow = cartStatus ? '' : 'hidden';
        }
    }

    return (
        <div className='navbar'>
            <div className="nav-logo">
                <img src={logo} alt="logo" />
                <p>Spicy Games</p>
            </div>
            <ul className="nav-menu">
                <li className={activeMenu === '/' ? 'active' : ''}>
                    <Link to='/' onClick={() => setActiveMenu('/')}>STORE</Link>
                    <hr />
                </li>
                <li className={activeMenu === '/about' ? 'active' : ''}>
                    <Link to='/about' onClick={() => setActiveMenu('/about')}>ABOUT</Link>
                    <hr />
                </li>
                <li className={activeMenu === '/support' ? 'active' : ''}>
                    <Link to='/support' onClick={() => setActiveMenu('/support')}>SUPPORT</Link>
                    <hr />
                </li>
            </ul>
            <div className="nav-login">
                {user && <div>Hello {user.email}</div>}
                {user
                    ? <Link onClick={handleLogout} to='/login'><button>SIGN OUT</button></Link>
                    : <Link to='/login'><button>SIGN IN</button></Link>}
                <FontAwesomeIcon onClick={handleClickCart} icon={cartStatus ? faXmark : faCartShopping} />
            </div>
            {cartStatus && (
                <div className="mycart-container">
                    <MyCart />
                </div>
            )}
        </div>
    );
}

export default Navbar;
