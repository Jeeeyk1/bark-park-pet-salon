import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@material-ui/core";
import React from "react";
import NextLink from "next/link";
import styles from "../utils/style.module.css";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

function Services() {
  useEffect(() => {
    Aos.init({ duration: 2500 });
  }, []);
  return (
    <Container className={styles.services} data-aos="flip-right">
      <Card className={styles.box}>
        <NextLink href="../boarding" passHref>
          <CardActionArea>
            <CardMedia
              style={{
                borderRadius: 20,
              }}
              component="img"
              image="/images/pethotell.jpeg"
              title="Try"
            ></CardMedia>
            <CardContent>
              <Typography variant="h3" style={{ fontFamily: "Anton" }}>
                Pet Boarding
              </Typography>
            </CardContent>
          </CardActionArea>
        </NextLink>
      </Card>
      <Card className={styles.box}>
        <NextLink href="../grooming" passHref>
          <CardActionArea>
            <CardMedia
              style={{
                borderRadius: 20,
              }}
              component="img"
              image="/images/Grooming.jpg"
              title="Try"
            ></CardMedia>
            <CardContent>
              <Typography variant="h3" style={{ fontFamily: "Anton" }}>
                Grooming
              </Typography>
            </CardContent>
          </CardActionArea>
        </NextLink>
      </Card>
    </Container>
  );
}

export default Services;
