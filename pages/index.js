/*eslint-disable @next/next/no-img-element*/
import { Box, Link, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import styles from "../utils/style.module.css";
import NextLink from "next/link";
import Footer from "./footer";
import db from "../utils/db";
import Product from "../models/Product";
import "aos/dist/aos.css";
import Header from "../homepage/header";
import Aboutus from "../homepage/aboutus";
import Navbar from "../homepage/navbar";
import Location from "../homepage/location";
import Aos from "aos";
import Header1 from "../homepage/header1";

export default function Homepage(props) {
  const { featuredProducts } = props;
  useEffect(() => {
    Aos.init({ duration: 2500 });
  }, []);
  return (
    <div>
      <Navbar />

      <Header />
      <Header1 />
      <Box
        justifyContent={"center"}
        style={{
          display: "contents",
          textAlign: "center",
          p: 4,
          marginBottom: "150px",
        }}
      >
        <Typography data-aos="flip-right" className={styles.text}>
          Top rated Products
        </Typography>
      </Box>
      <Box
        style={{
          display: "contents",
          textAlign: "center",
          p: 4,
          marginBottom: "150px",
        }}
      >
        <Carousel animation="fade">
          {featuredProducts.map((products) => (
            <NextLink
              key={products._id}
              href={`/products/${products.slug}`}
              passHref
            >
              <Link>
                <img
                  data-aos="flip-right"
                  src={products.image}
                  alt={products.slug}
                  layout="responsive"
                  className={styles.img2}
                />

                <Typography data-aos="flip-right" className={styles.text}>
                  {products.name}
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
          marginTop: "100px",
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
          marginTop: "250px",
        }}
      >
        <Typography
          className={styles.text}
          styles={{
            marginTop: "100px",
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
