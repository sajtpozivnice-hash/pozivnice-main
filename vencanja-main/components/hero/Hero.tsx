"use client";

import Button from "../button/Button";
import AnimatedArrowRight from "../icons/AnimatedArrowRight";
import AnimatedMail from "../icons/AnimatedMail";
import { motion } from "framer-motion";

import styles from "./Hero.module.css";
import HeroBadge from "./HeroBadge";
import Link from "next/link";
import Heading from "../shared/typography/Heading";
import Paragraph from "../shared/typography/Paragraph";

const Hero = () => {
  return (
    <div className={styles.background}>
      <div className={styles.heroContent}>
        <HeroBadge text={"Ekskluzivne pozivnice"} />
        <Heading className={`${styles.mainTitle}`}>
          <span className={styles.mainTitleSpan}>Elegantne</span> <br />
          online pozivnice
        </Heading>
        <Paragraph center={false} variant="subtitle">
          Od venčanja do rođendana, pravimo unikatne pozivnice
          <br />
          za svaki važan događaj
        </Paragraph>
        <motion.div
          className={styles.heroButtons}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Button
            icon={AnimatedArrowRight}
            iconSize={30}
            iconDelay={0.6}
            buttonDelay={0.1}
            buttonDuration={0.7}
            maxWidth={300}
          >
            <Link href={"/pozivnice"} className="white-color">
              Pogledaj Pozivnice
            </Link>
          </Button>
          <Button
            variant="secondary"
            icon={AnimatedMail}
            iconSize={30}
            iconDelay={0.6}
            buttonDelay={0.1}
            buttonDuration={0.7}
            maxWidth={300}
          >
            <Link href="/kontakt" className="white-color">
              Pošalji Upit
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
