import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EyeIcon, EyeOff } from "lucide-react";

type SectionModalVisibilityBarProps = {
  isVisible: boolean;
  onToggle: () => void;
};

export const SectionModalVisibilityBar = ({
  isVisible,
  onToggle,
}: SectionModalVisibilityBarProps) => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button
        type="button"
        variant="outline"
        className="cursor-pointer"
        onClick={onToggle}
      >
        {isVisible ? "Sakrij sa sajta" : "Prikaži na sajtu"}
        {isVisible ? <EyeOff /> : <EyeIcon />}
      </Button>
      <Badge variant={isVisible ? "default" : "destructive"}>
        {isVisible ? "Vidljiva na sajtu" : "Sakrivena"}
      </Badge>
    </div>
  );
};
