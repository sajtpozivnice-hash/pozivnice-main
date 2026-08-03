import Calendar from "./components/Calendar";
import { Countdown } from "./components/Countdown";
import { Details } from "./components/Details";
import Footer from "./components/Footer";
import { Hero } from "./components/Hero";
import { RSVP } from "./components/RSVP";

const Birthday01 = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Calendar
        date={"2026-05-11"}
        color={"#fff"}
        background={"#e29578"}
        font={""}
      />
      <Countdown />
      <Details />
      <RSVP />
      <Footer />
    </div>
  );
};

export default Birthday01;
