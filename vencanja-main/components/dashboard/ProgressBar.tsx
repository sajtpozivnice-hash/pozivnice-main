import { Progress } from "@/components/ui/progress";
import { FC } from "react";

type ProgressProps = {
  occupied: number;
  capacity: number;
};

const ProgressBar: FC<ProgressProps> = ({ occupied, capacity }) => {
  const progress = (occupied / capacity) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>Popunjenost</span>
        <span>
          {occupied} / {capacity}
        </span>
      </div>

      <Progress value={progress} />
    </div>
  );
};

export default ProgressBar;
