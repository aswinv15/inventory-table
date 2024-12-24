import React from 'react';

import { AgChartsReact } from 'ag-charts-react';

import 'ag-charts-enterprise';

export const data = [
    {
      financials: 'Income Tax',
      amount: 185
    },
    {
      financials: 'VAT',
      amount: 145
    },
    {
      financials: 'NI',
      amount: 134
    },
    {
      financials: 'Corp Tax',
      amount: 55
    },
    {
      financials: 'Council Tax',
      amount: 34
    },
    {
      financials: 'Health',
      amount: -155
    },
    {
      financials: 'Education',
      amount: -112
    },
    {
      financials: 'Defence',
      amount: -165
    },
    {
      financials: 'Interest',
      amount: -163
    },
    {
      financials: 'Housing',
      amount: -91
    }
  ];


const options = {
  data,
  title: {
    text: 'UK Government Budget'
  },
  subtitle: {
    text: 'All values in £ billions'
  },
  series: [
    {
      type: 'waterfall',
      xKey: 'financials',
      xName: 'Financials',
      yKey: 'amount',
      yName: 'Amount',
      item: {
        positive: {
          fill: '#4A90E2',
          stroke: '#4A90E2'
        },
        negative: {
          fill: '#FF6B6B',
          stroke: '#FF6B6B'
        },
        total: {
          name: 'Total / Subtotal',
          fill: '#404066',
          stroke: '#404066'
        }
      },
      totals: [
        { totalType: 'subtotal', index: 4, axisLabel: 'Total Revenue' },
        {
          totalType: 'subtotal',
          index: 9,
          axisLabel: 'Total Expenditure'
        },
        { totalType: 'total', index: 9, axisLabel: 'Total Borrowing' }
      ]
    }
  ]
};

export default function Waterfall() {
  return (
    <div className="w-full h-[900px] ">
      <AgChartsReact options={options} />
    </div>
  );
}
