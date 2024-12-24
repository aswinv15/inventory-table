'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PresentationChartLineIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';
import {
  Chart,
  ChartLegend,
  ChartSeries,
  ChartSeriesItem,
  ChartSeriesLabels,
  ChartTitle,
  ChartValueAxis,
  ChartValueAxisItem
} from '@progress/kendo-react-charts';
import 'hammerjs';
const totalExpenseData = [
  {
    category: 'Cost',
    field: 42.3
  },
  {
    category: 'Receiving',
    field: 4.2
  },
  {
    category: 'Storage',
    field: 5.0
  },
  {
    category: 'P&P',
    field: 14.0
  },
  {
    category: 'Shipping',
    field: 11.6
  },
  {
    category: 'Over Head',
    field: 7.6
  },
  {
    category: '',
    field: -23.5
  },
  {
    category: 'Total',
    summary: 'total'
  }
];
const Labor = [
  {
    category: 'Receiving',
    field: 3.7
  },
  {
    category: 'Storage',
    field: 2.8
  },
  {
    category: 'P&P',
    field: 13.8
  },
  {
    category: 'Shipping',
    field: 10.9
  },
  {
    category: 'Over Head',
    field: 7.4
  },
  {
    category: 'Total',
    summary: 'total'
  }
];
const Space = [
  {
    category: 'Receiving',
    field: 0.2
  },
  {
    category: 'Storage',
    field: 0.9
  },
  {
    category: 'P&P',
    field: 0.1
  },
  {
    category: 'Shipping',
    field: 0
  },
  {
    category: 'Over Head',
    field: 0.1
  },
  {
    category: 'Total',
    summary: 'total'
  }
];
const Equipment = [
  {
    category: 'Receiving',
    field: 0.3
  },
  {
    category: 'Storage',
    field: 1.3
  },
  {
    category: 'P&P',
    field: 0.1
  },
  {
    category: 'Shipping',
    field: 0.7
  },
  {
    category: 'Over Head',
    field: 0
  },
  {
    category: 'Total',
    summary: 'total'
  }
];

