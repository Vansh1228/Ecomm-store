import * as React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid,
  Container,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

const theme = createTheme({
  components: {
    MuiStack: {
      defaultProps: {
        useFlexGap: true,
      },
    },
  },
});

export const ImgMediaCard = (props) => {
  const { image, title, price } = props.data;
  return (
    <>
      
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardMedia component="img" alt={title} height="" image={image} style={{ margin: 'auto', maxwidth: '100%', height: 'auto', alignItems: 'center' }} />
            <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' ,flexGrow: 1  }}>
              <Typography gutterBottom variant="h5">
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary" style={{display:'flex', alignItems:'center', margin:'auto'}}>
                $ {price}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Add to Cart</Button>
              <Button size="small">View</Button>
            </CardActions>
          </Card>
      
    </>

    // <Card sx={{ maxWidth: 345 }}>
    //   <CardMedia
    //     component="img"
    //     alt="green iguana"
    //     height="140"
    //     image={image}
    //   />
    //   <CardContent>
    //     <Typography gutterBottom variant="h5" component="div">
    //     {title}
    //     </Typography>
    //     <Typography variant="body2" color="text.secondary">
    //       $ {price}
    //     </Typography>
    //   </CardContent>
    //   <CardActions>
    //     <Button size="small">Add to Cart</Button>
    //     <Button size="small">Buy Now</Button>
    //   </CardActions>
    // </Card>
  );
};
