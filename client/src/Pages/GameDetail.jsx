import React from 'react'
import GameDetailPage from '../Components/GameDetailPage/GameDetailPage'
import Navbar from '../Components/Navbar/Navbar'
import Header from '../Components/Header/Header'


class GameDetail extends React.Component {
    render() {
        return (
            <div>
                <Navbar />
                <Header />
                <GameDetailPage />
            </div>
        )


    }
}
export default GameDetail