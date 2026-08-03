import { FolderOpen } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { FC, ReactNode } from "react";

type EmptyMessageProps = {
  title: string;
  description: string;
  action: ReactNode;
};

const EmptyMessage: FC<EmptyMessageProps> = ({
  title,
  description,
  action,
}) => {
  return (
    <Card className="w-full max-w-[600px] mx-auto text-center py-12">
      <CardHeader className="flex flex-col items-center">
        <FolderOpen className="h-14 w-14 text-muted-foreground mb-2" />

        <CardTitle>{title}</CardTitle>

        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent className="flex justify-center">{action}</CardContent>
    </Card>
  );
};

export default EmptyMessage;
