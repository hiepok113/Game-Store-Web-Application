import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import CategoryDetailPage from '../Components/CategoryDetailPage/CategoryDetailPage'
import Header from '../Components/Header/Header'


class CategoryDetail extends React.Component {
    render() {
        return (
            <div>
                <Navbar />
                <Header />
                <CategoryDetailPage />
            </div>
        )


    }
}
export default CategoryDetail