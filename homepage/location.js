/* eslint-disable @next/next/no-img-element */
import { Box, Button, Link, Typography } from "@material-ui/core";
import React from "react";
import styles from "../utils/style.module.css";
import NextLink from "next/link";
const Location = () => {
  return (
    <div>
      <Box className={styles.location}>
        <div>
          <Typography className={styles.locate_text}>
            <br />
            <br />
            <b styles={{ fontWeight: 100 }}> Bark Park Pet Salon Baguio</b>{" "}
            <br /> <br /> <br /> 49 2F, SAJJ Building , Sajj Building, Rimando
            Road <br />
            Aurora Hill 2600 Baguio City, Philippines.
            <br />
            <br /> Open Hours <br />
            9:00am-7:00pm
          </Typography>
          <br />
          <Link>
            <NextLink
              href="https://all-opening-hours.ph/02159100/Bark_Pack_Pet_Salon"
              passHref
            >
              <Button className={styles.direction}>Get Direction</Button>
            </NextLink>
          </Link>
        </div>
        <img src="images/Locate.jpg" alt="" className={styles.locate}></img>
      </Box>
    </div>
  );
};

export default Location;
