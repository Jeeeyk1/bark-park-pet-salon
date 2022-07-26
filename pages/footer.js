import styles from "../utils/footer.module.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

import TwitterIcon from "@mui/icons-material/Twitter";
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.waves}>
        <div className={styles.wave} id="wave1"></div>
        <div className={styles.wave2} id="wave2"></div>
        <div className={styles.wave3} id="wave3"></div>
        <div className={styles.wave4} id="wave4"></div>
      </div>
      <h2 className={styles.h2}>Bark Park Pet Salon Baguio</h2>

      <ul className={styles.social_icon}>
        <li>
          <a href="#">
            <FacebookIcon />
          </a>
        </li>
        <li>
          <a href="#">
            <InstagramIcon />
          </a>{" "}
        </li>
        <li>
          <a href="#">
            <TwitterIcon />
          </a>{" "}
        </li>
      </ul>
      <ul className={styles.menu}>
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">Products</a>
        </li>
        <li>
          <a href="#">Categories</a>
        </li>
        <li>
          <a href="#">Services</a>
        </li>
      </ul>
      <p className={styles.p1}>
        @2019 Bark Park Pet Salon Baguio | All Rights Reserved
      </p>
    </footer>
  );
}
