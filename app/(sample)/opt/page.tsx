'use client';

import { json } from 'stream/consumers';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
// import { getSubmittedoptimize } from '@/models/optimize.server';
import { kpiService_m, kpiInv_m } from '@/app/(sample)/optimization/actionData';
import { cn } from '@/lib/utils';
import Waterfall from './waterfall';

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
      <div className="m-2">
        <div className="flex items-center justify-center  rounded-t-lg bg-gradient-to-t from-indigo-400 via-cyan-400 to-sky-500 shadow-lg p-0.5">
          <div className=" flex items-center w-full justify-between bg-sky-50  border rounded-t-lg text-2xl text-blue-900 font-bold">
            <div className="p-2">Warehouse cost waterfall</div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-b-lg pb-2 border">
          <div className="items-start justify-center gap-6 rounded-lg p-4 md:grid lg:grid-cols-1 xl:grid-cols-2">
            <div className="col-span-2 grid items-start  gap-2 lg:col-span-2 lg:grid-cols-1 xl:col-span-1 xl:grid-cols-1 ">
              <DemoContainer>
                <Card className=" text-blue-900">
                  <CardHeader className="space-y-1 ">
                    <CardTitle className="text-2xl flex">
                      Cost comparison
                    </CardTitle>

                    <div className="border-b" />
                  </CardHeader>

                  <CardContent className="grid gap-4 space-y-4">
                    <ul className=" grid grid-cols-1 ">
                      <Waterfall />
                    </ul>
                  </CardContent>
                </Card>
              </DemoContainer>
            </div>

            <div className="col-span-2 grid items-start gap-6 lg:col-span-2 lg:grid-cols-1 xl:col-span-1 xl:grid-cols-1">
              <DemoContainer>
                <Card className=" text-blue-900">
                  <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl flex">
                      Cost comparison
                    </CardTitle>

                    <div className="border-b" />
                  </CardHeader>
                  <CardContent className="grid  gap-4 space-y-6">
                    <ul className=" grid grid-cols-1 ">
                      {kpiInv_m.map((kpi) => (
                        <li
                          key={kpi.Name}
                          className="col-span-1 flex flex-col divide-y divide-white"
                        >
                          <div className="relative flex flex-1 flex-col py-2 pl-3">
                            <div className="flex items-baseline gap-2">
                              <div>
                                <h3 className="text-lg m-2 font-medium text-gray-900">
                                  {kpi.Name}
                                </h3>
                                {/* <h1 className="font-display  mb-3 text-4xl font-bold text-black">
                                  {kpi.Value}
                                </h1> */}
                              </div>
                            </div>
                            <div>{kpi.container}</div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </DemoContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
