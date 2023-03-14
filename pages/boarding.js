/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Navbar from "../homepage/navbar";
import Footer from "./footer";
import styles from "../utils/style.module.css";
import Carousel from "react-material-ui-carousel";
import useStyles from "../utils/styles";
import {
  Box,
  Button,
  Collapse,
  Link,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@material-ui/core";
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
  const classes = useStyles();

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
        {" "}
        <Typography variant="h3" align="center" gutterBottom>
          Prices for Boarding
        </Typography>
        <TableContainer component={Paper} className={classes.tableContainer}>
          <TableContainer aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHeaderCell}>
                  Type of Boarding
                </TableCell>
                <TableCell className={classes.tableHeaderCell} align="right">
                  Inclusions
                </TableCell>
                <TableCell className={classes.tableHeaderCell} align="right">
                  XS
                </TableCell>
                <TableCell className={classes.tableHeaderCell} align="right">
                  Small
                </TableCell>
                <TableCell className={classes.tableHeaderCell} align="right">
                  Medium
                </TableCell>
                <TableCell className={classes.tableHeaderCell} align="right">
                  Large
                </TableCell>
                <TableCell className={classes.tableHeaderCell} align="right">
                  XL
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  Regular
                </TableCell>
                <TableCell align="right">Dry dog food</TableCell>
                <TableCell className={classes.priceTableCell} align="right">
                  500php
                </TableCell>
                <TableCell className={classes.priceTableCell} align="right">
                  600php
                </TableCell>
                <TableCell className={classes.priceTableCell} align="right">
                  700php
                </TableCell>
                <TableCell className={classes.priceTableCell} align="right">
                  900php
                </TableCell>
                <TableCell className={classes.priceTableCell} align="right">
                  1,200php
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  VIP
                </TableCell>
                <TableCell align="right">
                  Dry wet food, treats, playground bed, toys.
                </TableCell>
                <TableCell className={classes.priceTableCell} align="right">
                  750php
                </TableCell>
                <TableCell className={classes.priceTableCell} align="right">
                  900php
                </TableCell>
                <TableCell className={classes.priceTableCell} align="right">
                  1,000php
                </TableCell>
                <TableCell className={classes.priceTableCell} align="right">
                  1,200php
                </TableCell>
                <TableCell className={classes.priceTableCell} align="right">
                  N/A
                </TableCell>
              </TableRow>{" "}
              <TableRow align="center">
                <TableCell colSpan={3} align="center">
                  <strong>Day Care</strong>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">All breed</TableCell>
                <TableCell align="center">100php/hour</TableCell>
                <TableCell align="center">Food not included</TableCell>
              </TableRow>
            </TableBody>
          </TableContainer>
        </TableContainer>
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
