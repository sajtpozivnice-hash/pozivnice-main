import { Progress } from "@/components/ui/progress";
import { FC } from "react";

type ProgressProps = {
  occupied: number;
  capacity: number;
};

const ProgressBar: FC<ProgressProps> = ({ occupied, capacity }) => {
  const safeCapacity = capacity > 0 ? capacity : 1;
  const progress = Math.min((occupied / safeCapacity) * 100, 100);

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Popunjenost</span>
        <span className="font-medium text-foreground">
          {occupied} / {capacity}
        </span>
      </div>
      <Progress value={progress} />
    </div>
  );
};

export default ProgressBar;
