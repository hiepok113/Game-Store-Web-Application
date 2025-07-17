import React, { useEffect, useState } from 'react';
import './AllGameComponent.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectSearch, searchRemove } from '../../redux/slice/searchSlice';
import { selectUser } from '../../redux/slice/userSlice';
import { getCart } from '../../redux/slice/cartSlice';

const AllGameComponent = () => {
    const [games, setGames] = useState([]);
    const [search, setSearch] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const gamesPerPage = 8;

    const user = useSelector(selectUser);

    const navigate = useNavigate();
    const searchQuery = useSelector(selectSearch);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await axios.get('http://localhost:3001/game');
                setGames(response.data);
            } catch (error) {
                console.error('Error fetching games:', error);
            }
        };

        fetchGames();
    }, []);

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/search?title=${encodeURIComponent(searchQuery)}`);
                setSearch(response.data);
            } catch (error) {
                console.error('Error searching games:', error);
            }
        };

        if (searchQuery) {
            fetchSearchResults();
            dispatch(searchRemove());
        }
        return () => {
            dispatch(searchRemove())
        };
    }, [searchQuery]);

    const handleAddToCart = async (game) => {
        if (!user) {
            navigate('/login');
        }
        else{
            try {
                let userId;
                if (user) {
                    userId = user.id;
                }
                const result = await axios.post('http://localhost:3001/add-cart', { userId: user.id, gameId: game })
                if (result.status === 200) {
                    alert('Add to cart success')
                }
    
                const response = await axios.get(`http://localhost:3001/cart/${userId}`);
                dispatch(getCart(response.data));
            } catch (e) {
                alert(e.response.data.error);
            }

        }
       
    };

    const handleBuyNow = (gameId) => {
        navigate(`/checkout/${gameId}`);
    };

    const handleGameDetail = (gameId) => {
        navigate(`/allgame/${gameId}`);
        window.location.reload();
    };

    const handleNextPage = () => {
        if (currentPage < Math.ceil(games.length / gamesPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);


    return (
        <div className="game-list">
            {Object.keys(search).length !== 0
                ?
                <div className='game-item-container'>
                    {search.map(game => (
                        <div className="game-item" key={game._id} onClick={() => handleGameDetail(game._id)}>
                            <img src={game.image} alt={game.title} className="game-image" />
                            <div className="game-info">
                                <h3 className="game-title">{game.title}</h3>
                                <p className="game-category">{game.category}</p>
                                <p className="game-price">{game.price === 0 ? 'FREE' : `${(game.price ?? 0).toFixed(3)} VNĐ`}</p>
                                <div className="game-actions">
                                    <button className="btn add-to-cart" onClick={(e) => { e.stopPropagation(); handleAddToCart(game); }}>Add to Cart</button>
                                    <button className="btn buy-now" onClick={(e) => { e.stopPropagation(); handleBuyNow(game._id); }}>Buy Now</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                :
                <div className='game-item-container'>
                    {currentGames.map(game => (
                        <div className="game-item" key={game._id} onClick={() => handleGameDetail(game._id)}>
                            <img src={game.image} alt={game.title} className="game-image" />
                            <div className="game-info">
                                <h3 className="game-title">{game.title}</h3>
                                <p className="game-category">{game.category}</p>
                                <p className="game-price">{game.price === 0 ? 'FREE' : `${(game.price ?? 0).toFixed(3)} VNĐ`}</p>
                                <div className="game-actions">
                                    <button className="btn add-to-cart" onClick={(e) => { e.stopPropagation(); handleAddToCart(game._id); }}>Add to Cart</button>
                                    <button className="btn buy-now" onClick={(e) => { e.stopPropagation(); handleBuyNow(game._id); }}>Buy Now</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            }

            <div className="pagination">
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
                <span>Page {currentPage} of {Math.ceil(games.length / gamesPerPage)}</span>
                <button onClick={handleNextPage} disabled={currentPage === Math.ceil(games.length / gamesPerPage)}>Next</button>
            </div>
        </div>
    );
};

export default AllGameComponent;
