import React from "react";
import './Category.css';
import img1 from '../Asset/role-play.png';
import img2 from '../Asset/adventure.png';
import img3 from '../Asset/Casual.png';
import img4 from '../Asset/stratery.png';
import img5 from '../Asset/sport.png'; 
import img6 from '../Asset/racing.png'; 

const Category = () => {
    return (
        <div className="shop-category">
            <h1>CATEGORY</h1>
            <hr />
            <div className="categories-container">
                <div className="categories">
                    <div className="category">
                        <img src={img1} alt="ROLE PLAY" />
                        
                        <div className="overlay">ROLE PLAY</div>
                    </div>
                    <div className="category">
                        <img src={img2} alt="ADVENTURE" />
                        <div className="overlay">ADVENTURE</div>
                    </div>
                    <div className="category">
                        <img src={img3} alt="CASUAL" />
                        <div className="overlay">CASUAL</div>
                    </div>
                    <div className="category">
                        <img src={img4} alt="STRATERY" />
                        <div className="overlay">STRATERY</div>
                    </div>
                    <div className="category">
                        <img src={img5} alt="SPORT" />
                        <div className="overlay">SPORT</div>
                    </div>
                    <div className="category">
                        <img src={img6} alt="RACING" />
                        <div className="overlay">RACING</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Category;
