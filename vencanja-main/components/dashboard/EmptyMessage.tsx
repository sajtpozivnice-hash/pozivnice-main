import { FolderOpen, LucideIcon } from "lucide-react";
import { FC, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { DashboardAccent, DASHBOARD_ACCENTS } from "./theme";

type EmptyMessageProps = {
  title: string;
  description: string;
  action?: ReactNode;
  icon?: LucideIcon;
  accent?: DashboardAccent;
};

const EmptyMessage: FC<EmptyMessageProps> = ({
  title,
  description,
  action,
  icon: Icon = FolderOpen,
  accent = "home",
}) => {
  const tokens = DASHBOARD_ACCENTS[accent];

  return (
    <div
      className={cn(
        "dashboard-fade-in mx-auto flex w-full max-w-[640px] flex-col items-center gap-5 rounded-2xl border border-dashed px-5 py-12 text-center sm:px-8 sm:py-14",
        tokens.border,
        `bg-gradient-to-b ${tokens.gradient}`,
      )}
    >
      <div
        className={cn(
        "flex h-16 w-16 items-center justify-center rounded-2xl shadow-sm",
        tokens.chip,
      )}
    >
      <Icon className="h-8 w-8" />
    </div>
      <div className="space-y-2">
        <h3 className="text-balance text-xl font-semibold tracking-tight text-foreground">
          {title}
        </h3>
        <p className="mx-auto max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
      {action ? (
        <div className="flex w-full justify-center pt-1 [&>*]:w-full [&>*]:sm:w-auto">
          {action}
        </div>
      ) : null}
    </div>
  );
};

export default EmptyMessage;
