import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCartItems, addToCart, removeFromCart } from "../Redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
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
import { fetchProd } from "../Redux/FetchProductSlice";
const Cart = ({ userId }) => {
  const apiData = useSelector((state) => state.AllProducts);

 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = Object.entries(useSelector((state) => state.cart.items));
  useEffect(() => {
    dispatch(fetchProd());
  }, [dispatch, apiData.length]);
  useEffect(() => {
    if (userId) {
      dispatch(fetchCartItems(userId));
    }
  }, [userId]); 

  const filteredItems = cartItems.map(([product_id, quantity]) => {
    const product = apiData.find((p) => p.id === parseInt(product_id));
    return {
      product_id: parseInt(product_id),
      quantity,
      product,
    };
  });
 
  const handleAddToCart = (productId) => {
    dispatch(addToCart({ productId, userId }));
  };
  const placeOrder = async () => {
    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/cartitems/place_order`, {
      user_id: userId,
    });
    // navigate("/shop"); 
  };
  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart({ productId, userId }));
  };

  const totalAmount = filteredItems.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  return (
    <div className="cart">
      <Container maxWidth={0}>
        <Grid container spacing={3} style={{ marginTop: "20px" }}>
          {filteredItems.map((item, index) => {
            
            const { id, image, title, price } = item.product;

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
                    >
                      $ {price}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <div className="countHandler">
                      <Button onClick={() => handleRemoveFromCart(id)}>
                        -
                      </Button>

                      <input value={item.quantity} />
                      <Button onClick={() => handleAddToCart(id)}>+</Button>
                    </div>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        <div className="total">
          <h2>Total Amount: $ {totalAmount.toFixed(2)}</h2>
        </div>
        <div className="BuyNow">
          <button onClick={placeOrder}>Place Order</button>
        </div>
      </Container>
    </div>
  );
};

export default Cart;
