import { FontKey } from "@/fontsForInvites";
import { DateFormat } from "@/helpers/formatDate";

export type DefaultConfig = {
  main: {
    name: string;
    date: string;
    dateFormat: DateFormat;
    primaryFont: FontKey;
  };
  hero: {
    description: string;
    bottomDescription: string;
  };
  calendar: {
    visible: boolean;
  };
  countdown: {
    visible: boolean;
    description: string;
  };
  details: {
    visible: boolean;
    navigationButtonName: string;
    title: string;
    where: {
      title: string;
      localName: string;
      address: string;
    };
    when: {
      title: string;
      description: string;
    };
    concept: {
      title: string;
      description: string;
      quote: string;
    };
  };
  rsvp: {
    visible: boolean;
    title: string;
    description: string;
    buttonText: string;
  };
};

export const defaultConfig: DefaultConfig = {
  main: {
    name: "Ivana",
    date: "2026-05-11",
    dateFormat: "DD_MM_YYYY",
    primaryFont: "greatVibes",
  },
  hero: {
    description: "PUNI 18",

    bottomDescription: "Upadaj u ritam, slavimo 18!",
  },
  calendar: {
    visible: true,
  },
  countdown: {
    visible: true,
    description: "Dok ne počne žurka!",
  },
  details: {
    title: "Detalji Žurke",
    visible: true,
    navigationButtonName: "Put do zurke",
    where: {
      title: "Gde",
      localName: "Splav Amphora",
      address: "Bulevar Nikole Tesle BB, Beograd",
    },
    when: {
      title: "Kada",
      description: "Oktobar 25, 2026",
    },
    concept: {
      title: "Koncept",
      description: "Muzika uzivo",
      quote: "Spremite se za ples!",
    },
  },
  rsvp: {
    visible: true,
    title: "Potvrda Dolaska",
    description: "Javiti do: 01 Septembar, 2026",
    buttonText: "Posalji potvrdu",
  },
};
