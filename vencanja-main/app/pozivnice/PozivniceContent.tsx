import FeaturedBox from "@/components/featuredInvites/FeaturedBox";
import Section from "@/components/layout/Section";
import SwitchToggle from "@/components/packages/SwitchToggle";
import { allProjects } from "@/data/data";
import { Tag } from "@/types/general";
import { useState } from "react";
import styles from "./PozivniceContent.module.css";

const PozivniceContent = () => {
  const [selected, setSelected] = useState<Tag | "">(Tag.WEDDING);

  const filteredTemplates = allProjects.filter((template) => {
    if (selected === "") return true;
    return template.tag === selected;
  });
  return (
    <Section>
      <SwitchToggle selected={selected} onClick={setSelected} />
      <div className={styles.container}>
        {filteredTemplates.map((item) => (
          <FeaturedBox key={item.id} {...item} />
        ))}
      </div>
    </Section>
  );
};

export default PozivniceContent;
