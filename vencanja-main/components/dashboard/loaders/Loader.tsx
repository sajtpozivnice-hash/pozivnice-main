import { Loader2 } from "lucide-react";

type LoaderProps = {
  size?: number;
  className?: string;
};

const Loader = ({ size = 24, className = "" }: LoaderProps) => {
  return (
    <Loader2
      className={`animate-spin ${className}`}
      style={{
        width: size,
        height: size,
      }}
    />
  );
};

export default Loader;
