import { useDispatch, useSelector } from "react-redux";
import { Grid, Container, ListItem } from "@mui/material";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import { addToCart, removeFromCart } from "../Redux/cartSlice";
import { useState } from "react";
const Cart = () => {
  const cartItems = useSelector((state) => state.cart); // Get cart items from the Redux store
  const dispatch = useDispatch(); // Initialize dispatch function
 

  return (
    <div className="cart">
      <Container>
        <Grid container spacing={2} style={{ marginTop: "20px" }}>
          {cartItems.map((product, index) => {
            const { id, image, title, price } = product.data;
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
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
                      style={{
                        display: "flex",
                        alignItems: "center",
                        margin: "auto",
                      }}
                    >
                      $ {price}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <div className="countHandler">
                      <button onClick={() => dispatch(removeFromCart(product))}>
                        -
                      </button>
                      <input value={product.cartQuantity} />
                      <button onClick={() => dispatch(addToCart(product))}>
                        +
                      </button>
                    </div>
                    <Button size="small">View</Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
};

export default Cart;
