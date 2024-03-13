import { useDispatch, useSelector } from "react-redux";
import { fetchProd } from "../Redux/FetchProductSlice";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
  Container,
} from "@mui/material";
import { addToCart, removeFromCart } from "../Redux/cartSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const cartItems = useSelector((state) => state.cart);
  // Get cart items from the Redux store
  const apiData = useSelector((state) => state.AllProducts);

  const dispatch = useDispatch(); // Initialize dispatch function
  const navigate = useNavigate();
  const storedCartItems = JSON.parse(localStorage.getItem("MyCart")) || {};
  const cartItemKeys = Object.keys(storedCartItems);

  const filteredItems = apiData.filter((product) => {
    return cartItemKeys.includes(product.id.toString());
  });
  const totalAmount = filteredItems.reduce((total, product) => {
    const quantity = cartItems[product.id] || 0;

    return total + product.price * quantity;
  }, 0);
  const length = Object.keys(storedCartItems).length === 0;

  useEffect(() => {
    if (length) {
      // Redirect to the shop page if the cart is empty
      navigate("/shop");
    } else {
      dispatch(fetchProd());
    }
  }, [apiData.length, dispatch, length]);
  const increaseItemQuantity = (id) => {
    dispatch(addToCart(id));
  };
  const decreaseItemQuantity = (id) => {
    dispatch(removeFromCart(id));
  };
  return (
    <div className="cart">
      <Container maxWidth={0}>
        <Grid container spacing={3} style={{ marginTop: "20px" }}>
          {filteredItems.map((product, index) => {
            const { id, image, title, price } = product;

            return (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    alt={title}
                    height="80%"
                    image={image}
                  />
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
                      // style={{ display: "flex", alignItems: "center", margin: "auto" }}
                    >
                      $ {price}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <div className="countHandler">
                      <Button onClick={() => decreaseItemQuantity(id)}>
                        -
                      </Button>

                      <input value={storedCartItems[id]} />
                      <Button onClick={() => increaseItemQuantity(id)}>
                        +
                      </Button>
                    </div>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        <div className="total">
          <h2>Total Amount: {totalAmount.toFixed(2)}</h2>
        </div>
      </Container>
    </div>
  );
};

export default Cart;
