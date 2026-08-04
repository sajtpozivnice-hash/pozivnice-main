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
    <Card className="mx-auto w-full max-w-[600px] px-2 py-8 text-center sm:py-12">
      <CardHeader className="flex flex-col items-center gap-2">
        <FolderOpen className="mb-2 h-12 w-12 text-muted-foreground sm:h-14 sm:w-14" />

        <CardTitle className="text-balance">{title}</CardTitle>

        <CardDescription className="text-pretty">{description}</CardDescription>
      </CardHeader>

      <CardContent className="flex justify-center [&>*]:w-full [&>*]:sm:w-auto">
        {action}
      </CardContent>
    </Card>
  );
};

export default EmptyMessage;
