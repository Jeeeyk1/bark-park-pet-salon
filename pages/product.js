import { Grid, InputBase, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Layout from "../components/Layout";
import db from "../utils/db";
import Product from "../models/Product";
import axios from "axios";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { Store } from "../utils/Store";
import useStyles from "../utils/styles";
import Productitem from "../components/Productitem";

import { Pagination } from "@material-ui/lab";

export default function Home(props) {
  const { topRatedProducts } = props;
  const classes = useStyles();
  const router = useRouter();
  const { state, dispatch } = useContext(Store);

  const addToCartHandler = async (product) => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry, Product is out of stock");
      return;
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    router.push("cart");
  };
  const [query, setQuery] = useState("");
  const queryChangeHandler = (e) => {
    setQuery(e.target.value);
  };
  const sumbitHandler = (e) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  };
  return (
    <Layout>
      <div>
        <div
          style={{
            margin: "20px",
            padding: "5px",
            display: "flex",
          }}
          className={classes.searchSection}
        >
          <form
            style={{
              border: "3px solid black",
              backgroundColor: "white",
              borderRadius: 8,
            }}
            onSubmit={sumbitHandler}
            className={classes.searchForm}
          >
            <InputBase
              style={{
                paddingLeft: 5,
                color: "gray",
                "&::placeholder": {
                  color: "#606060",
                },
              }}
              name="query"
              className={classes.searchInput}
              placeholder="Search Products"
              onChange={queryChangeHandler}
            />
            <IconButton
              style={{
                backgroundColor: "#088F8F",
                padding: 5,
                borderRadius: "0 5px 5px 0",
                "& span": {
                  color: "#00000",
                },
              }}
              type="submit"
              className={classes.iconButton}
              arial-label="search"
            >
              <SearchIcon />
            </IconButton>
          </form>
        </div>

        <h1>Products</h1>
        <Grid container spacing={1}>
          {topRatedProducts.map((product) => (
            <Grid item md={2} key={product.name}>
              <Productitem
                product={product}
                addToCartHandler={addToCartHandler}
              />
            </Grid>
          ))}
        </Grid>
      </div>
      <Pagination count={10}></Pagination>
    </Layout>
  );
}
export async function getServerSideProps() {
  await db.connect();
  const featuredProductsDocs = await Product.find(
    { isFeatured: true },
    "-reviews"
  )
    .lean()

    .limit(3);
  const topRatedProductsDocs = await Product.find({}, "-reviews")
    .lean()
    .sort({
      rating: -1,
    })
    .limit();
  await db.disconnect();
  return {
    props: {
      featuredProducts: featuredProductsDocs.map(db.convertDocToObj),
      topRatedProducts: topRatedProductsDocs.map(db.convertDocToObj),
    },
  };
}
