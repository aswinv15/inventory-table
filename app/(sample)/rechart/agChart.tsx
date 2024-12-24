import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AgChartsReact } from 'ag-charts-react';
import { AgChartOptions } from 'ag-charts-enterprise';
import { getData } from './data';
import 'ag-charts-enterprise';
export default function AgChart() {
  const [options, setOptions] = useState<AgChartOptions>({
    data: getData(),
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
        yName: 'Amount'
      }
    ]
  });

  return <AgChartsReact options={options as any} />;
};
