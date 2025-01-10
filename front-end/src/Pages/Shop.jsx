import { useState, useEffect } from "react";

import { Badge, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { ImgMediaCard } from "../Components/Card";
import { Grid, Container } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchProd } from "../Redux/FetchProductSlice";
import { useDispatch, useSelector } from "react-redux";

function Shop({userId}) {
  const [data, setData] = useState([]);
  
  const [shopDet, setShopDet] = useState([]);
  const [categories, setCategories] = useState([]);

  const [indiCatgs, setIndiCatgs] = useState([]);
  const cartItems = useSelector((state) => state.cart);
  const apiData = useSelector((state) => state.AllProducts); //Fetching API Data from Redux Store
  const dispatch = useDispatch();
  const handleLogOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("userToken");
    navigate("/login");
  };
  useEffect(() => {
    dispatch(fetchProd());
  }, [dispatch, apiData.length]);
  useEffect(() => {
    //Theme config
    const fetchData = async () => { 
      try {
        const result = await fetch("http://localhost:3000/");
        const data = await result.json();
        setShopDet(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
// Categories
    const fetchCategories = async () => {
      try {
        const categoriesResult = await fetch(
          "https://fakestoreapi.com/products/categories"
        );
        const dataCategories = await categoriesResult.json();
        setCategories(dataCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
    fetchData();

    const filteredItems = apiData.filter((product) => {
      return indiCatgs.includes(product.category);
    });
    indiCatgs.length > 0 ? setData(filteredItems) : setData(apiData);
  }, [ apiData.length]);

  const handleCategory = (event, myCategory) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      // Add category to the list
      setIndiCatgs((prevCatgs) => [...prevCatgs, myCategory]);
    } else {
      // Remove category from the list
      setIndiCatgs((prevCatgs) =>
        prevCatgs.filter((cat) => cat !== myCategory)
      );
    }
  };
  const CartItemsLength = Object.keys(cartItems).length;
  const handleCartClick = () => {
    if (CartItemsLength === 0) {
      alert("Cart is empty!");
    }
  };
  const navigate = useNavigate();


  return (
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
        <Link to={`/cartitems/${userId}`}>
          <div className="cart">
            <IconButton onClick={handleCartClick} color="error">
              <Badge badgeContent={CartItemsLength} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </div>
        </Link>
        <button onClick={handleLogOut}>Logout</button>
        <Link to = {`/orders/${userId}`} >My Orders</Link>
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
        {console.log('SHOP ID', userId)}
        <Container maxWidth={false}>
          <Grid container spacing={3} style={{ marginTop: "20px" }}>
            {data.map((product, index) => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={index}>
                  <ImgMediaCard data={product} userId = {userId} />
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </div>
    </Link>
  );
}

export default Shop;
