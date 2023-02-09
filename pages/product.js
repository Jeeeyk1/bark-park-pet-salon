import { Grid, InputBase, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Layout from "../components/Layout";
import db from "../utils/db";
import Product from "../models/Product";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Store } from "../utils/Store";
import useStyles from "../utils/styles";
import Productitem from "../components/Productitem";

import { Pagination } from "@material-ui/lab";
import Scroll from "./scroll/Scroll";

const PAGE_SIZE = 6;

export default function Home() {
  const classes = useStyles();
  const router = useRouter();
  const { state, dispatch } = useContext(Store);

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(6);

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentProducts = products.slice(indexOfFirstPost, indexOfLastPost);
  const paginateOnchange = (e, value) => {
    setCurrentPage(value);
    console.log(indexOfFirstPost, indexOfLastPost);
    console.log(currentProducts);
  };
  const pageNumbers = Math.ceil(products.length / postPerPage);
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get(`/api/products`);
      setProducts(res.data);
      console.log(res.data);
    };

    fetchProducts();
  }, [currentPage]);
  const addToCartHandler = async (product) => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    console.log(data.length);
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

  // Get current post

  return (
    <Layout>
      <Scroll showBelow={250} />
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
          {currentProducts.map((product) => (
            <Grid item md={4} key={product.name}>
              <Productitem
                product={product}
                addToCartHandler={addToCartHandler}
              />
            </Grid>
          ))}
        </Grid>
      </div>
      <Pagination
        color="primary"
        count={pageNumbers}
        onChange={paginateOnchange}
      ></Pagination>
    </Layout>
  );
}
export async function getServerSideProps({ query }) {
  await db.connect();

  const pageSize = query.pageSize || PAGE_SIZE;
  const page = query.page || 1;
  const productDocs = await Product.find({}, "-reviews")

    .skip(pageSize * (page - 1))
    .limit(pageSize)
    .lean();
  const featuredProductsDocs = await Product.find(
    { isFeatured: true },
    "-reviews"
  )
    .lean()

    .limit(3);
  const topRatedProductsDocs = await Product.find({}, "-reviews")
    .skip(pageSize * (page - 1))
    .lean()
    .sort({
      rating: -1,
    })
    .limit(pageSize);

  const countProducts = await Product.countDocuments({});
  await db.disconnect();
  const products = productDocs.map(db.convertDocToObj);
  return {
    props: {
      featuredProducts: featuredProductsDocs.map(db.convertDocToObj),
      topRatedProducts: topRatedProductsDocs.map(db.convertDocToObj),
      page,
      products,
      pages: Math.ceil(countProducts / pageSize),
    },
  };
}
