import React, { useState, useEffect } from "react";
import './Header.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchGame, searchRemove } from '../../redux/slice/searchSlice';

const Header = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeMenu, setActiveMenu] = useState('/'); 

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const currentPath = location.pathname;

    useEffect(() => {
        setActiveMenu(currentPath);
    }, [currentPath]);

    const handleSearch = async (e) => {
        if (e.key === 'Enter') {
            dispatch(searchGame(searchQuery));
            navigate('/allgame');
            setSearchQuery('');
        }
    };

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleClickMenu = (path) => {
        setActiveMenu(path);
        if (path === '/allgame') {
            dispatch(searchRemove());
            if (currentPath === '/allgame') {
                window.location.reload();
            }
        }
    };

    return (
        <div className='Header'>
            <ul className="Header-menu">
                <Link style={{ textDecoration: 'none' }} to='/' onClick={() => handleClickMenu('/')}>
                    <li className={activeMenu === '/' ? 'active' : ''}>Discover<hr /></li>
                </Link>
                <Link style={{ textDecoration: 'none' }} to='/categories' onClick={() => handleClickMenu('/categories')}>
                    <li className={activeMenu === '/categories' ? 'active' : ''}>Category<hr /></li>
                </Link>
                <Link style={{ textDecoration: 'none' }} to='/allgame' onClick={() => handleClickMenu('/allgame')}>
                    <li className={activeMenu === '/allgame' ? 'active' : ''}>All game<hr /></li>
                </Link>
            </ul>
            <div className='search-box'>
                <input
                    type="text"
                    placeholder='Search'
                    value={searchQuery}
                    onChange={handleInputChange}
                    onKeyDown={handleSearch}
                />
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
        </div>
    );
};

export default Header;
