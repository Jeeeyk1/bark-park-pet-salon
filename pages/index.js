/*eslint-disable @next/next/no-img-element*/
import { Box, Link, Typography } from "@material-ui/core";
import React from "react";
import Carousel from "react-material-ui-carousel";
import styles from "../utils/style.module.css";
import NextLink from "next/link";
import Footer from "./footer";
import db from "../utils/db";
import Product from "../models/Product";

import Header from "../homepage/header";
import Aboutus from "../homepage/aboutus";
import Navbar from "../homepage/navbar";
import Location from "../homepage/location";

export default function Homepage(props) {
  const { featuredProducts } = props;

  return (
    <div>
      <Navbar />
      <Header />

      <Box
        display="flex"
        justifyContent={"center"}
        style={{
          textAlign: "center",
          p: 4,
        }}
      >
        <Typography className={styles.text}>Top rated Products</Typography>
      </Box>
      <Box
        justifyContent={"center"}
        style={{
          textAlign: "center",

          marginBottom: "100px",
        }}
      >
        <Carousel animation="slide">
          {featuredProducts.map((product) => (
            <NextLink
              key={product._id}
              href={`/products/${product.slug}`}
              passHref
            >
              <Link>
                <img
                  src={product.image}
                  alt={product.slug}
                  layout="responsive"
                  className={styles.img2}
                />

                <Typography className={styles.text}>{product.name}</Typography>
              </Link>
            </NextLink>
          ))}
        </Carousel>
      </Box>

      <Box
        display="flex"
        justifyContent={"center"}
        style={{
          textAlign: "center",
          p: 4,
        }}
      >
        <Typography className={styles.text}> About us</Typography>
      </Box>
      <Aboutus />

      <Box
        display="flex"
        justifyContent={"center"}
        style={{
          textAlign: "center",
          marginTop: "100px",
        }}
      >
        <Typography className={styles.text}>Located Us</Typography>
      </Box>
      <Box>
        <Location />
      </Box>
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const featuredProductsDocs = await Product.find(
    { isFeatured: true },
    "-reviews"
  )
    .lean()

    .limit(5);
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
