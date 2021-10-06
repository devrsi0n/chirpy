import { AxisBottom, AxisLeft } from '@visx/axis';
import { GridRows } from '@visx/grid';
import { Group } from '@visx/group';
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale';
import { BarStack } from '@visx/shape';
import * as React from 'react';
import { theme } from 'twin.macro';

import { PageView, ViewBarType } from './type';

export type ViewChartProps = {
  width: number;
  height: number;
  pageViews: PageView[];
};

export function ViewChart({ width, height, pageViews }: ViewChartProps): JSX.Element {
  const dateScale = scaleBand<string>({
    domain: pageViews?.map(getDate),
    padding: 0.2,
  });

  const maxYValue = React.useMemo(
    () => Math.max(...(pageViews || [])?.map((p) => p.pvBar)),
    [pageViews],
  );
  const sizeScale = scaleLinear<number>({
    domain: [0, maxYValue],
    nice: true,
  });
  const xMax = width - defaultMargin.left - defaultMargin.right;
  const yMax = height - defaultMargin.top - defaultMargin.bottom;
  dateScale.rangeRound([0, xMax]);
  sizeScale.range([yMax, 0]);
  const colorScale = scaleOrdinal<ViewBarType, string>({
    domain: keys,
    range: [theme`colors.blue.900`, theme`colors.blue.700`],
  });

  if (!pageViews) {
    return <></>;
  }
  return (
    <div tw="relative">
      <svg width={width} height={height} aria-label="Page view chart">
        <Group top={defaultMargin.top} left={defaultMargin.left}>
          <GridRows
            scale={sizeScale}
            width={xMax}
            height={yMax}
            stroke={theme`colors.gray.500`}
            numTicks={numTicks}
          />
          <BarStack
            data={pageViews}
            keys={keys}
            xScale={dateScale}
            yScale={sizeScale}
            x={getDate}
            color={colorScale}
          >
            {(barStacks) =>
              barStacks.map((barStack) =>
                barStack.bars.map((bar) => (
                  <rect
                    key={`bar-stack-${barStack.index}-${bar.index}`}
                    x={bar.x}
                    y={bar.y}
                    height={bar.height}
                    width={bar.width}
                    fill={bar.color}
                  />
                )),
              )
            }
          </BarStack>
        </Group>
        <AxisBottom
          top={yMax + defaultMargin.top}
          left={defaultMargin.left}
          scale={dateScale}
          tickFormat={tickFormat}
          stroke={lineColor}
          tickStroke="transparent"
          tickLabelProps={() => ({
            fill: labelColor,
            fontSize: 11,
            textAnchor: 'middle',
          })}
        />
        <AxisLeft
          scale={sizeScale}
          top={defaultMargin.top}
          left={defaultMargin.left}
          stroke="transparent"
          tickStroke="transparent"
          numTicks={numTicks}
          tickLabelProps={() => ({
            fill: labelColor,
            fontSize: 11,
            textAnchor: 'end',
            verticalAnchor: 'middle',
          })}
        />
      </svg>
    </div>
  );
}

const getDate = (d: PageView) => d.date;
const keys: ViewBarType[] = ['uvBar', 'pvBar'];
const tickFormat = (hour: string) => (+hour > 12 ? `${+hour - 12}pm` : `${hour}am`);

const numTicks = 6;
const lineColor = theme`colors.gray.800`;
const labelColor = theme`colors.gray.900`;
const defaultMargin = { top: 20, right: 10, bottom: 26, left: 26 };
