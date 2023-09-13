import { CSSProperties, FC, useEffect, useRef, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import { Chart, Tick } from 'chart.js/auto';
import annotationPlugin, { AnnotationTypeRegistry, AnnotationOptions } from 'chartjs-plugin-annotation';
import { _DeepPartialArray, _DeepPartialObject } from 'chart.js/dist/types/utils';

Chart.register(annotationPlugin);

export type BarChartDataset = {
  label: string;
  data: number[];
  backgroundColor?: string | string[];
};

export type BarChartTicksCallBack = {
  tickValue: string | number;
  index: number;
  ticks?: Tick[];
};

export type BarChartTicksConfig = {
  autoSkip?: boolean;
};

export type BarChartContext = {
  datasetIndex: number;
  dataIndex: number;
  dataset: BarChartDataset;
  label: string;
};

export interface BarChartProps {
  id?: string;
  labels: string[];
  datasets: BarChartDataset[];
  customTooltipLabel?: (context: BarChartContext) => string;
  onClick?: (context: BarChartContext) => void;
  axis?: 'x' | 'y' | undefined;
  ticksCallback?: (
    context: BarChartTicksCallBack,
  ) => string | string[] | number | number[] | null | undefined;
  ticksConfig?: BarChartTicksConfig;
  /** Canvas's width */
  width?: number;
  /** Canvas's height */
  height?: number;
  /** Responsive, default: true */
  responsive?: boolean;

  className?: string;

  style?: CSSProperties;

  /** Annotations 設定，參考: `chartjs-plugin-annotation` 套件 */
  annotations?:
    | _DeepPartialArray<AnnotationOptions<keyof AnnotationTypeRegistry>>
    | _DeepPartialObject<Record<string, AnnotationOptions<keyof AnnotationTypeRegistry>>>;
}

export const BarChart: FC<BarChartProps> = ({
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
  annotations,
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
          annotation: {
            annotations,
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
          x: {},
          y: {
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
                return tickValue;
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

            // // 在控制台上輸出點擊的資訊
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

  return <canvas id={_id} width={width} height={height} className={className} style={style} />;
};
