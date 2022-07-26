import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import React from "react";
import NextLink from "next/link";
import Rating from "@material-ui/lab/Rating";

function Productitem({ product, addToCartHandler }) {
  return (
    <div>
      <Card>
        <NextLink href={`/products/${product.slug}`} passHref>
          <CardActionArea>
            <CardMedia
              style={{
                borderRadius: 20,
              }}
              component="img"
              image={product.image}
              title={product.name}
            ></CardMedia>
            <CardContent>
              <Typography style={{ fontSize: "25px", fontWeight: "bolder" }}>
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
          <Button
            style={{
              height: "70px",
              width: "300px",
              borderRadius: 10,
              fontSize: "25px",
              fontWeight: "bolder",
            }}
            variant="contained"
            size="small"
            color="primary"
            onClick={() => addToCartHandler(product)}
          >
            Add to cart
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default Productitem;
