import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {ImgMediaCard} from "../Components/Card"

 <ImgMediaCard></ImgMediaCard>
function Products(props) {
    const {image, title, price} = props.data
  return (
    <>
     <ImgMediaCard/>
     
      <div className="product">
          <img src={image} alt="" />
          <div className="descp">
            <p>
              <b>{title}</b>
            </p>
            <p>$ {price}</p>
            <button className="addToCartBttn" onClick={() => addToCart(id)}>
              Add to Cart <br />
              {/* {cartItemAmount > 0 && <>{cartItemAmount}</>} */}
            </button>
          </div>
        </div>
    </>
  )
}

export default Products