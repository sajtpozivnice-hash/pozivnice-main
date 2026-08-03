import Footer from "./components/footer/Footer";
import Hero from "./components/hero/Hero";
import Navigation from "./components/navigation/Navigation";
import OurStory from "./components/ourStory/OurStory";
import RSVP from "./components/rsvp/Rsvp";
import Schedule from "./components/schedule/Schedule";
import Location from "./components/location/Location";
import { useConfig } from "./ConfigContext";
import InviteCalendar from "./components/InviteCalendar/InviteCalendar";
import InviteFontWrapper from "./InviteFontWrapper";

const Wedding02 = () => {
  const { config } = useConfig();
  return (
    <InviteFontWrapper>
      <Navigation />
      <main>
        <Hero />
        {config.calendar.visible && <InviteCalendar />}
        {config.ourStory.visible && <OurStory />}
        {config.theBigDay.visible && <Schedule />}
        {config.destination.visible && <Location />}
        <RSVP />
      </main>
      <Footer />
    </InviteFontWrapper>
  );
};

export default Wedding02;
