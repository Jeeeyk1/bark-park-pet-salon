import React, { useContext, useEffect, useState } from "react";
import NextLink from "next/link";
import Image from "next/image";
import {
  Button,
  Card,
  Grid,
  Link,
  List,
  ListItem,
  Typography,
  withStyles,
} from "@material-ui/core";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Rating from "@material-ui/lab/Rating";
import Layout from "../../components/Layout";
import db from "../../utils/db";
import useStyles from "../../utils/styles";
import axios from "axios";
import { Store } from "../../utils/Store";
import { getError } from "../../utils/error";
import Product from "../../models/Product";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import Alert from "@material-ui/lab/Alert";

export default function ProductScreen(props) {
  const router = useRouter();
  const { product } = props;
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(`/api/products/${product._id}/reviews`);
      setReviews(data);
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };
  useEffect(() => {
    fetchReviews();
  }, []);
  if (!product) {
    return <div>Product Not Found</div>;
  }
  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry, Product is out of stock");
      return;
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    router.push("/cart");
  };

  const StyledButton = withStyles({
    root: {
      height: "50px",
      backgroundColor: "#1A2421",
      color: "#fcd01c",
      "&:hover": {
        backgroundColor: "#1A2421",
        color: "#fcd01c",
      },
    },
  })(Button);

  return (
    <Layout title={product.name} description={product.description}>
      <div className={classes.section}>
        <NextLink href="/" passHref>
          <Link>
            <Typography> Back to product</Typography>
          </Link>
        </NextLink>
      </div>
      <Grid className={classes.brand1} container spacing={2}>
        <Grid item md={6} xs={12}>
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout="responsive"
          ></Image>
        </Grid>
        <Grid item md={3} xs={12}>
          <List>
            <ListItem>
              <Typography component="h1" variant="h1">
                {product.name}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                <strong>Category</strong>: {product.category}
              </Typography>
            </ListItem>
            <ListItem>
              <Rating value={product.rating} readOnly></Rating>
              <Link href="#reviews">
                <Typography>({product.numReviews} reviews)</Typography>
              </Link>
            </ListItem>

            <ListItem>
              <Typography align="justify" className={classes.textDescription}>
                <strong>Description</strong>: {product.description}
              </Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Price</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <strong>₱{product.price}.00</strong>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Stocks</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography style={{ fontWeight: "bolder" }}>
                      {product.countInStock > 0
                        ? product.countInStock + "pcs"
                        : "Unavailable"}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <StyledButton
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={addToCartHandler}
                >
                  <strong>Add to cart </strong> &nbsp; &nbsp; <br />
                  <AddShoppingCartIcon />
                </StyledButton>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
      <List>
        <ListItem>
          <Typography name="reviews" id="reviews" variant="h2">
            Customer Reviews
          </Typography>
        </ListItem>
        {reviews.length === 0 && <ListItem>No reviews</ListItem>}
        {reviews.map((review) => (
          <ListItem key={review._id}>
            <Grid container>
              <Grid item className={classes.reviewItem}>
                <Typography>
                  <strong>{review.name}</strong>
                </Typography>
                <Typography>{review.createdAt.substring(0, 10)}</Typography>
              </Grid>
              <Grid item>
                <Rating value={review.rating} readyOnly></Rating>
                <Typography>{review.comment}</Typography>
              </Grid>
            </Grid>
          </ListItem>
        ))}
        <ListItem>
          {userInfo ? (
            <Alert severity="info">
              {" "}
              <Typography style={{ textTransform: "none" }}>
                Kindly ensure that you have bought this item before writing a
                review. If you have already made a purchase, please access the
                order summary to provide a review for this product.
              </Typography>
            </Alert>
          ) : (
            <Alert severity="warning">
              Please{" "}
              <Link href={`/login?redirect=/products/${product.slug}`}>
                Login
              </Link>{" "}
              to write a review
            </Alert>
          )}
        </ListItem>
      </List>
    </Layout>
  );
}
export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;
  await db.connect();

  const product = await Product.findOne({ slug }, "-reviews").lean();
  await db.disconnect();
  return {
    props: {
      product: db.convertDocToObj(product),
    },
  };
}
