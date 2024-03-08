import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { addToCart } from "../Redux/cartSlice";
import { useDispatch } from "react-redux";
import { indiProd } from "../Redux/indiProd";

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";

export const ImgMediaCard = (props) => {
  const [inCart, setIncart] = useState(false);

  const dispatch = useDispatch();
  const handleOnCLick = () => {
    setIncart(true);
    if (inCart) {
    } else {
      dispatch(addToCart(props));
    }
  };

  const handleView = (productId) => {
    return dispatch(indiProd(productId));
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
          <Button onClick={handleOnCLick} size="small">
            {inCart ? (
              <>
                <Link to="/cart">Go to Cart</Link>
              </>
            ) : (
              "Add to cart"
            )}
          </Button>
          <Link to={`/product/${id}`} onClick={() => handleView(id)}>
            View
          </Link>
        </CardActions>
      </Card>
    </>
  );
};
