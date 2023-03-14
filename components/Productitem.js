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
      height: "50px",
      backgroundColor: "#1A2421",
      color: "#fcd01c",
      "&:hover": {
        backgroundColor: "#0D1411",
        color: "#fcd01c",
        boxShadow: "none",
      },
    },
  })(Button);

  const StyledCardActionArea = withStyles({
    root: {
      "&:hover": {
        transform: "scale(1.05)",
        transition: "all 0.3s ease-in-out",
      },
    },
  })(CardActionArea);

  return (
    <div>
      <Card>
        <NextLink href={`/products/${product.slug}`} passHref>
          <StyledCardActionArea>
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
          </StyledCardActionArea>
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
            <AddShoppingCartIcon /> &nbsp; &nbsp;
            <strong styles={{ texTransformation: "none" }}>
              Add to cart{" "}
            </strong>{" "}
            &nbsp; &nbsp; <br />
          </StyledButton>
        </CardActions>
      </Card>
    </div>
  );
}

export default Productitem;
