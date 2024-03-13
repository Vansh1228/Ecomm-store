import { useState, useEffect } from "react";

import { Badge, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

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
  const cartItems = useSelector((state) => state.cart);
  const apiData = useSelector((state) => state.AllProducts); //Fetching API Data from Redux Store
  const dispatch = useDispatch();

  const length = Object.keys(cartItems).length;

  useEffect(() => {
    dispatch(fetchProd());

    const fetchData = async () => {
      const result = await fetch("http://localhost:3000/");
      const data = await result.json();
      setShopDet(data);
    };
    const fetchCategories = async () => {
      const categoriesResult = await fetch(
        "https://fakestoreapi.com/products/categories"
      );
      const dataCategories = await categoriesResult.json();

      setCategories(dataCategories);
    };

    fetchCategories();

    fetchData();

    const filteredItems = apiData.filter((product) => {
      return indiCatgs.includes(product.category);
    });

    if (indiCatgs.length > 0) {
      setData(filteredItems);
    } else {
      setData(apiData); // Reset data to original apiData
    }
  }, [cartItems, apiData.length, indiCatgs, dispatch]);

  const handleCategory = (event, myCategory) => {
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

  const handleCartClick = () => {
    if (length === 0) {
      alert("Cart is empty!");
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
            <div className="cart">
              <IconButton onClick={handleCartClick}>
                <Badge badgeContent={length} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </div>
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
