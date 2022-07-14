import {
  Box,
  Button,
  Collapse,
  Link,
  Slide,
  Typography,
} from "@material-ui/core";
import { useRouter } from "next/router";

import React, { useEffect, useState } from "react";
import useStyles from "../utils/styles";
import NextLink from "next/link";
function Banner() {
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
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(true);
  }, []);
  const classes = useStyles();
  const router = useRouter();
  const onClickShop = () => {
    router.push("/product");
  };
  return (
    <div>
      <Box className={classes.boxB}>
        <Box className={classes.boxC}>
          <Collapse
            in={checked}
            {...(checked ? { timeout: 1000 } : {})}
            collapsedHeight={15}
          >
            <Typography className={classes.titleB}>
              Bark Park Pet Salon Baguio
            </Typography>
          </Collapse>
          <Link>
            <NextLink href="/product" passHref>
              <Button className={classes.button1}>Shop Now</Button>
            </NextLink>
          </Link>
        </Box>
      </Box>
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

export default Banner;
