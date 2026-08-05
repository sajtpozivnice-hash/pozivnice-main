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
    <Card className="min-w-0 overflow-hidden border-0 bg-gradient-to-br from-stone-50 via-white to-white shadow-[0_1px_2px_rgb(15_23_42_/_0.04),0_8px_24px_rgb(15_23_42_/_0.05)] ring-1 ring-border/50 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgb(15_23_42_/_0.08)]">
      <CardHeader className="border-b border-border/50 pb-4">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-stone-100 text-stone-700">
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
          <Badge
            variant="outline"
            className={
              visible
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-rose-200 bg-rose-50 text-rose-700"
            }
          >
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
