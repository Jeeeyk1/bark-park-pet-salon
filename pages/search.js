import {
  Grid,
  List,
  ListItem,
  Box,
  Typography,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";
import React from "react";
import Layout from "../components/Layout";
import useStyles from "../utils/styles";
import { useRouter } from "next/router";
import Products from "../models/Product";
import db from "../utils/db";
import Productitem from "../components/Productitem";
import { useContext, useState } from "react";
import { Store } from "../utils/Store";
import axios from "axios";
import CancelIcon from "@material-ui/icons/Cancel";
import { InputBase, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { Pagination, Rating } from "@material-ui/lab";

const PAGE_SIZE = 3;
const prices = [
  {
    name: "₱1 to ₱50",
    value: "1-50",
  },
  {
    name: "₱51 to ₱200",
    value: "51-200",
  },
  {
    name: "₱201 to ₱1000",
    value: "201-1000",
  },
];

const ratings = [1, 2, 3, 4, 5];

export default function Search(props) {
  const classes = useStyles();
  const router = useRouter();
  const {
    query = "all",
    category = "all",

    price = "all",
    rating = "all",
    sort = "featured",
  } = router.query;
  const { products, countProducts, categories, pages } = props;

  const filterSearch = ({
    page,
    category,
    brand,
    sort,
    min,
    max,
    searchQuery,
    price,
    rating,
  }) => {
    const path = router.pathname;
    const { query } = router;
    if (page) query.page = page;
    if (searchQuery) query.searchQuery = searchQuery;
    if (sort) query.sort = sort;
    if (category) query.category = category;
    if (brand) query.brand = brand;
    if (price) query.price = price;
    if (rating) query.rating = rating;
    if (min) query.min ? query.min : query.min === 0 ? 0 : min;
    if (max) query.max ? query.max : query.max === 0 ? 0 : max;

    router.push({
      pathname: path,
      query: query,
    });
  };
  const categoryHandler = (e) => {
    filterSearch({ category: e.target.value });
  };
  const pageHandler = (e, page) => {
    console.log(query);
    filterSearch({ page });
  };

  const sortHandler = (e) => {
    filterSearch({ sort: e.target.value });
  };
  const priceHandler = (e) => {
    filterSearch({ price: e.target.value });
  };
  const ratingHandler = (e) => {
    filterSearch({ rating: e.target.value });
  };

  const { state, dispatch } = useContext(Store);
  const addToCartHandler = async (product) => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    router.push("/cart");
  };
  const [query1, setQuery] = useState("");
  const queryChangeHandler = (e) => {
    setQuery(e.target.value);
  };
  const sumbitHandler = (e) => {
    e.preventDefault();
    router.push(`/search?query=${query1}`);
  };
  return (
    <Layout title="Search">
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
      <Grid className={classes.mt1} container spacing={1}>
        <Grid item md={3}>
          <List>
            <ListItem>
              <Box className={classes.fullWidth}>
                <Typography>Categories</Typography>
                <Select fullWidth value={category} onChange={categoryHandler}>
                  <MenuItem value="all">All</MenuItem>
                  {categories &&
                    categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                </Select>
              </Box>
            </ListItem>
            <ListItem>
              <Box className={classes.fullWidth}>
                <Typography>Prices</Typography>
                <Select value={price} onChange={priceHandler} fullWidth>
                  <MenuItem value="all">All</MenuItem>
                  {prices.map((price) => (
                    <MenuItem key={price.value} value={price.value}>
                      {price.name}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </ListItem>
            <ListItem>
              <Box className={classes.fullWidth}>
                <Typography>Ratings</Typography>
                <Select value={rating} onChange={ratingHandler} fullWidth>
                  <MenuItem value="all">All</MenuItem>
                  {ratings.map((rating) => (
                    <MenuItem dispaly="flex" key={rating} value={rating}>
                      <Rating value={rating} readOnly />
                      <Typography component="span">&amp; Up</Typography>
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={9}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              {products.length === 0 ? "No" : countProducts} Results
              {query !== "all" && query !== "" && " : " + query}
              {category !== "all" && " : " + category}
              {price !== "all" && " : Price " + price}
              {rating !== "all" && " : Rating " + rating + " & up"}
              {(query !== "all" && query !== "") ||
              category !== "all" ||
              rating !== "all" ||
              price !== "all" ? (
                <Button onClick={() => router.push("/search")}>
                  <CancelIcon />
                </Button>
              ) : null}
            </Grid>
            <Grid item>
              <Typography component="span" className={classes.sort}>
                Sort By
              </Typography>
              <Select value={sort} onChange={sortHandler}>
                <MenuItem value="lowest">Price: Low to High</MenuItem>
                <MenuItem value="highest">Price: High to Low</MenuItem>
                <MenuItem value="toprated">Customer Reviews</MenuItem>
                <MenuItem value="newest">Newest Arrivals</MenuItem>
              </Select>
            </Grid>
          </Grid>
          <Grid className={classes.mt1} container spacing={5}>
            {products.map((product) => (
              <Grid item md={4} key={product.name}>
                <Productitem
                  product={product}
                  addToCartHandler={addToCartHandler}
                />
              </Grid>
            ))}
          </Grid>
          <Pagination
            className={classes.mt1}
            defaultPage={parseInt(query.page || "1")}
            count={pages}
            onChange={pageHandler}
          ></Pagination>
        </Grid>
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  await db.connect();
  const pageSize = query.pageSize || PAGE_SIZE;
  const page = query.page || 1;
  const category = query.category || "";

  const price = query.price || "";
  const rating = query.rating || "";
  const sort = query.sort || "";
  const searchQuery = query.query || "";

  const queryFilter =
    searchQuery && searchQuery !== "all"
      ? {
          name: {
            $regex: searchQuery,
            $options: "i",
          },
        }
      : {};
  const categoryFilter = category && category !== "all" ? { category } : {};

  const ratingFilter =
    rating && rating !== "all"
      ? {
          rating: {
            $gte: Number(rating),
          },
        }
      : {};
  // 10-50
  const priceFilter =
    price && price !== "all"
      ? {
          price: {
            $gte: Number(price.split("-")[0]),
            $lte: Number(price.split("-")[1]),
          },
        }
      : {};

  const order =
    sort === "featured"
      ? { featured: -1 }
      : sort === "lowest"
      ? { price: 1 }
      : sort === "highest"
      ? { price: -1 }
      : sort === "toprated"
      ? { rating: -1 }
      : sort === "newest"
      ? { createdAt: -1 }
      : { _id: -1 };

  const categories = await Products.find().distinct("category");

  const productDocs = await Products.find(
    {
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,

      ...ratingFilter,
    },
    "-reviews"
  )
    .sort(order)
    .skip(pageSize * (page - 1))
    .limit(pageSize)
    .lean();

  const countProducts = await Products.countDocuments({
    ...queryFilter,
    ...categoryFilter,
    ...priceFilter,

    ...ratingFilter,
  });
  await db.disconnect();

  const products = productDocs.map(db.convertDocToObj);

  return {
    props: {
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
      categories,
    },
  };
}
