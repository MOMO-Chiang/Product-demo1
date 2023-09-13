import { FC, useEffect, useRef, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import { Chart } from 'chart.js/auto';
import { DefaultBackGroundColor } from './ChartDefaultColor';

export type LineChartDataset = {
  label: string;
  data: number[];
  borderColor?: string | string[];
  hoverOffset?: number;
  fill?: false;
};

export type LineChartContext = {
  datasetIndex: number;
  dataIndex: number;
  dataset: LineChartDataset;
  label: string;
  value: number;
};

export interface LineChartProps {
  id?: string;
  labels: string[];
  datasets: LineChartDataset[];
}

export const LineChart: FC<LineChartProps> = ({ id, labels, datasets }) => {
  const [_id] = useState(id || uuidV4());
  const chartRef = useRef<any>(null);
  const createChartRef = () => {
    chartRef.current = new Chart(_id, {
      type: 'line',
      data: {
        labels,
        datasets: datasets.map((d) => ({
          ...d,
          borderColor: d.borderColor || DefaultBackGroundColor,
          borderWidth: 3,
        })),
      },
      options: {
        plugins: {
          legend: {
            position: 'bottom',
            onClick: function (e, item) {
              const activePoints = item.datasetIndex;
              const currentActiveWidth = chartRef.current.data.datasets[activePoints ? activePoints : 0];
              if (currentActiveWidth.borderWidth == 8) {
                currentActiveWidth.borderWidth = 3;
              } else {
                currentActiveWidth.borderWidth = 8;
              }
              chartRef.current.update();
            },
          },
        },
        maintainAspectRatio: false, // 禁用維持縱橫比
        scales: {
          x: {
            ticks: {
              autoSkip: false,
            },
          },
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

  return <canvas id={_id} style={{ height: '400px' }} />;
};
