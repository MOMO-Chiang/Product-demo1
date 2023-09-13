import { FC, useEffect, useRef, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import { Chart } from 'chart.js/auto';
import { DefaultBackGroundColor } from './ChartDefaultColor';

export type PieChartDataset = {
  label: string;
  data: number[];
  backgroundColor?: string | string[];
  hoverOffset?: number;
};

export type PieChartContext = {
  datasetIndex: number;
  dataIndex: number;
  dataset: PieChartDataset;
  label: string;
  value: number;
};

export interface PieChartProps {
  id?: string;
  labels: string[];
  datasets: PieChartDataset[];
  customTooltipLabel?: (context: PieChartContext) => string;
}

export const PieChart: FC<PieChartProps> = ({ id, labels, datasets, customTooltipLabel }) => {
  const [_id] = useState(id || uuidV4());
  const chartRef = useRef<any>(null);
  let totalCount = 0;
  datasets[0].data.forEach((x) => (totalCount += x));
  const createChartRef = () => {
    chartRef.current = new Chart(_id, {
      type: 'pie',
      data: {
        labels,
        datasets: datasets.map((d) => ({
          ...d,
          backgroundColor: d.backgroundColor || DefaultBackGroundColor,
        })),
      },
      options: {
        plugins: {
          legend: {
            position: 'bottom',
          },
          tooltip: {
            callbacks: {
              label: function (context: any) {
                const datasetLabel = context.dataset.label || '';
                const value = context.parsed; // 取得值

                if (customTooltipLabel) {
                  return customTooltipLabel({
                    datasetIndex: context.datasetIndex,
                    dataIndex: context.dataIndex,
                    dataset: context.dataset,
                    label: context.label,
                    value,
                  }); // 返回自訂的標籤文字
                }
                return datasetLabel ? datasetLabel + ': ' + value : value;
              },
              title: function (context: any) {
                return `${context[0].label}:${((context[0].raw / totalCount) * 100).toFixed(2)}%`;
              },
            },
          },
        },
        onClick: function (event, elements) {
          if (elements.length > 0) {
            // 獲取被點擊的元素的資訊
            const element = elements[0];
            const datasetIndex = element.datasetIndex;
            const index = element.index;
          }
        },
      },
    });
  };

  // Draw Chart
  useEffect(() => {
    // 若為更新，把原本的圖 destroy
    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }

    // 繪圖
    createChartRef();
  }, [labels, datasets]);

  return <canvas id={_id} />;
};
