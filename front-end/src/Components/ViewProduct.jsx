import React from "react";
import { useState, useEffect } from "react";
import { fetchProd } from "../Redux/FetchProductSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Container,
} from "@mui/material";
import { useParams } from "react-router-dom";
function ViewProduct() {
  const [viewProduct, setVIewProduct] = useState([]);
  const { id } = useParams();

  const dispatch = useDispatch();
  const apiData = useSelector((state) => state.AllProducts);

  useEffect(() => {
    dispatch(fetchProd());

    const myProduct = apiData.filter((prod) => prod.id == id);

    setVIewProduct(myProduct[0]);
  }, [dispatch, apiData.length]);

  if (!viewProduct) {
    return <div>Loading...</div>;
  }
  const { image, title, price, description, rating } = viewProduct;
  return (
  
      <div className="cart">
        <Container style={{ width: "400px", height: "400px" }}>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Card >
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
                <Typography gutterBottom variant="">
                  {description}
                </Typography>

                <div
                  className="cardContent"
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    marginTop: "5px",
                    fontSize: "25px",
                  }}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    style={{
                      fontSize: "25px",
                    }}
                  >
                    $ {price}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="h5"
                    style={{
                      fontSize: "18px",
                    }}
                  >
                    {/* User ratings: {rating.rate} */}
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Container>
      </div>
    
  );
}

export default ViewProduct;
