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

export const ImgMediaCard = (props) => {
  const cartItems = useSelector((state) => state.cart);
  const itemKeys = Object.keys(cartItems);
  const dispatch = useDispatch();

  const handleOnCLick = () => {
    dispatch(addToCart(props.data.id));
  };

  const { id, image, title, price } = props.data;

  return (
    <>
      <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <CardMedia
          component="img"
          alt={title}
          height=""
          image={image}
          style={{
            margin: "auto",
            maxwidth: "100%",
            height: "auto",
            alignItems: "center",
          }}
        />
        <CardContent
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
            flexGrow: 1,
          }}
        >
          <Typography gutterBottom variant="h5">
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{ display: "flex", alignItems: "center", margin: "auto" }}
          >
            $ {price}
          </Typography>
        </CardContent>
        <CardActions>
          {itemKeys.includes(id.toString()) ? (
            <>
              <Link to="/cart">Go to Cart</Link>
            </>
          ) : (
            <>
              <Button onClick={handleOnCLick}> Add to cart</Button>
            </>
          )}

          <Link to={`/product/${id}`}>View</Link>
        </CardActions>
      </Card>
    </>
  );
};
