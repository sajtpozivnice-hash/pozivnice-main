"use client";

import FooterBottom from "./components/FooterBottom";
import RsvpForm from "./components/RsvpForm";
import OurStory from "./components/OurStory";
import Hero from "./components/Hero";
import styles from "./css/Components.module.css";
import BoxSection from "./components/BoxSection";
import { hsvaToHex } from "@uiw/react-color";
import InviteCalendar from "./components/InviteCalendar/InviteCalendar";
import { useInviteConfig } from "./InviteConfigContext";
import InviteFontWrapper from "./InviteFontWrapper";

const Wedding01 = () => {
  const { config } = useInviteConfig();
  return (
    <InviteFontWrapper>
      <Hero>
        <div className={styles.container}>
          {config.calendar.visible && <InviteCalendar />}
          {config.firstSection.visible && <OurStory />}
          {config.boxSection.visible && <BoxSection />}
          <RsvpForm />
        </div>
        <FooterBottom />
      </Hero>
    </InviteFontWrapper>
  );
};

export default Wedding01;
