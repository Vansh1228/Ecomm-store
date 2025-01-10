import React,{ useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,

} from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
function ViewProduct() {
  const [viewProduct, setVIewProduct] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchViewProduct = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/viewproduct/${id}`
      );

      setVIewProduct(response.data);
    };
    fetchViewProduct();
  }, [id]);
  
  if (!viewProduct) {
    return <div>Loading...</div>;
  }
  const { image, title, price, description } = viewProduct;

  return (
    <div
    
      className="cart"
      style={{
        position: "relative",
        width: "400px",
        height: "400px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Card>
        <CardMedia
          component="img"
          alt={title}
          height=""
          image={image}
          style={{
            margin: "auto",
            maxWidth: "100%",
            height: "auto",
            alignItems: "center",
          }}
        />
        Loading...
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ViewProduct;
