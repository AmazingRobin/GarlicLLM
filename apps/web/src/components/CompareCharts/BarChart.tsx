"use client";

import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import type { Model } from "@/lib/api";

interface BarChartProps {
  models: Model[];
  metric: "coding" | "reasoning" | "multimodal" | "efficiency";
}

export function BarChart({ models, metric }: BarChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    chartInstance.current = echarts.init(chartRef.current, "dark");

    const handleResize = () => {
      chartInstance.current?.resize();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chartInstance.current?.dispose();
    };
  }, []);

  useEffect(() => {
    if (!chartInstance.current || models.length === 0) return;

    const metricLabels = {
      coding: "Coding",
      reasoning: "Reasoning",
      multimodal: "Multimodal",
      efficiency: "Efficiency",
    };

    const sortedModels = [...models].sort(
      (a, b) => b.scores[metric] - a.scores[metric]
    );

    const colors = sortedModels.map((_, index) => {
      // Gradient from purple to cyan based on rank
      const ratio = index / (sortedModels.length - 1 || 1);
      return {
        type: "linear" as const,
        x: 0,
        y: 0,
        x2: 1,
        y2: 0,
        colorStops: [
          { offset: 0, color: `rgba(107, 78, 255, ${1 - ratio * 0.5})` },
          { offset: 1, color: `rgba(0, 255, 209, ${0.5 + ratio * 0.5})` },
        ],
      };
    });

    const option: echarts.EChartsOption = {
      backgroundColor: "transparent",
      title: {
        text: metricLabels[metric],
        left: "center",
        textStyle: {
          color: "#E6EEF6",
          fontSize: 16,
          fontWeight: "bold",
        },
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
        backgroundColor: "rgba(10, 15, 29, 0.95)",
        borderColor: "rgba(107, 78, 255, 0.5)",
        textStyle: {
          color: "#E6EEF6",
        },
        formatter: (params: unknown) => {
          const data = (params as { name: string }[])[0];
          const model = sortedModels.find((m) => m.name === data.name);
          if (model) {
            const confidenceColor = {
              high: "#10B981",
              medium: "#F59E0B",
              low: "#EF4444",
            }[model.confidence];

            return `
              <div style="padding: 8px;">
                <div style="font-weight: bold; margin-bottom: 4px;">${model.name}</div>
                <div style="font-size: 20px; color: #6B4EFF;">${model.scores[metric]}</div>
                <div style="margin-top: 8px; font-size: 11px;">
                  <span style="color: ${confidenceColor};">● ${model.confidence.toUpperCase()}</span>
                </div>
                <div style="font-size: 11px; color: #9CA3AF; margin-top: 4px;">
                  ${model.source}
                </div>
              </div>
            `;
          }
          return "";
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "15%",
        top: "15%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: sortedModels.map((m) => m.name),
        axisLabel: {
          color: "#9CA3AF",
          fontSize: 11,
          rotate: 30,
          interval: 0,
        },
        axisLine: {
          lineStyle: {
            color: "rgba(255, 255, 255, 0.1)",
          },
        },
      },
      yAxis: {
        type: "value",
        min: 0,
        max: 100,
        splitLine: {
          lineStyle: {
            color: "rgba(255, 255, 255, 0.05)",
          },
        },
        axisLabel: {
          color: "#9CA3AF",
        },
      },
      series: [
        {
          type: "bar",
          data: sortedModels.map((m, i) => ({
            value: m.scores[metric],
            itemStyle: {
              color: colors[i],
              borderRadius: [4, 4, 0, 0],
            },
          })),
          barWidth: "60%",
          emphasis: {
            itemStyle: {
              shadowBlur: 20,
              shadowColor: "rgba(107, 78, 255, 0.5)",
            },
          },
          animationDelay: (idx) => idx * 100,
        },
      ],
      animationDuration: 1000,
      animationEasing: "elasticOut",
    };

    chartInstance.current.setOption(option, true);
  }, [models, metric]);

  return <div className="w-full h-[300px]" ref={chartRef} />;
}
