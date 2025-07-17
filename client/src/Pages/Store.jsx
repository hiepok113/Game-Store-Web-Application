import React from 'react'
import Body from '../Components/Body/Body'
import Onsale from '../Components/OnSale/Onsale'
import Category from '../Components/Category/Category'
import Newest from '../Components/Newest/Newest'
import Card from '../Components/Card/Card'
import Footer from '../Components/Footer/Footer'
import Navbar from '../Components/Navbar/Navbar'
import Header from '../Components/Header/Header'



const Store =() => {
  
        return(
            <div>
                 <Navbar/>
                 <Header/>
                 <Body/>
                 <Onsale/>
                 <Category/>
                 <Newest/>
                 <Card/>
                 <Footer/>
            </div>
        )
    
}

export default Store