function pointColor(point: { dataItem: { summary: any }; value: number }) {
  let summary = point.dataItem.summary;
  if (summary) {
    return summary === 'total' ? '#f43f5e' : 'gray';
  }
  if (point.value > 0) {
    return 'skyblue';
  } else {
    return 'red';
  }
}
function DemoContainer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex items-center justify-center [&>div]:w-full',
        className
      )}
      {...props}
    />
  );
}
export default function Optimizer() {
  return (
    <>
      <div className="m-4">
        <DemoContainer>
          <Tabs defaultValue="Adaptive" className="">
            <TabsList className="">
              <TabsTrigger value="Adaptive">Adaptive Supply Chain</TabsTrigger>
              <TabsTrigger value="DC">DC</TabsTrigger>
              <TabsTrigger value="Inventory">Inventory Control</TabsTrigger>
              <TabsTrigger value="Container">Container Line</TabsTrigger>
              <TabsTrigger value="Eoq">EOQ</TabsTrigger>
            </TabsList>
            <TabsContent value="Adaptive" className="w-full">
              <div className="w-100 flex  justify-between p-4 rounded-lg border bg-white">
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-sky-700 to-blue-700 font-display">
                  Warehouse Cost Waterfall
                </h2>

                <div className="flex items-center justify-end"></div>
              </div>
           
                <div className="bg-white dark:bg-gray-800 ">
                  <div className="items-start justify-center gap-6 rounded-lg py-4 md:grid lg:grid-cols-1 xl:grid-cols-2">
                    <div className="col-span-2 grid items-start  gap-2 lg:col-span-2 lg:grid-cols-1 xl:col-span-1 xl:grid-cols-1 ">
                      <DemoContainer>
                        <Card className=" text-blue-900">
                          <CardHeader className="space-y-1 ">
                            <CardTitle className="text-2xl flex">
                              Warehousing cost
                            </CardTitle>
                            <div className="border-b" />
                          </CardHeader>

                          <CardContent className="grid gap-4 space-y-4">
                            <ul className=" grid grid-cols-1 ">
                              <div>
                                {' '}
                                <Chart style={{ height: 575 }}>
                                  <ChartTitle text="Cost comparison" />
                                  <ChartSeries>
                                    <ChartSeriesItem
                                      type="waterfall"
                                      data={totalExpenseData}
                                      color={pointColor}
                                      field="field"
                                      categoryField="category"
                                      summaryField="summary"
                                    >
                                      <ChartSeriesLabels />
                                    </ChartSeriesItem>
                                  </ChartSeries>
                                  <ChartValueAxis>
                                    <ChartValueAxisItem />
                                  </ChartValueAxis>
                                </Chart>
                              </div>
                            </ul>
                          </CardContent>
                        </Card>
                      </DemoContainer>
                    </div>

                    <div className="col-span-2 grid items-start gap-6 lg:col-span-2 lg:grid-cols-1 xl:col-span-1 xl:grid-cols-1">
                      <DemoContainer>
                        <Card className=" text-blue-900">
                          <CardHeader className="space-y-1 ">
                            <CardTitle className="text-2xl flex">
                              Cost by resource type
                            </CardTitle>
                            <div className="border-b" />
                          </CardHeader>
                          <CardContent className="grid  gap-4 space-y-6">
                            <ul className=" grid grid-cols-1 gap-y-4">
                              <div>
                                {' '}
                                <Chart style={{ height: 180 }}>
                                  <ChartTitle text="Cash flow" />
                                  <ChartSeries>
                                    <ChartSeriesItem
                                      type="waterfall"
                                      data={Labor}
                                      color={pointColor}
                                      field="field"
                                      categoryField="category"
                                      summaryField="summary"
                                    >
                                      <ChartSeriesLabels />
                                    </ChartSeriesItem>
                                  </ChartSeries>
                                  <ChartValueAxis>
                                    <ChartValueAxisItem />
                                  </ChartValueAxis>
                                </Chart>
                              </div>
                              <div>
                                {' '}
                                <Chart style={{ height: 180 }}>
                                  {/* <ChartTitle text="Cash flow" /> */}
                                  <ChartSeries>
                                    <ChartSeriesItem
                                      type="waterfall"
                                      data={Space}
                                      color={pointColor}
                                      field="field"
                                      categoryField="category"
                                      summaryField="summary"
                                    >
                                      <ChartSeriesLabels format="n0" />
                                    </ChartSeriesItem>
                                  </ChartSeries>
                                  <ChartValueAxis>
                                    <ChartValueAxisItem />
                                  </ChartValueAxis>
                                </Chart>
                              </div>
                              <div>
                                {' '}
                                <Chart style={{ height: 180 }}>
                                  <ChartTitle text="Cash flow" />
                                  <ChartSeries>
                                    <ChartSeriesItem
                                      type="waterfall"
                                      data={Equipment}
                                      color={pointColor}
                                      field="field"
                                      categoryField="category"
                                      summaryField="summary"
                                    >
                                      <ChartSeriesLabels format="n0" />
                                    </ChartSeriesItem>
                                  </ChartSeries>
                                  <ChartValueAxis>
                                    <ChartValueAxisItem />
                                  </ChartValueAxis>
                                </Chart>
                              </div>
                            </ul>
                          </CardContent>
                        </Card>
                      </DemoContainer>
                    </div>
                  </div>
                </div>
            
            </TabsContent>
            <TabsContent value="DC" className="w-full">
             

            
            </TabsContent>
            <TabsContent value="Inventory" className="w-full">
          
            </TabsContent>
            <TabsContent value="Container" className="w-full">
         
            </TabsContent>

            <TabsContent value="Eoq" className="w-full">
         
            </TabsContent>
          </Tabs>
        </DemoContainer>
      </div>
    </>
  );
}