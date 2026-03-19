"use client";

import {
  ArcElement,
  ChartOptions,
  Chart as ChartJS,
  Legend,
  Tooltip,
} from "chart.js";
import { ReactNode } from "react";
import { Pie } from "react-chartjs-2";

import ChartCard from "@/components/ChartCard";
import { BYTES_PER_GB, formatStorageDisplay } from "@/lib/utils";

ChartJS.register(ArcElement, Tooltip, Legend);

const TOTAL_STORAGE_BYTES = 2 * BYTES_PER_GB;

const FILE_TYPE_COLORS: Record<string, string> = {
  Documents: "#FF7474",
  Images: "#56b8ff",
  Video: "#3DD9B3",
  Audio: "#eea8fd",
  Others: "#f9ab72",
};

/** Shared legend styling for pie charts (indicator size + label text). */
const pieLegendLabelStyle = {
  usePointStyle: true as const,
  pointStyle: "circle" as const,
  padding: 18,
  font: { size: 13 },
  boxWidth: 12,
  boxHeight: 12,
};

export type TotalSpaceData = {
  document: { size: number; latestDate: string };
  image: { size: number; latestDate: string };
  video: { size: number; latestDate: string };
  audio: { size: number; latestDate: string };
  other: { size: number; latestDate: string };
  used?: number;
  all?: number;
};

type ReusableChartCardProps = {
  title: string;
  subtitle: string;
  hasData?: boolean;
  children: ReactNode;
};

const ReusableChartCard = ({
  title,
  subtitle,
  hasData = true,
  children,
}: ReusableChartCardProps) => {
  return (
    <ChartCard title={title} subtitle={subtitle} hasData={hasData}>
      {children}
    </ChartCard>
  );
};

export const Chart = ({ totalSpace }: { totalSpace: TotalSpaceData | null }) => {
  const chartData = [
    { name: "Documents", value: totalSpace?.document?.size ?? 0 },
    { name: "Images", value: totalSpace?.image?.size ?? 0 },
    { name: "Video", value: totalSpace?.video?.size ?? 0 },
    { name: "Audio", value: totalSpace?.audio?.size ?? 0 },
    { name: "Others", value: totalSpace?.other?.size ?? 0 },
  ].filter((d) => d.value > 0);

  const data = {
    labels: chartData.map((d) => d.name),
    datasets: [
      {
        data: chartData.map((d) => d.value),
        backgroundColor: chartData.map((d) => FILE_TYPE_COLORS[d.name] ?? "#888"),
        borderWidth: 0,
        radius: "92%",
      },
    ],
  };

  const options: ChartOptions<"pie"> = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: { top: 6, right: 6, bottom: 6, left: 6 },
    },
    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          ...pieLegendLabelStyle,
          generateLabels: (chart: ChartJS) => {
            const dataset = chart.data.datasets[0];
            const data = chart.data.labels?.map((label, i) => ({
              label: String(label),
              value: dataset.data[i] as number,
            })) ?? [];
            return data.map((d) => ({
              text: `${d.label}: ${formatStorageDisplay(d.value)}`,
              fillStyle: d.label ? FILE_TYPE_COLORS[d.label] : "#888",
            }));
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context: { label?: string; raw?: unknown }) =>
            `${context.label ?? ""}: ${formatStorageDisplay(Number(context.raw ?? 0))}`,
        },
      },
    },
  };

  return (
    <ReusableChartCard
      title="Storage by Type"
      subtitle="Breakdown by file category"
      hasData={chartData.length > 0}
    >
      <Pie data={data} options={options} />
    </ReusableChartCard>
  );
};

const USED_COLOR = "#fa7275";
const AVAILABLE_COLOR = "#e8eaed";

export const StorageUsageChart = ({
  totalSpace,
}: {
  totalSpace: TotalSpaceData | null;
}) => {
  const used = Number(totalSpace?.used ?? 0);
  const all = Number(totalSpace?.all ?? TOTAL_STORAGE_BYTES);
  const available = Math.max(0, all - used);

  const data = {
    labels: ["Used", "Available"],
    datasets: [
      {
        data: [used, available],
        backgroundColor: [USED_COLOR, AVAILABLE_COLOR],
        borderWidth: 0,
        radius: "92%",
      },
    ],
  };

  const options: ChartOptions<"pie"> = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: { top: 6, right: 6, bottom: 6, left: 6 },
    },
    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          ...pieLegendLabelStyle,
          generateLabels: (chart: ChartJS) => {
            const dataset = chart.data.datasets[0];
            const labels = chart.data.labels ?? [];
            const colors = Array.isArray(dataset.backgroundColor)
              ? dataset.backgroundColor
              : [USED_COLOR, AVAILABLE_COLOR];
            return labels.map((label, i) => ({
              text: `${label}: ${formatStorageDisplay(Number(dataset.data[i] ?? 0))}`,
              fillStyle: (colors[i] as string) ?? "#888",
            }));
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context: { label?: string; raw?: unknown }) =>
            `${context.label ?? ""}: ${formatStorageDisplay(Number(context.raw ?? 0))}`,
        },
      },
    },
  };

  return (
    <ReusableChartCard
      title="Storage Used"
      subtitle="Used vs available space"
    >
      <Pie data={data} options={options} />
    </ReusableChartCard>
  );
};
