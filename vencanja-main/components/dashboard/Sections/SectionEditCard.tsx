import { LucideIcon, Pencil } from "lucide-react";
import { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SectionLoader from "../loaders/SectionLoader";

type SectionEditCardProps = {
  title: string;
  description?: string;
  icon: LucideIcon;
  visible: boolean;
  loading?: boolean;
  onEdit: () => void;
  children: ReactNode;
  editLabel?: string;
};

export const SectionEditCard = ({
  title,
  description,
  icon: Icon,
  visible,
  loading = false,
  onEdit,
  children,
  editLabel = "Izmeni sekciju",
}: SectionEditCardProps) => {
  if (loading) {
    return (
      <Card className="w-full border shadow-sm">
        <CardContent>
          <SectionLoader />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="min-w-0 border shadow-sm transition-shadow hover:shadow-md">
      <CardHeader className="border-b pb-4">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted text-foreground">
            <Icon className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1 space-y-1">
            <CardTitle className="truncate text-base font-semibold tracking-tight">
              {title}
            </CardTitle>
            {description ? (
              <CardDescription className="text-xs leading-relaxed break-words">
                {description}
              </CardDescription>
            ) : null}
          </div>
        </div>
        <CardAction className="shrink-0 self-start">
          <Badge variant={visible ? "default" : "destructive"}>
            {visible ? "Vidljiva" : "Sakrivena"}
          </Badge>
        </CardAction>
      </CardHeader>

      <CardContent className="space-y-3 pt-1">{children}</CardContent>

      <CardFooter className="flex-col gap-2">
        <Button className="w-full cursor-pointer" onClick={onEdit}>
          <Pencil className="h-4 w-4" />
          {editLabel}
        </Button>
      </CardFooter>
    </Card>
  );
};
