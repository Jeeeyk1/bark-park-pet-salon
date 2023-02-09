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

import Navbar from "../homepage/navbar";
import Location from "../homepage/location";
import Aos from "aos";
import Scroll from "./scroll/Scroll";

export default function Homepage(props) {
  const { featuredProducts } = props;
  useEffect(() => {
    Aos.init({ duration: 2500 });
  }, []);
  return (
    <div>
      <Navbar />
      <Scroll showBelow={250} />
      <Header />
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
      <div className={styles.dm1}>
        <div className={styles.imgdiv}>
          {" "}
          <img
            data-aos="zoom-in-up"
            src="images/happyplace.jpg"
            alt="happy place"
            className={styles.happyplace}
          ></img>
        </div>
        <div
          data-aos="fade-right"
          data-aos-easing="linear"
          data-aos-duration="1500"
          className={styles.d1}
        >
          <h1 className={styles.h1}>
            Are you wondering what color your dog is most attracted to?{" "}
          </h1>
          <p className={styles.p1}>
            You might be wondering the importance of colors in your dog’s daily
            life. Having the right color toys and accessories can mean that the
            dog can easily identify them and does not have a hard time finding
            them. It also means that the dog does not lose its toys quickly.
            Don’t you recall your dog scrambling for a toy while it is right in
            front of them?
          </p>
          <p className={styles.p2}>
            Colors also play a very significant factor when it comes to dog
            sports. The colors that a handler wears or the color of the course’s
            obstacles can adversely impact the performance of the dog. It is
            essential for the handler to contrast their clothing with that of
            the background so that the dog can easily identify the signals.
            Clothing that blends with the background will mean that the dog will
            have a hard time seeing the signals and can miss them, leading to a
            mistake.
          </p>
          <p className={styles.p2}>
            So, keeping colors into account when buying products for your dog
            will help your dog as well. While yellow is certainly not as
            attractive to us as a baby pink or flaming red, your best friend
            certainly seems to think so.
          </p>
        </div>
      </div>
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
