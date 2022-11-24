import React, { useEffect } from "react";
import styles from "../utils/style.module.css";
import Aos from "aos";
import "aos/dist/aos.css";
function Header1() {
  useEffect(() => {
    Aos.init({ duration: 2500 });
  }, []);
  return (
    <div className={styles.dm1}>
      <div className={styles.imgdiv}>
        {" "}
        <img
          data-aos="zoom-in-up"
          src="images/happyplace.jpg"
          alt="happy place"
          className={styles.happyplace}
        ></img>
      </div>
      <div
        data-aos="fade-right"
        data-aos-easing="linear"
        data-aos-duration="1500"
        className={styles.d1}
      >
        <h1 className={styles.h1}>
          Are you wondering what color your dog is most attracted to?{" "}
        </h1>
        <p className={styles.p1}>
          You might be wondering the importance of colors in your dog’s daily
          life. Having the right color toys and accessories can mean that the
          dog can easily identify them and does not have a hard time finding
          them. It also means that the dog does not lose its toys quickly. Don’t
          you recall your dog scrambling for a toy while it is right in front of
          them?
        </p>
        <p className={styles.p2}>
          Colors also play a very significant factor when it comes to dog
          sports. The colors that a handler wears or the color of the course’s
          obstacles can adversely impact the performance of the dog. It is
          essential for the handler to contrast their clothing with that of the
          background so that the dog can easily identify the signals. Clothing
          that blends with the background will mean that the dog will have a
          hard time seeing the signals and can miss them, leading to a mistake.
        </p>
        <p className={styles.p2}>
          So, keeping colors into account when buying products for your dog will
          help your dog as well. While yellow is certainly not as attractive to
          us as a baby pink or flaming red, your best friend certainly seems to
          think so.
        </p>
      </div>
    </div>
  );
}

export default Header1;
