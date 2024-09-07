import React from "react";
import './Newest.css'
import newest from '../Asset/newest'
import Item from "../Item/Item";


const Newest = ()=>{
    return(
        <div className='newest'>
            <h1>NEWEST</h1><hr/>
            <div className="newest-item">
                {newest.map((item,i)=>{
                    return <Item key={i} id={item.id} name={item.name} image={item.img} new_price={item.new_price} old_price={item.old_price}/>
                })}

            </div>

        </div>
    )



}
export default Newest