/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import styles from "../utils/style.module.css";
import { Typography } from "@material-ui/core";
import Aos from "aos";
import "aos/dist/aos.css";
const Aboutus = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  return (
    <div className={styles.image}>
      <img
        data-aos="fade-right"
        className={styles.image1}
        src="images/aboutus.jpg"
        alt="about us"
      />

      <Typography
        data-aos="fade-left"
        variant="body"
        className={styles.textAbout}
      >
        BARKPACK OFFERS A COMPLETE PACKAGE FOR YOUR PET. We provide quality care
        with style & comfort in our grooming services. We are committed to serve
        you the best products for your pet at the lowest prices. operates both
        online and physical store to provide and ensure everything that a pet
        owners need for a long and happy life.
        <br /> nextline
      </Typography>
    </div>
  );
};

export default Aboutus;
