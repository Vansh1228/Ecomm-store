import * as React from "react";

import { Link } from "react-router-dom";
import { addToCart } from "../Redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";

export const ImgMediaCard = ({data, userId}) => {

  const cartItems = useSelector((state) => state.cart);
  const fetchStoredItemIds = Object.keys(cartItems);

  const dispatch = useDispatch();

  const handleOnCLick = (productId)=>{
    dispatch(addToCart({ productId, userId }));
  }
  

  const { id, image, title, price } = data;
  const currentItemId = fetchStoredItemIds.includes(id.toString());
 


  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardMedia component="img" alt={title} height="80%" image={image} />
      <CardContent
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Typography
          gutterBottom
          variant="h5"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ display: "flex", flexDirection: "column" }}
        >
          $ {price}
        </Typography>
      </CardContent>
      <CardActions>
        {currentItemId ? (
          <Link to={`/cartitems/${userId}`}>Go to Cart</Link>
        ) : (
          <Button onClick={()=> handleOnCLick(id)}> Add to cart</Button>
        )}

        <Link to={`/view/${id}`}>View</Link>
      </CardActions>
    </Card>
  );
};
