import { useDispatch, useSelector } from "react-redux";
import { Grid, Container } from "@mui/material";
import { fetchProd } from "../Redux/FetchProductSlice";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
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
  const [isEmpty, setIsEmpty] = useState(false);
  useEffect(() => {
    length ? setIsEmpty(true) : setIsEmpty(false);
    
    if (isEmpty || !filteredItems) {
      // Redirect to the shop page if the cart is empty
      navigate("/shop");
    } else {
      dispatch(fetchProd());
    }
  }, [apiData.length, dispatch, isEmpty, filteredItems.length]);

  return (
    <div className="cart">
      <Container>
        <Grid container spacing={2} style={{ marginTop: "20px" }}>
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
                      <button
                        onClick={() => dispatch(removeFromCart(product.id))}
                      >
                        -
                      </button>

                      <input value={storedCartItems[id]} />
                      <button onClick={() => dispatch(addToCart(product.id))}>
                        +
                      </button>
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
