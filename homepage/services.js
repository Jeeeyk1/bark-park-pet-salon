import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import NextLink from "next/link";
import styles from "../utils/style.module.css";
import Aos from "aos";
import "aos/dist/aos.css";

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
                height: 250,
              }}
              component="img"
              image="/images/pethotell.jpeg"
              title="Pet Boarding"
            ></CardMedia>
            <CardContent>
              <Typography
                variant="h4"
                component="h2"
                style={{ fontFamily: "Anton" }}
              >
                Pet Boarding
              </Typography>
              <Typography variant="body1" color="textSecondary">
                We offer top-quality pet boarding services for your furry
                friend. Our experienced staff will make sure your pet is
                comfortable and happy during their stay with us.
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
                height: 250,
              }}
              component="img"
              image="/images/Grooming.jpg"
              title="Grooming"
            ></CardMedia>
            <CardContent>
              <Typography
                variant="h4"
                component="h2"
                style={{ fontFamily: "Anton" }}
              >
                Grooming
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Our professional grooming services will leave your pet looking
                and feeling their best. We offer a variety of grooming packages
                to fit your pet&apos;s needs.
              </Typography>
            </CardContent>
          </CardActionArea>
        </NextLink>
      </Card>
    </Container>
  );
}

export default Services;
