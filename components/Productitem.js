import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import React from "react";
import NextLink from "next/link";
import Rating from "@material-ui/lab/Rating";
import { withStyles } from "@material-ui/styles";

function Productitem({ product, addToCartHandler }) {
  const StyledButton = withStyles({
    root: {
      backgroundColor: "black",
      color: "white",
      "&:hover": {
        backgroundColor: "#54f6ff",
        color: "black",
      },
    },
  })(Button);
  return (
    <div>
      <Card>
        <NextLink href={`/products/${product.slug}`} passHref>
          <CardActionArea>
            <CardMedia
              style={{
                borderRadius: "30px",
                color: "black",
              }}
              component="img"
              image={product.image}
              title={product.name}
            ></CardMedia>

            <CardContent>
              <Typography variant="h1" style={{ fontWeight: "bolder" }}>
                {product.name}
              </Typography>
              <Rating value={product.rating} readOnly></Rating>
            </CardContent>
          </CardActionArea>
        </NextLink>
        <CardActions>
          <Typography style={{ fontSize: "20px", fontWeight: "bolder" }}>
            ₱{product.price}
          </Typography>

          <StyledButton
            variant="contained"
            size="small"
            color="primary"
            onClick={() => addToCartHandler(product)}
            fullWidth
          >
            <strong styles={{ texTransformation: "none" }}>Add to cart </strong>{" "}
            &nbsp; &nbsp; <br />
            <AddShoppingCartIcon />
          </StyledButton>
        </CardActions>
      </Card>
    </div>
  );
}

export default Productitem;
