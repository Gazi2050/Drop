"use client";

import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  Tooltip,
} from "chart.js";
import { Pie } from "react-chartjs-2";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { convertFileSize } from "@/lib/utils";

ChartJS.register(ArcElement, Tooltip, Legend);

const FILE_TYPE_COLORS: Record<string, string> = {
  Documents: "#FF7474",
  Images: "#56b8ff",
  Video: "#3DD9B3",
  Audio: "#eea8fd",
  Others: "#f9ab72",
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

export const Chart = ({ totalSpace }: { totalSpace: TotalSpaceData | null }) => {
  const chartData = [
    { name: "Documents", value: totalSpace?.document?.size ?? 0 },
    { name: "Images", value: totalSpace?.image?.size ?? 0 },
    { name: "Video", value: totalSpace?.video?.size ?? 0 },
    { name: "Audio", value: totalSpace?.audio?.size ?? 0 },
    { name: "Others", value: totalSpace?.other?.size ?? 0 },
  ].filter((d) => d.value > 0);

  const totalUsed = totalSpace?.used ?? 0;

  const data = {
    labels: chartData.map((d) => d.name),
    datasets: [
      {
        data: chartData.map((d) => d.value),
        backgroundColor: chartData.map((d) => FILE_TYPE_COLORS[d.name] ?? "#888"),
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
          labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 8,
          font: { size: 11 },
          generateLabels: (chart: ChartJS) => {
            const dataset = chart.data.datasets[0];
            const data = chart.data.labels?.map((label, i) => ({
              label: String(label),
              value: dataset.data[i] as number,
            })) ?? [];
            return data.map((d) => ({
              text: `${d.label}: ${convertFileSize(d.value)}`,
              fillStyle: d.label ? FILE_TYPE_COLORS[d.label] : "#888",
            }));
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context: { label?: string; raw?: unknown }) =>
            `${context.label ?? ""}: ${convertFileSize(Number(context.raw ?? 0))}`,
        },
      },
    },
  };

  return (
    <Card className="chart gap-2 py-3">
      <CardContent className="flex-1 p-0 pt-0">
        <div className="chart-container">
          {chartData.length > 0 ? (
            <Pie data={data} options={options} />
          ) : (
            <div className="flex h-full min-h-[200px] items-center justify-center text-white/70">
              No files uploaded
            </div>
          )}
        </div>
      </CardContent>
      <CardHeader className="chart-details">
        <CardTitle className="chart-title">Storage by Type</CardTitle>
        <CardDescription className="chart-description">
          {convertFileSize(totalUsed)} / 2GB total
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
