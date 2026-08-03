import { Tag } from "@/types/general";
import { FC } from "react";

type ProjectBadgeProps = {
  tag: Tag;
};

const ProjectBadge: FC<ProjectBadgeProps> = ({ tag }) => {
  const colorHandler = () => {
    if (tag === Tag.WEDDING) {
      return "var(--color-hot)";
    } else if (tag === Tag.BIRTHDAY) {
      return "var(--color-accent)";
    } else {
      return "var(--color-accent)";
    }
  };
  return (
    <div
      style={{
        background: colorHandler(),
        maxWidth: "100px",
        padding: "3px",
        borderRadius: "var(--radius)",
        textAlign: "center",
      }}
    >
      <p style={{ fontWeight: "bold" }}>{tag}</p>
    </div>
  );
};

export default ProjectBadge;
