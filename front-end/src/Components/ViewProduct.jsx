import React from "react";
import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Container,
} from "@mui/material";

function ViewProduct() {
  const indiData = useSelector((state) => state.indiProd);
  useEffect(() => {
    if (indiData.length === 0) {
      console.log("Data fail: []");
    } else {
      console.log("Data success:", indiData);
    }
  }, [indiData]);

  if (indiData.length === 0) {
    return <div>Loading...</div>;
  }

  const { image, title, price, description, rating } = indiData[0];

  console.log(indiData);
  return (
    <>
      <div className="cart">
        <Container style={{ width: "400px", height: "400px" }}>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Card sx={{}}>
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
                    User ratings: {rating.rate}
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Container>
      </div>
    </>
  );
}

export default ViewProduct;
