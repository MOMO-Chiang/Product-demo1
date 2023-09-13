import { CSSProperties, FC, useEffect, useRef, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import { Chart, Tick } from 'chart.js/auto';

export type StackedBarChartDataset = {
  label: string;
  data: number[];
  backgroundColor: string;
};

export type StackedBarChartTicksCallBack = {
  tickValue: string | number;
  index: number;
  ticks?: Tick[];
};

export type StackedBarChartTicksConfig = {
  autoSkip?: boolean;
};

export type StackedBarChartContext = {
  datasetIndex: number;
  dataIndex: number;
  dataset: StackedBarChartDataset;
  label: string;
};

export interface StackedBarChartProps {
  id?: string;
  labels: string[];
  datasets: StackedBarChartDataset[];
  customTooltipLabel?: (context: StackedBarChartContext) => string;
  onClick?: (context: StackedBarChartContext) => void;
  axis?: 'x' | 'y' | undefined;
  ticksCallback?: (
    context: StackedBarChartTicksCallBack,
  ) => string | string[] | number | number[] | null | undefined;
  ticksConfig?: StackedBarChartTicksConfig;
  /** Canvas's width */
  width?: number;
  /** Canvas's height */
  height?: number;
  /** Responsive, default: true */
  responsive?: boolean;
  className?: string;
  style?: CSSProperties;
}

export const StackedBarChart: FC<StackedBarChartProps> = ({
  id,
  labels,
  datasets,
  customTooltipLabel,
  onClick,
  axis,
  ticksCallback,
  ticksConfig,
  width,
  height,
  responsive = true,
  className,
  style,
}) => {
  const [_id] = useState(() => id || uuidV4());
  const chartRef = useRef<any>(null);
  const createChartRef = () => {
    chartRef.current = new Chart(_id, {
      type: 'bar',
      data: {
        labels,
        datasets,
      },
      options: {
        indexAxis: axis,
        plugins: {
          title: {
            display: true,
          },
          legend: {
            position: 'bottom',
          },
          tooltip: {
            callbacks: {
              label: function (context: any) {
                const label = context.dataset.label || ''; // 取得 dataset 的標籤
                const value = context.parsed.y; // 取得條的值
                if (customTooltipLabel) {
                  return customTooltipLabel({
                    datasetIndex: context.datasetIndex,
                    dataIndex: context.dataIndex,
                    dataset: context.dataset,
                    label: context.label,
                  }); // 返回自訂的標籤文字
                }

                return label + ': ' + context.formattedValue;
              },
            },
          },
        },
        responsive,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
            beginAtZero: true,
            ticks: {
              // 修改座標的顯示文字
              callback: function (tickValue: number | string, index: number, ticks: Tick[]) {
                if (ticksCallback) {
                  return ticksCallback({
                    tickValue,
                    index,
                    ticks,
                  });
                }
                return labels[index];
              },
              ...ticksConfig,
            },
          },
        },
        onClick: function (event, elements) {
          if (elements.length > 0) {
            // 獲取被點擊的元素的資訊
            const element = elements[0];
            const datasetIndex = element.datasetIndex;
            const dataIndex = element.index;

            // 在控制台上輸出點擊的資訊
            // console.log('element:', element);
            // console.log('Dataset index:', datasetIndex);
            // console.log('Index:', dataIndex);

            if (onClick) {
              onClick({
                datasetIndex,
                dataIndex,
                dataset: datasets[datasetIndex],
                label: labels[dataIndex],
              });
            }
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
  return <canvas id={_id} style={style} className={className} width={width} height={height} />;
};
