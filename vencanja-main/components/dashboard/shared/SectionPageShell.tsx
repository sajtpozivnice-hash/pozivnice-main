"use client";

import { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { DashboardAccent, DASHBOARD_ACCENTS } from "../theme";

type SectionPageShellProps = {
  title: string;
  description: string;
  accent: DashboardAccent;
  children: ReactNode;
  actions?: ReactNode;
};

const SectionPageShell = ({
  title,
  description,
  accent,
  children,
  actions,
}: SectionPageShellProps) => {
  const tokens = DASHBOARD_ACCENTS[accent];
  const Icon = tokens.icon;

  return (
    <Card
      className={cn(
        "dashboard-card dashboard-fade-in min-w-0 overflow-hidden border-0 ring-1 ring-border/50",
      )}
    >
      <div className={cn("h-1 w-full", tokens.solid)} />
      <CardHeader className="gap-3 border-b border-border/50 bg-gradient-to-r from-white to-transparent pb-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 items-start gap-3">
            <span
              className={cn(
                "mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                tokens.chip,
              )}
            >
              <Icon className="h-5 w-5" />
            </span>
            <div className="min-w-0 space-y-1">
              <CardTitle className="text-lg tracking-tight sm:text-xl">
                {title}
              </CardTitle>
              <CardDescription className="max-w-2xl text-sm leading-relaxed">
                {description}
              </CardDescription>
            </div>
          </div>
          {actions}
        </div>
      </CardHeader>
      <CardContent className="min-w-0 p-3 sm:p-5">{children}</CardContent>
    </Card>
  );
};

export default SectionPageShell;
