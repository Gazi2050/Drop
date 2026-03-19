"use client";

import { ReactNode } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const CHART_BOX_CLASS =
  "mx-auto h-[250px] w-full max-w-[310px] shrink-0 sm:h-[290px] sm:max-w-[350px]";

type ChartCardProps = {
  title: string;
  subtitle: string;
  hasData?: boolean;
  children: ReactNode;
};

const ChartCard = ({
  title,
  subtitle,
  hasData = true,
  children,
}: ChartCardProps) => {
  return (
    <Card className="flex h-full min-h-0 flex-col overflow-hidden rounded-[16px] !bg-white p-3 shadow-[var(--shadow-drop-1)] ring-0 xl:p-4">
      <CardHeader className="shrink-0 space-y-1 px-0 pb-2 pt-0 text-center">
        <CardTitle className="font-bold text-[14px] leading-[20px] text-light-100 xl:text-[16px]">
          {title}
        </CardTitle>
        <p className="text-[10px] font-normal leading-[14px] text-light-200 xl:text-[11px]">
          {subtitle}
        </p>
      </CardHeader>
      <CardContent className="flex min-h-0 flex-1 flex-col items-center justify-center overflow-hidden p-0">
        <div className="flex w-full min-h-0 flex-1 items-center justify-center py-2">
          {hasData ? (
            <div className={CHART_BOX_CLASS}>{children}</div>
          ) : (
            <div className="flex min-h-[120px] items-center justify-center text-light-200">
              No files uploaded
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ChartCard;
