/* eslint-disable @next/next/no-img-element */

import {
  Box,
  Button,
  Collapse,
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
  const [checked, setChecked] = useState(false);
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
  useEffect(() => {
    setChecked(true);
  }, []);
  return (
    <div style={{ marginTop: "100px" }}>
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

      <Container maxWidth="100vh" className={styles.section1}>
        <Box className={classes.boxC}>
          <Collapse
            in={checked}
            {...(checked ? { timeout: 2000 } : {})}
            collapsedHeight={15}
          >
            <Typography className={styles.bppsb}>
              Bark Park Pet Salon Baguio
            </Typography>
          </Collapse>
          <Link>
            <NextLink href="/product" passHref>
              <Button className={styles.btn1}>Shop Now</Button>
            </NextLink>
          </Link>
        </Box>
      </Container>

      <img src="/images/bottom_wave.png" className={styles.wave} alt=""></img>
    </div>
  );
}

export default Header;
