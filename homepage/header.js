/* eslint-disable @next/next/no-img-element */

import {
  Box,
  Button,
  Container,
  Link,
  Slide,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import useStyles from "../utils/styles";
import NextLink from "next/link";
import styles from "../utils/style.module.css";
function Header() {
  const classes = useStyles();

  const messages = [
    "Welcome to Bark Park Pet Salon Baguio!",
    "Hope you enjoy our first Official Website",
    "Enjoy Shopping!",
  ];
  const [messageIndex, setmessageIndex] = useState(0);
  const [show, setShow] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 3000);
    const intervalId = setInterval(() => {
      setmessageIndex((i) => (i + 1) % messages.length);
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 3000);
    }, 4000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      <Container maxWidth="100vh" className={styles.section1}>
        <img
          src="images/landing-3.png"
          alt="homepage"
          className={styles.homeImg}
        ></img>{" "}
        <div className={styles.boxC}>
          <Typography className={styles.bppsb}>
            Bark Park Pet Salon Baguio
          </Typography>
          <h1 className={styles.textP}>The best place for your pets! </h1>
          <h4 className={styles.textP}>
            BARKPACK OFFERS A COMPLETE PACKAGE FOR YOUR PET.
          </h4>

          <Link>
            <NextLink href="/product" passHref>
              <Button className={styles.btn1}>Shop Now</Button>
            </NextLink>
          </Link>
        </div>
      </Container>
      <Box className={classes.boxD}>
        <Slide
          in={show}
          direction={show ? "left" : "right"}
          timeout={{
            enter: 500,
            exit: 100,
          }}
        >
          <Box display={"flex"} justifyContent="center" alignItems={"center"}>
            <Typography className={classes.message}>
              {messages[messageIndex]}
            </Typography>
          </Box>
        </Slide>
      </Box>
    </div>
  );
}

export default Header;
