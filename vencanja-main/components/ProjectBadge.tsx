import { Tag } from "@/types/general";
import { FC } from "react";

type ProjectBadgeProps = {
  tag: Tag;
};

const ProjectBadge: FC<ProjectBadgeProps> = ({ tag }) => {
  const colorHandler = () => {
    switch (tag) {
      case Tag.WEDDING:
        return "var(--color-hot)";
      case Tag.COMING_OF_AGE:
        return "var(--color-accent)";
      case Tag.KIDS_BIRTHDAY:
        return "var(--color-accent)";
      case Tag.BAPTISM:
        return "var(--color-accent)";
      default:
        return "var(--color-accent)";
    }
  };
  return (
    <div
      style={{
        background: colorHandler(),
        maxWidth: "140px",
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
