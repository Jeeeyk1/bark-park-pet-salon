/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Navbar from "../homepage/navbar";
import Footer from "./footer";
import styles from "../utils/style.module.css";
import Carousel from "react-material-ui-carousel";

import NextLink from "next/link";
import "aos/dist/aos.css";
import { Box, Button, Collapse, Link } from "@material-ui/core";
export default function Boarding() {
  let carousel = [
    { img: "/images/grooming0.jpg", alt: "pet1", key: "1" },
    { img: "/images/grooming2.jpg", alt: "pet2", key: "2" },
    { img: "/images/grooming3.jpg", alt: "pet3", key: "3" },
    { img: "/images/grooming4.jpg", alt: "cage", key: "4" },
  ];
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(true);
  }, []);
  return (
    <div>
      <Navbar />
      <Collapse
        in={checked}
        {...(checked ? { timeout: 2000 } : {})}
        collapsedHeight={10}
      >
        <h1 className={styles.petBoardingText}>Bark Park Grooming</h1>
      </Collapse>
      <Box
        justifyContent={"center"}
        style={{
          display: "contents",
          textAlign: "center",
          p: 4,
          marginBottom: "150px",
        }}
        data-aos="fade-left"
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
      <br />
      <br />
      <br />
      <br />
      <br />
      <Box
        justifyContent={"center"}
        style={{
          display: "contents",
          textAlign: "center",
          p: 4,
          marginTop: "150px",
          marginBottom: "150px",
        }}
      >
        <img
          className={styles.img3}
          alt="boarding"
          src="/images/Grooming1.jpg"
          layout="responsive"
        ></img>
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
          src="/images/groom.jpg"
          layout="responsive"
        ></img>
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
      </Box>

      <Footer />
    </div>
  );
}
