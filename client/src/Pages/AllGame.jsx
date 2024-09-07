import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import AllGameComponent from '../Components/Game/AllGameComponent'
import Body from '../Components/Body/Body'
import Footer from '../Components/Footer/Footer'
import Header from '../Components/Header/Header'
class AllGame extends React.Component {
    render(){
        return(
            <div>
                <Navbar/>
                <Header/>

                <Body/>
                
                <AllGameComponent/>
                <Footer/>
            </div>
        )

    
}
}
export default AllGame