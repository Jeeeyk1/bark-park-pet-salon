/*eslint-disable @next/next/no-img-element*/
import { Box, Link, Typography } from "@material-ui/core";
import React from "react";
import Carousel from "react-material-ui-carousel";

import NextLink from "next/link";
import Categories from "../homepage/categories";
import Services from "../homepage/services";

import Footer from "./footer";
import db from "../utils/db";
import Product from "../models/Product";
import { FeatureImage } from "../utils/styles";
import Header from "../homepage/header";
import Aboutus from "../homepage/aboutus";
import Navbar from "../homepage/navbar";
import Location from "../homepage/location";

export default function Homepage(props) {
  const { featuredProducts } = props;

  return (
    <div maxWidth="fullwidth">
      <Navbar />
      <Header />

      <Box
        display="flex"
        justifyContent={"center"}
        style={{
          textAlign: "center",
          p: 4,
          marginBottom: "200px",
        }}
      >
        <Typography style={{ fontSize: "75px", fontFamily: "Bebas Neue" }}>
          Top rated Products
        </Typography>
        <Carousel animation="slide">
          {featuredProducts.map((product) => (
            <NextLink
              key={product._id}
              href={`/product/${product.slug}`}
              passHref
            >
              <Link>
                <FeatureImage
                  src={product.image}
                  width={800}
                  height={500}
                  layout="responsive"
                  style={{ borderRadius: "35%" }}
                />

                <Typography
                  style={{
                    fontSize: "50px",
                    fontFamily: "Bebas Neue",
                  }}
                >
                  {product.name}
                </Typography>
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
        <Typography
          variant="h4"
          style={{ fontSize: "75px", fontFamily: "Bebas Neue" }}
        >
          Categories
        </Typography>
      </Box>
      <Categories />
      <Box
        display="flex"
        justifyContent={"center"}
        style={{
          textAlign: "center",
          p: 4,
        }}
      >
        <Typography
          style={{
            marginTop: "100px",
            fontSize: "75px",
            fontFamily: "Bebas Neue",
          }}
        >
          Our Services
        </Typography>
      </Box>
      <Services />
      <Box
        display="flex"
        justifyContent={"center"}
        style={{
          textAlign: "center",
          p: 4,
        }}
      >
        <Typography
          style={{
            fontSize: "75px",
            fontFamily: "Bebas Neue",
            marginTop: "50px",
          }}
        >
          {" "}
          About us
        </Typography>
      </Box>
      <Aboutus />

      <Box
        display="flex"
        justifyContent={"center"}
        style={{
          textAlign: "center",
          p: 4,
        }}
      >
        <Typography
          style={{
            fontSize: "75px",
            fontFamily: "Bebas Neue",
          }}
        >
          Locate Us
        </Typography>
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
