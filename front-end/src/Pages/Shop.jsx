import { useState, useEffect } from "react";
// import "./Shop.css";
import axios from "axios";

import { ImgMediaCard } from "../Components/Card";
import { Grid, Container, ListItem } from "@mui/material";
import { Link } from "react-router-dom";
import { fetchProd } from "../Redux/FetchProductSlice";

import { useDispatch, useSelector } from "react-redux";

function Shop() {
  const [data, setData] = useState([]);

  const [shopDet, setShopDet] = useState([]);
  const [categories, setCategories] = useState([]);

  const [indiCatgs, setIndiCatgs] = useState([]);

  const apiData = useSelector((state) => state.fetchProd); //Fetching API Data from Redux Store
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProd());
  }, [dispatch]);

  useEffect(() => {
    const filteredItems = apiData.filter((product) => {
      return indiCatgs.includes(product.category);
    });

    if (indiCatgs.length > 0) {
      setData(filteredItems);
    } else {
      setData(apiData); // Reset data to original apiData
    }
  }, [apiData, indiCatgs]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("http://localhost:3000/");
      const data = await result.json();
      setShopDet(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const result = await fetch(
        "https://fakestoreapi.com/products/categories"
      );
      const dataCategories = await result.json();

      setCategories(dataCategories);
    };
    fetchCategories();
  }, []);

  const handleCategory = (event, myCategory) => {
    console.log(event.target.checked);
    if (event.target.checked) {
      // Add category to the list
      setIndiCatgs((prevCatgs) => [...prevCatgs, myCategory]);
    } else {
      // Remove category from the list
      setIndiCatgs((prevCatgs) =>
        prevCatgs.filter((cat) => cat !== myCategory)
      );
    }
  };

  return (
    <>
      <Link to="/shop">
        <div className="box">
          <div className="shop">
            <div className="shopTitle"></div>
            {shopDet.map((dummy) => (
              <>
                <h1>{dummy.AppName}</h1>
                <img src={dummy.logo} alt="" className="logo" />
              </>
            ))}
          </div>
          <Link to="/cart">
            <div className="cart">Cart</div>
          </Link>
        </div>

        <div>
          <section className="filter">
            {categories.map((catgs) => {
              return (
                <>
                  <input
                    type="checkbox"
                    checked={indiCatgs.includes(catgs)}
                    onChange={(event) => handleCategory(event, catgs)}
                  />
                  <label>{catgs}</label>
                </>
              );
            })}
          </section>
        </div>
        <div className="products">
          <Container>
            <Grid container spacing={2} style={{ marginTop: "20px" }}>
              {data.map((product, index) => {
                return (
                  <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={index}>
                    <ImgMediaCard data={product} />
                  </Grid>
                );
              })}
            </Grid>
          </Container>
        </div>
      </Link>
    </>
  );
}

export default Shop;
