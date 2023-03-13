/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Navbar from "../homepage/navbar";
import Footer from "./footer";
import styles from "../utils/style.module.css";
import Carousel from "react-material-ui-carousel";
import { Box, Button, Collapse, Link } from "@material-ui/core";
import NextLink from "next/link";
import "aos/dist/aos.css";
export default function Boarding() {
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(true);
  }, []);
  let carousel = [
    { img: "/images/petboarding1.jpg", alt: "pet1", key: "1" },
    { img: "/images/petboarding2.jpg", alt: "pet2", key: "2" },
    { img: "/images/petboarding3.jpg", alt: "pet3", key: "3" },
    { img: "/images/petboarding4.jpg", alt: "cage", key: "4" },
  ];

  return (
    <div>
      <Navbar />
      <Collapse
        in={checked}
        {...(checked ? { timeout: 2000 } : {})}
        collapsedHeight={10}
      >
        <h1 className={styles.petBoardingText}>Bark Pack Pet Boarding</h1>
      </Collapse>
      <Box
        justifyContent={"center"}
        style={{
          display: "contents",
          textAlign: "center",
          p: 4,
          marginBottom: "150px",
        }}
        data-aos="flip-up"
      >
        <Carousel animation="slide">
          {carousel.map((carousels) => (
            <img
              className={styles.img2}
              key={carousels.key}
              src={carousels.img}
              alt={carousels.alt}
            ></img>
          ))}
        </Carousel>
      </Box>
      <h1 className={styles.petBoardingText}>Prices</h1>
      <Box
        justifyContent={"center"}
        style={{
          display: "contents",
          textAlign: "center",
          p: 4,
          marginBottom: "150px",
        }}
      >
        <img
          className={styles.img3}
          alt="boarding"
          src="/images/boarding.jpg"
          layout="responsive"
        ></img>
      </Box>
      <NextLink
        href="https://www.facebook.com/profile.php?id=100063847788639"
        passHref
      >
        <Link>
          <Box
            justifyContent={"center"}
            style={{
              display: "block",
              textAlign: "center",
              p: 4,
            }}
          >
            <Button variant="contained" className={styles.btn2}>
              Book Now
            </Button>
          </Box>
        </Link>
      </NextLink>
      <Footer />
    </div>
  );
}
