const fs = require("fs");
const path = require("path");

const stories = {
  "krstenje-classic": {
    title: "O našoj radosti",
    overline: "Porodični blagoslov",
    text: "Sa verom i ljubavlju pozivamo vas da budete uz nas na danu krštenja. Ovaj trenutak je početak novog puta — blagosloven, topao i pun porodične radosti.\n\nTekstove lako prilagodite i za dečiji rođendan: promenite naslov, raspored i poruku u editoru.",
  },
  "krstenje-garden": {
    title: "Pod otvorenim nebom",
    overline: "Porodična proslava",
    text: "Okupljamo se napolju, među zelenilom i smehom, da proslavimo blagoslovljen dan. Krštenje i okupljanje posle toga su jedno: porodica, prijatelji i lagani trenuci.\n\nŠablon takođe možete pretvoriti u rođendansku pozivnicu — promenite hero, program i lokacije.",
  },
  "krstenje-candle": {
    title: "U svetlosti",
    overline: "Svečani trenutak",
    text: "U tišini sveće i toplom sjaju okupljamo one koji su nam najdraži. Krštenje je naš svečani trenutak zahvalnosti i vere.\n\nAko želite svečani dečiji rođendan, zadržite atmosferu — promenite samo tekstove i program u editoru.",
  },
};

const weddingRe =
  /text: "Upoznali smo se 2022\. godine[\s\S]*?zajedno\."/;

for (const [key, s] of Object.entries(stories)) {
  const file = path.join(__dirname, "..", "templates", key, "config.ts");
  let src = fs.readFileSync(file, "utf8");
  if (!weddingRe.test(src)) {
    console.log("NO MATCH", key);
    continue;
  }
  src = src.replace(
    /(type: "ourStory",[\s\S]*?title: ")[^"]*(")/,
    `$1${s.title}$2`,
  );
  src = src.replace(
    /(type: "ourStory",[\s\S]*?overline: ")[^"]*(")/,
    `$1${s.overline}$2`,
  );
  src = src.replace(weddingRe, () => {
    const escaped = s.text.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
    return `text: "${escaped}"`;
  });
  fs.writeFileSync(file, src);
  console.log("story", key);
}

// export seeds eventTypes for baptism packs
const seeds = path.join(__dirname, "export-admin-template-seeds.ts");
let seedSrc = fs.readFileSync(seeds, "utf8");
seedSrc = seedSrc.replace(
  /eventTypes: \["baptism"\]/g,
  'eventTypes: ["baptism", "kidsBirthday"]',
);
fs.writeFileSync(seeds, seedSrc);
console.log("seeds eventTypes updated");
