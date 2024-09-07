import React from "react";
import './Onsale.css'
import Item from "../Item/Item";
import data_product from "../Asset/data";

const Onsale =()=>{
    let data =[];
    data = data_product
    return(
        <div className="onsale">
            <h1>ON SALE</h1><hr/>
            <div className="sale-item">
                {data.map((item,i)=>{
                    return <Item key={i} id={item.id} name={item.name} image={item.img} new_price={item.new_price} old_price={item.old_price}/>
                })}

            </div>
        </div>
    )
}

export default Onsale