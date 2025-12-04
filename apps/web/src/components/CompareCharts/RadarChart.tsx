"use client";

import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import type { Model } from "@/lib/api";

interface RadarChartProps {
  models: Model[];
  onModelSelect?: (modelId: string) => void;
}

export function RadarChart({ models, onModelSelect }: RadarChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Initialize chart
    chartInstance.current = echarts.init(chartRef.current, "dark");

    // Resize handler
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

    const colors = ["#6B4EFF", "#00FFD1", "#FF4ECD", "#FFD700", "#FF6B6B"];

    const option: echarts.EChartsOption = {
      backgroundColor: "transparent",
      legend: {
        data: models.map((m) => m.name),
        bottom: 0,
        textStyle: {
          color: "#E6EEF6",
          fontSize: 12,
        },
        itemWidth: 12,
        itemHeight: 12,
      },
      tooltip: {
        trigger: "item",
        backgroundColor: "rgba(10, 15, 29, 0.95)",
        borderColor: "rgba(107, 78, 255, 0.5)",
        textStyle: {
          color: "#E6EEF6",
        },
        formatter: (params: unknown) => {
          const p = params as { value?: unknown[]; seriesName?: string };
          if (typeof p.value === 'object' && Array.isArray(p.value)) {
            const model = models.find((m) => m.name === p.seriesName);
            if (model) {
              return `
                <div style="padding: 8px;">
                  <div style="font-weight: bold; margin-bottom: 8px;">${model.name}</div>
                  <div>Coding: ${model.scores.coding}</div>
                  <div>Reasoning: ${model.scores.reasoning}</div>
                  <div>Multimodal: ${model.scores.multimodal}</div>
                  <div>Efficiency: ${model.scores.efficiency}</div>
                  <div style="margin-top: 8px; font-size: 11px; color: #9CA3AF;">
                    Source: ${model.source}
                  </div>
                </div>
              `;
            }
          }
          return "";
        },
      },
      radar: {
        indicator: [
          { name: "Coding", max: 100 },
          { name: "Reasoning", max: 100 },
          { name: "Multimodal", max: 100 },
          { name: "Efficiency", max: 100 },
        ],
        center: ["50%", "45%"],
        radius: "65%",
        axisName: {
          color: "#E6EEF6",
          fontSize: 12,
        },
        splitArea: {
          areaStyle: {
            color: ["rgba(107, 78, 255, 0.05)", "rgba(0, 255, 209, 0.05)"],
          },
        },
        axisLine: {
          lineStyle: {
            color: "rgba(255, 255, 255, 0.1)",
          },
        },
        splitLine: {
          lineStyle: {
            color: "rgba(255, 255, 255, 0.1)",
          },
        },
      },
      series: [
        {
          type: "radar",
          data: models.map((model, index) => ({
            value: [
              model.scores.coding,
              model.scores.reasoning,
              model.scores.multimodal,
              model.scores.efficiency,
            ],
            name: model.name,
            symbol: "circle",
            symbolSize: 6,
            lineStyle: {
              width: 2,
              color: colors[index % colors.length],
            },
            areaStyle: {
              color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
                { offset: 0, color: colors[index % colors.length] + "40" },
                { offset: 1, color: colors[index % colors.length] + "10" },
              ]),
            },
            itemStyle: {
              color: colors[index % colors.length],
            },
          })),
          emphasis: {
            lineStyle: {
              width: 4,
            },
            areaStyle: {
              opacity: 0.8,
            },
          },
        },
      ],
      animation: true,
      animationDuration: 1500,
      animationEasing: "elasticOut",
    };

    chartInstance.current.setOption(option, true);

    // Click handler
    chartInstance.current.on("click", (params) => {
      if (params.seriesName && onModelSelect) {
        const model = models.find((m) => m.name === params.seriesName);
        if (model) {
          onModelSelect(model.id);
        }
      }
    });
  }, [models, onModelSelect]);

  return (
    <div className="w-full h-[400px] md:h-[500px]" ref={chartRef} />
  );
}
