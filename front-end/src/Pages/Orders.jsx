import React, { useEffect, useState } from "react";
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
function Orders({ userId }) {
  const [orderItems, setOrderItems] = useState([]);
  useEffect(() => {
    const fetchOrderItems = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/orders/${userId}`
      );

      setOrderItems(response.data.orders);
    };
    fetchOrderItems();
  }, [userId]);
  return (
    <div className="Orders">
      <Container maxWidth={0}>
        <Grid container spacing={3} style={{ marginTop: "20px" }}>
          {orderItems.map((item, index) => {
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
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ display: "flex", flexDirection: "column" }}
                    >
                      Quantity: {item.quantity}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default Orders;
