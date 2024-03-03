import { useState, useEffect } from "react";
// import "./Shop.css";
import axios from "axios";
import Products from "./Products";
import ThemeConfig from "../ThemeConfig";
import { ImgMediaCard } from "../Components/Card";
import { Grid, Container, ListItem } from "@mui/material";
import { Link } from "react-router-dom";
// import { makeStyles } from '@material-ui/core/styles';

function Shop() {
  const [items, setItems] = useState([]);
  const [shopDet, setShopDet] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        let apiData = res.data;
        //console.log(apiData);
        setItems(apiData);
      })
      .catch((rej) => {
        console.log(rej);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("http://localhost:3000/");
      const data = await result.json();
      setShopDet(data);
      //   console.log(items);
    };

    fetchData();
  }, []);

  return (
    <>
      <Link to="/shop">
        <div className="shop">
          <div className="shopTitle"></div>
          {shopDet.map((dummy) => (
            <>
              <h1>{dummy.AppName}</h1>
              <img src={dummy.logo} alt="" className="logo" />
            </>
          ))}

          <div className="products">
            <Container>
              <Grid container spacing={2} style={{ marginTop: "20px" }}>
                {items.map((product, index) => {
                  return (
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={index}>
                      <ImgMediaCard data={product} />
                    </Grid>
                  );
                })}
              </Grid>
            </Container>
          </div>
        </div>
      </Link>
    </>
  );
}

export default Shop;
