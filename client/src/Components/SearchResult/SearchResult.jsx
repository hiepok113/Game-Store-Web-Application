import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SearchResult = ({ searchResult }) => {
    return (
        <div className="search-results">
            <h4>Search Results:</h4>
            <ul>
                {searchResult.data.map(game => (
                    <li key={game._id}>
                        <Link to={`/allgame/${game._id}`}>{game.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchResult;
