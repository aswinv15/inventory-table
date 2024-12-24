'use client';

import * as React from 'react';

import {
  Chart,
  ChartTitle,
  ChartValueAxis,
  ChartValueAxisItem,
  ChartSeries,
  ChartSeriesItem,
  ChartSeriesLabels
} from '@progress/kendo-react-charts';

const data = [
  {
    period: 'Overhead',
    amount: 7.6
  },
  {
    period: 'Shipping',
    amount: 11.6
  },
  {
    period: 'P&P',
    amount: 14.0
  },
  {
    period: 'Storage',
    amount: 5.0
  },
  {
    period: 'Receiving',
    amount: 4.2
  },
  {
    period: 'Cost',
    amount: 42.3
  },
  {
    period: '',
    amount: -31
  },
  //   {
  //     period: 'Client Cost',
  //     amount: 61.4
  //   },
  {
    period: 'Client Cost',
    summary: 'runningTotal'
  }
  //   {
  //     period: 'Ending\\nBalance',
  //     summary: 'total'
  //   }
];

const pointColor = (point: any) => {
  let summary = point.dataItem.summary;

  if (summary) {
    return summary === 'total' ? '#555' : 'gray';
  }

  if (point.value > 0) {
    return 'green';
  } else {
    return 'red';
  }
};

export default function ChartContainer() {
  return (
    <Chart>
      {/* <ChartTitle text="Cash flow" /> */}
      <ChartSeries>
        <ChartSeriesItem
          type="waterfall"
          data={data}
          color={pointColor}
          field="amount"
          categoryField="period"
          summaryField="summary"
          // Add reverse direction if supported by the library
        >
          <ChartSeriesLabels position="insideEnd" />
        </ChartSeriesItem>
      </ChartSeries>
      <ChartValueAxis>
        <ChartValueAxisItem />
      </ChartValueAxis>
    </Chart>
  );
}
