import { Box, Typography } from "@material-ui/core";
import Aos from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";
import styles from "../utils/style.module.css";
import Navbar from "../homepage/navbar";
import Services from "../homepage/services";
import Footer from "./footer";

export default function Services2() {
  useEffect(() => {
    Aos.init({ duration: 2500 });
  }, []);

  return (
    <div>
      <Navbar />
      <Box
        data-aos="fade-right"
        display="flex"
        justifyContent={"center"}
        style={{
          textAlign: "center",
          p: 4,
        }}
      >
        <Typography className={styles.petBoardingText}>Our Services</Typography>
      </Box>
      <Services />
      <br />
      <br />
      <br />
      <Footer />
    </div>
  );
}
