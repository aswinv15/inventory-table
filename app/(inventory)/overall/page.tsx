'use client';
import React, { useState, useEffect } from 'react';

import Image from 'next/image';
import {
  TruckIcon,
  MapIcon,
  PresentationChartLineIcon
} from '@heroicons/react/24/outline';


import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { kpiService_m } from '@/app/data/truckData';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import LaneMap from '@/components/network/LaneMap';
import { Checkbox } from '@/components/ui/checkbox';

const stats = [
  { name: 'Cost per Unit (USD/Unit)', stat: '2,279' },
  { name: 'Cost per Trip Margin', stat: '136,744' },
  { name: 'Cost per km', stat: '41' }
];

const frameworks = [
  {
    value: 'next.js',
    label: 'Kolkata'
  },
  {
    value: 'sveltekit',
    label: 'Chennai'
  },
  {
    value: 'nuxt.js',
    label: 'Nuxt.js'
  },
  {
    value: 'remix',
    label: 'Remix'
  },
  {
    value: 'astro',
    label: 'Astro'
  }
];
const countries = [
  {
    name: 'Afghanistan',
    svg: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Flag_of_Afghanistan_%282013%E2%80%932021%29.svg',

    states: [
      {
        name: 'Herat',

        cities: [
          { name: 'Air', latitude: 34.333, longitude: 62.2 },
          { name: 'Rail', latitude: 34.517, longitude: 69.183 },
          { name: 'Ship', latitude: 36.7, longitude: 67.1 }
        ]
      },
      {
        name: 'Kabul',
        cities: [
          { name: 'Ship', latitude: 34.333, longitude: 62.2 },
          { name: 'Rail', latitude: 34.517, longitude: 69.183 },
          { name: 'Air', latitude: 36.7, longitude: 67.1 }
        ]
      },
      {
        name: 'Mazar-e Sharif',

        cities: [
          { name: 'Herat', latitude: 34.333, longitude: 62.2 },
          { name: 'Kabul', latitude: 34.517, longitude: 69.183 },
          { name: 'Mazar-e Sharif', latitude: 36.7, longitude: 67.1 }
        ]
      }
    ]
  },
  {
    name: 'india',
    svg: 'https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg',
    states: [
      {
        name: 'Punjab',
        cities: [
          { name: 'Abohar', latitude: 30.1424, longitude: 74.1999 },
          { name: 'Amritsar', latitude: 31.583, longitude: 74.883 }
        ]
      },
      {
        name: 'Maharashtra',
        cities: [
          { name: 'Achalpur', latitude: 21.264, longitude: 77.511 },
          { name: 'Ahmednagar', latitude: 19.0946, longitude: 74.745 },
          { name: 'Akola', latitude: 25.267, longitude: 74.883 },
          { name: 'Amravati', latitude: 20.933, longitude: 77.75 }
        ]
      },
      {
        name: 'Gujarat',
        cities: [
          { name: 'Achhod', latitude: 21.961, longitude: 72.8317 },
          { name: 'Ahmedabad', latitude: 23.033, longitude: 72.617 },
          { name: 'Amreli', latitude: 21.5991, longitude: 71.2157 },
          { name: 'Anand', latitude: 22.5569, longitude: 72.9492 }
        ]
      },
      {
        name: 'Tripura',
        cities: [{ name: 'Agartala', latitude: 23.82, longitude: 91.28 }]
      },
      {
        name: 'Uttar Pradesh',
        cities: [
          { name: 'Agra', latitude: 27.183, longitude: 78.017 },
          { name: 'Aligarh', latitude: 27.8922, longitude: 78.072 },
          { name: 'Allahabad', latitude: 25.4512, longitude: 81.8265 },
          { name: 'Amethi', latitude: 26.7565, longitude: 81.1569 }
        ]
      },
      {
        name: 'Mizoram',
        cities: [{ name: 'Aizwal', latitude: 23.7339, longitude: 92.7168 }]
      },
      {
        name: 'Rajasthan',
        cities: [
          { name: 'Ajmer', latitude: 26.4565, longitude: 74.6377 },
          { name: 'Alwar', latitude: 27.5618, longitude: 76.6119 }
        ]
      },
      {
        name: 'Haryana',
        cities: [{ name: 'Ambala', latitude: 30.35, longitude: 76.833 }]
      }
    ]
  },
  {
    name: 'China',
    svg: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
    statesdes: [
      {
        name: 'Chaoyang',
        citiesdes: [
          { name: 'Air', latitude: 23.283, longitude: 116.583 },
          { name: 'Rail', latitude: 23.283, longitude: 116.583 },
          { name: 'Ship', latitude: 23.283, longitude: 116.583 }
        ]
      },
      {
        name: 'Chengde',
        citiesdes: [
          { name: 'Air', latitude: 40.758, longitude: 118.156 },
          { name: 'Rail', latitude: 40.758, longitude: 118.156 },
          { name: 'Ship', latitude: 40.758, longitude: 118.156 }
        ]
      },
      {
        name: 'Chengdu',
        citiesdes: [
          { name: 'Air', latitude: 30.667, longitude: 104.067 },
          { name: 'Rail', latitude: 30.667, longitude: 104.067 },
          { name: 'Ship', latitude: 30.667, longitude: 104.067 }
        ]
      },
      {
        name: 'Chenzhou',
        citiesdes: [
          { name: 'Air', latitude: 25.8, longitude: 113.033 },
          { name: 'Rail', latitude: 25.8, longitude: 113.033 },
          { name: 'Ship', latitude: 25.8, longitude: 113.033 }
        ]
      },
      {
        name: 'Chifeng',
        citiesdes: [
          { name: 'Air', latitude: 42.268, longitude: 118.964 },
          { name: 'Rail', latitude: 42.268, longitude: 118.964 },
          { name: 'Ship', latitude: 42.268, longitude: 118.964 }
        ]
      },
      {
        name: 'Chongqing',
        citiesdes: [
          { name: 'Air', latitude: 29.55, longitude: 106.532 },
          { name: 'Rail', latitude: 29.55, longitude: 106.532 },
          { name: 'Ship', latitude: 29.55, longitude: 106.532 }
        ]
      },
      {
        name: 'Chuxiong',
        citiesdes: [
          { name: 'Air', latitude: 25.033, longitude: 101.55 },
          { name: 'Rail', latitude: 25.033, longitude: 101.55 },
          { name: 'Ship', latitude: 25.033, longitude: 101.55 }
        ]
      },
      {
        name: 'Dali',
        citiesdes: [
          { name: 'Air', latitude: 29.428, longitude: 121.313 },
          { name: 'Rail', latitude: 29.428, longitude: 121.313 },
          { name: 'Ship', latitude: 29.428, longitude: 121.313 }
        ]
      },
      {
        name: 'Dalian',
        citiesdes: [
          { name: 'Air', latitude: 38.917, longitude: 121.65 },
          { name: 'Rail', latitude: 38.917, longitude: 121.65 },
          { name: 'Ship', latitude: 38.917, longitude: 121.65 }
        ]
      },
      {
        name: 'Dandong',
        citiesdes: [
          { name: 'Air', latitude: 26.979, longitude: 108.909 },
          { name: 'Rail', latitude: 26.979, longitude: 108.909 },
          { name: 'Ship', latitude: 26.979, longitude: 108.909 }
        ]
      },
      {
        name: 'Danxian',
        citiesdes: [
          { name: 'Air', latitude: 19.517, longitude: 109.55 },
          { name: 'Rail', latitude: 19.517, longitude: 109.55 },
          { name: 'Ship', latitude: 19.517, longitude: 109.55 }
        ]
      },
      {
        name: 'Daqing',
        citiesdes: [
          { name: 'Air', latitude: 46.583, longitude: 125 },
          { name: 'Rail', latitude: 46.583, longitude: 125 },
          { name: 'Ship', latitude: 46.583, longitude: 125 }
        ]
      },
      {
        name: 'Darlag',
        citiesdes: [
          { name: 'Air', latitude: 33.8, longitude: 99.867 },
          { name: 'Rail', latitude: 33.8, longitude: 99.867 },
          { name: 'Ship', latitude: 33.8, longitude: 99.867 }
        ]
      },
      {
        name: 'Dawu',
        citiesdes: [
          { name: 'Air', latitude: 31, longitude: 101.15 },
          { name: 'Rail', latitude: 31, longitude: 101.15 },
          { name: 'Ship', latitude: 31, longitude: 101.15 }
        ]
      },
      {
        name: 'Delingha',
        citiesdes: [
          { name: 'Air', latitude: 37.383, longitude: 97.383 },
          { name: 'Rail', latitude: 37.383, longitude: 97.383 },
          { name: 'Ship', latitude: 37.383, longitude: 97.383 }
        ]
      },
      {
        name: 'Dengqen',
        citiesdes: [
          { name: 'Air', latitude: 31.533, longitude: 95.433 },
          { name: 'Rail', latitude: 31.533, longitude: 95.433 },
          { name: 'Ship', latitude: 31.533, longitude: 95.433 }
        ]
      }
    ]
  }
];

const destination = [
  {
    name: 'Afghanistan',
    svg: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Flag_of_Afghanistan_%282013%E2%80%932021%29.svg',

    statesdes: [
      {
        name: 'Herat',

        citiesdes: [
          { name: 'Air', latitude: 34.333, longitude: 62.2 },
          { name: 'Rail', latitude: 34.517, longitude: 69.183 },
          { name: 'Ship', latitude: 36.7, longitude: 67.1 }
        ]
      },
      {
        name: 'Kabul',
        citiesdes: [
          { name: 'Ship', latitude: 34.333, longitude: 62.2 },
          { name: 'Rail', latitude: 34.517, longitude: 69.183 },
          { name: 'Air', latitude: 36.7, longitude: 67.1 }
        ]
      },
      {
        name: 'Mazar-e Sharif',

        citiesdes: [
          { name: 'Herat', latitude: 34.333, longitude: 62.2 },
          { name: 'Kabul', latitude: 34.517, longitude: 69.183 },
          { name: 'Mazar-e Sharif', latitude: 36.7, longitude: 67.1 }
        ]
      }
    ]
  },
  {
    name: 'India',
    svg: 'https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg',
    statesdes: [
      {
        name: 'Guwahati',
        citiesdes: [
          { name: 'Air', latitude: 26.1805, longitude: 91.7577 },
          { name: 'Rail', latitude: 26.1805, longitude: 91.7577 },
          { name: 'Ship', latitude: 26.1805, longitude: 91.7577 }
        ]
      },
      {
        name: 'Gwalior',
        citiesdes: [
          { name: 'Air', latitude: 26.2163, longitude: 78.1772 },
          { name: 'Rail', latitude: 26.2163, longitude: 78.1772 },
          { name: 'Ship', latitude: 26.2163, longitude: 78.1772 }
        ]
      },
      {
        name: 'Haldia',
        citiesdes: [
          { name: 'Air', latitude: 22.0331, longitude: 88.0603 },
          { name: 'Rail', latitude: 22.0331, longitude: 88.0603 },
          { name: 'Ship', latitude: 22.0331, longitude: 88.0603 }
        ]
      },
      {
        name: 'Haldwani',
        citiesdes: [
          { name: 'Air', latitude: 29.223, longitude: 79.511 },
          { name: 'Rail', latitude: 29.223, longitude: 79.511 },
          { name: 'Ship', latitude: 29.223, longitude: 79.511 }
        ]
      },
      {
        name: 'Halisahar',
        citiesdes: [
          { name: 'Air', latitude: 22.9489, longitude: 88.4171 },
          { name: 'Rail', latitude: 22.9489, longitude: 88.4171 },
          { name: 'Ship', latitude: 22.9489, longitude: 88.4171 }
        ]
      },
      {
        name: 'Hamirpur',
        citiesdes: [
          { name: 'Air', latitude: 31.6845, longitude: 76.5229 },
          { name: 'Rail', latitude: 31.6845, longitude: 76.5229 },
          { name: 'Ship', latitude: 31.6845, longitude: 76.5229 }
        ]
      },
      {
        name: 'Hansi',
        citiesdes: [
          { name: 'Air', latitude: 29.098, longitude: 75.9646 },
          { name: 'Rail', latitude: 29.098, longitude: 75.9646 },
          { name: 'Ship', latitude: 29.098, longitude: 75.9646 }
        ]
      },
      {
        name: 'Hanumangarh',
        citiesdes: [
          { name: 'Air', latitude: 29.623, longitude: 74.2919 },
          { name: 'Rail', latitude: 29.623, longitude: 74.2919 },
          { name: 'Ship', latitude: 29.623, longitude: 74.2919 }
        ]
      },
      {
        name: 'Harda',
        citiesdes: [
          { name: 'Air', latitude: 22.3409, longitude: 77.0922 },
          { name: 'Rail', latitude: 22.3409, longitude: 77.0922 },
          { name: 'Ship', latitude: 22.3409, longitude: 77.0922 }
        ]
      },
      {
        name: 'Hardoi',
        citiesdes: [
          { name: 'Air', latitude: 27.3954, longitude: 80.1267 },
          { name: 'Rail', latitude: 27.3954, longitude: 80.1267 },
          { name: 'Ship', latitude: 27.3954, longitude: 80.1267 }
        ]
      }
    ]
  },
  {
    name: 'China',
    svg: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
    statesdes: [
      {
        name: 'Chaoyang',
        citiesdes: [
          { name: 'Air', latitude: 23.283, longitude: 116.583 },
          { name: 'Rail', latitude: 23.283, longitude: 116.583 },
          { name: 'Ship', latitude: 23.283, longitude: 116.583 }
        ]
      },
      {
        name: 'Chengde',
        citiesdes: [
          { name: 'Air', latitude: 40.758, longitude: 118.156 },
          { name: 'Rail', latitude: 40.758, longitude: 118.156 },
          { name: 'Ship', latitude: 40.758, longitude: 118.156 }
        ]
      },
      {
        name: 'Chengdu',
        citiesdes: [
          { name: 'Air', latitude: 30.667, longitude: 104.067 },
          { name: 'Rail', latitude: 30.667, longitude: 104.067 },
          { name: 'Ship', latitude: 30.667, longitude: 104.067 }
        ]
      },
      {
        name: 'Chenzhou',
        citiesdes: [
          { name: 'Air', latitude: 25.8, longitude: 113.033 },
          { name: 'Rail', latitude: 25.8, longitude: 113.033 },
          { name: 'Ship', latitude: 25.8, longitude: 113.033 }
        ]
      },
      {
        name: 'Chifeng',
        citiesdes: [
          { name: 'Air', latitude: 42.268, longitude: 118.964 },
          { name: 'Rail', latitude: 42.268, longitude: 118.964 },
          { name: 'Ship', latitude: 42.268, longitude: 118.964 }
        ]
      },
      {
        name: 'Chongqing',
        citiesdes: [
          { name: 'Air', latitude: 29.55, longitude: 106.532 },
          { name: 'Rail', latitude: 29.55, longitude: 106.532 },
          { name: 'Ship', latitude: 29.55, longitude: 106.532 }
        ]
      },
      {
        name: 'Chuxiong',
        citiesdes: [
          { name: 'Air', latitude: 25.033, longitude: 101.55 },
          { name: 'Rail', latitude: 25.033, longitude: 101.55 },
          { name: 'Ship', latitude: 25.033, longitude: 101.55 }
        ]
      },
      {
        name: 'Dali',
        citiesdes: [
          { name: 'Air', latitude: 29.428, longitude: 121.313 },
          { name: 'Rail', latitude: 29.428, longitude: 121.313 },
          { name: 'Ship', latitude: 29.428, longitude: 121.313 }
        ]
      },
      {
        name: 'Dalian',
        citiesdes: [
          { name: 'Air', latitude: 38.917, longitude: 121.65 },
          { name: 'Rail', latitude: 38.917, longitude: 121.65 },
          { name: 'Ship', latitude: 38.917, longitude: 121.65 }
        ]
      },
      {
        name: 'Dandong',
        citiesdes: [
          { name: 'Air', latitude: 26.979, longitude: 108.909 },
          { name: 'Rail', latitude: 26.979, longitude: 108.909 },
          { name: 'Ship', latitude: 26.979, longitude: 108.909 }
        ]
      },
      {
        name: 'Danxian',
        citiesdes: [
          { name: 'Air', latitude: 19.517, longitude: 109.55 },
          { name: 'Rail', latitude: 19.517, longitude: 109.55 },
          { name: 'Ship', latitude: 19.517, longitude: 109.55 }
        ]
      },
      {
        name: 'Daqing',
        citiesdes: [
          { name: 'Air', latitude: 46.583, longitude: 125 },
          { name: 'Rail', latitude: 46.583, longitude: 125 },
          { name: 'Ship', latitude: 46.583, longitude: 125 }
        ]
      },
      {
        name: 'Darlag',
        citiesdes: [
          { name: 'Air', latitude: 33.8, longitude: 99.867 },
          { name: 'Rail', latitude: 33.8, longitude: 99.867 },
          { name: 'Ship', latitude: 33.8, longitude: 99.867 }
        ]
      },
      {
        name: 'Dawu',
        citiesdes: [
          { name: 'Air', latitude: 31, longitude: 101.15 },
          { name: 'Rail', latitude: 31, longitude: 101.15 },
          { name: 'Ship', latitude: 31, longitude: 101.15 }
        ]
      },
      {
        name: 'Delingha',
        citiesdes: [
          { name: 'Air', latitude: 37.383, longitude: 97.383 },
          { name: 'Rail', latitude: 37.383, longitude: 97.383 },
          { name: 'Ship', latitude: 37.383, longitude: 97.383 }
        ]
      },
      {
        name: 'Dengqen',
        citiesdes: [
          { name: 'Air', latitude: 31.533, longitude: 95.433 },
          { name: 'Rail', latitude: 31.533, longitude: 95.433 },
          { name: 'Ship', latitude: 31.533, longitude: 95.433 }
        ]
      }
    ]
  },
  {
    name: 'Japan',
    svg: 'https://upload.wikimedia.org/wikipedia/en/9/9e/Flag_of_Japan.svg',
    statesdes: [
      {
        name: 'Choshi',
        citiesdes: [
          { name: 'Air', latitude: 35.733, longitude: 140.833 },
          { name: 'Rail', latitude: 35.733, longitude: 140.833 },
          { name: 'Ship', latitude: 35.733, longitude: 140.833 }
        ]
      },
      {
        name: 'Ebetsu',
        citiesdes: [
          { name: 'Air', latitude: 43.117, longitude: 141.567 },
          { name: 'Rail', latitude: 43.117, longitude: 141.567 },
          { name: 'Ship', latitude: 43.117, longitude: 141.567 }
        ]
      },
      {
        name: 'Fuji',
        citiesdes: [
          { name: 'Air', latitude: 43.817, longitude: 144.783 },
          { name: 'Rail', latitude: 43.817, longitude: 144.783 },
          { name: 'Ship', latitude: 43.817, longitude: 144.783 }
        ]
      },
      {
        name: 'Fujinomiya',
        citiesdes: [
          { name: 'Air', latitude: 35.217, longitude: 138.617 },
          { name: 'Rail', latitude: 35.217, longitude: 138.617 },
          { name: 'Ship', latitude: 35.217, longitude: 138.617 }
        ]
      },
      {
        name: 'Fujisawa',
        citiesdes: [
          { name: 'Air', latitude: 35.35, longitude: 139.483 },
          { name: 'Rail', latitude: 35.35, longitude: 139.483 },
          { name: 'Ship', latitude: 35.35, longitude: 139.483 }
        ]
      }
    ]
  }
];
const origin = [
  {
    id: 1,
    name: 'United States',
    svg: 'https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg'
  },
  {
    id: 2,
    name: 'Canada',
    svg: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Canada_%28Pantone%29.svg'
  },
  {
    id: 3,
    name: 'United Kingdom',
    svg: 'https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg'
  },
  {
    id: 4,
    name: 'Australia',
    svg: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Flag_of_Australia_%28converted%29.svg'
  },
  {
    id: 5,
    name: 'Germany',
    svg: 'https://upload.wikimedia.org/wikipedia/en/b/ba/Flag_of_Germany.svg'
  },
  {
    id: 14,
    name: 'China',
    svg: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg'
  }
];

const des = [
  {
    id: 1,
    name: 'United States',
    svg: 'https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg'
  },
  {
    id: 2,
    name: 'Canada',
    svg: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Canada_%28Pantone%29.svg'
  },
  {
    id: 3,
    name: 'United Kingdom',
    svg: 'https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg'
  },
  {
    id: 4,
    name: 'Australia',
    svg: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Flag_of_Australia_%28converted%29.svg'
  },
  {
    id: 5,
    name: 'Germany',
    svg: 'https://upload.wikimedia.org/wikipedia/en/b/ba/Flag_of_Germany.svg'
  },

  {
    id: 13,
    name: 'India',
    svg: 'https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg'
  },
  {
    id: 14,
    name: 'China',
    svg: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg'
  }
];

function DemoContainer({
  // eslint-disable-next-line react/prop-types
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
export default function Overall() {

    return (
        <>
        <div className="border rounded-lg">
            <div className="m-4">
            <LaneMap/>
            </div>
        </div>
        </>
    )
//   return (
//     <>
//       <div className="border rounded-lg flex">
//         <div className="m-4">
//           <CardTitle className="space-y-1 flex items-center text-blue-900">
//             <span className="text-xl ">Origin</span>
//           </CardTitle>
//           <div className="border-b" />
//           <div className=" mt-2 flex items-center space-x-6">
//             <div className="flex items-center space-x-4">
//               {/* <Select
//                 value={selectedCountry}
//                 defaultValue={selectedCountry}
//                 onValueChange={handleCountryChange}
//               >
//                 <SelectTrigger
//                   className={cn(
//                     'flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 w-[180px]',
//                     isCollapsed &&
//                       'flex size-9 shrink-0 items-center justify-center p-0 [&>span]:w-auto [&>svg]:hidden'
//                   )}
//                   aria-label="Select account"
//                 >
//                   <SelectValue placeholder="Select a country">
                   
//                   </SelectValue>
//                 </SelectTrigger>
//                 <SelectContent>
//                   {countries.map((country) => (
//                     <SelectItem key={country.name} value={country.name}>
//                       <div className="flex items-center gap-3">
//                         <Image
//                           src={country.svg}
//                           width="30"
//                           height="16"
//                           alt="Flag"
//                         />
//                         {country.name}
//                       </div>
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select> */}
//             </div>

//             <div className="flex items-center space-x-2">
             
//             </div>
//             <div className="flex items-center space-x-2">
             
//             </div>
//           </div>
//         </div>
//         <span className="border-l my-4" />
//         <div className="m-4">
//           <CardTitle className="space-y-1 flex items-center text-blue-900">
//             <span className="text-xl ">Destination</span>
//           </CardTitle>
//           <div className="border-b" />

//           <div className="mt-2 flex items-center space-x-6">
//             <div className="flex items-center space-x-4">
              
//             </div>

//             <div className="flex items-center space-x-2">
              
//             </div>
//             <div className="flex items-center space-x-2">
             
//             </div>
//           </div>
//         </div>
//         <span className="border-l my-4" />
//         <div className="m-4">
//           <CardTitle className="space-y-1 flex items-center text-blue-900">
//             <span className="text-xl ">Types of Goods</span>
//           </CardTitle>
//           <div className="border-b" />

//           <div className="mt-2 flex items-center space-x-6">
//             <div className="flex items-center space-x-2">
//               <Select>
//                 <SelectTrigger className="w-[260px]">
//                   <SelectValue placeholder="Container / Pallets Shipment" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="Container">
//                     Container / Pallets Shipment
//                   </SelectItem>
//                   <SelectItem value="Bulk">Bulk Shipment</SelectItem>
//                   <SelectItem value="Liquid">Liquid Shipment</SelectItem>
//                   <SelectItem value="Temperature">
//                     Temperature Controlled Shipment
//                   </SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//         </div>
//         <span className="border-l my-4" />
//         <div className="m-4">
//           <CardTitle className="space-y-1 flex items-center text-blue-900">
//             <span className="text-xl ">Parameters</span>
//           </CardTitle>
//           <div className="border-b" />

//           <div className="mt-2 flex items-center space-x-6">
//             <div className=" items-center flex space-x-2">
//               <Checkbox id="terms1" />
//               <div className="grid gap-1.5 leading-none">
//                 <label
//                   htmlFor="terms1"
//                   className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                 >
//                   FTL
//                 </label>
//               </div>
//             </div>
//             <div className="items-top flex items-center space-x-2">
//               <Checkbox id="terms2" />

//               <label
//                 htmlFor="terms2"
//                 className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//               >
//                 LTL
//               </label>
//               <Input
//                 className="mx-2 text-blue-900 w-[150px] "
//                 name="customer"
//                 defaultValue="0.00"
//               />
//               <label
//                 htmlFor="terms2"
//                 className="text-sm text-blue-900 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//               >
//                 % of Truck / Container load
//               </label>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="grid grid-cols-2 gap-6 py-4">
//         <div>
//           <LaneMap />
//         </div>

//         <div>
//           <DemoContainer>
//             <Card className="shadow-lg text-blue-900">
//               <CardHeader className="space-y-1">
//                 <CardTitle className="flex items-center">
//                   <PresentationChartLineIcon className="size-8 mr-2" />
//                   <span className="text-2xl">Cleansheet Summary</span>
//                 </CardTitle>

//                 <div className="border-b" />
//               </CardHeader>
//               <CardContent className="grid gap-4">
//                 <dl className="grid grid-cols-1 gap-6 sm:grid-cols-3">
//                   {stats.map((item) => (
//                     <div
//                       key={item.name}
//                       className="rounded-2xl bg-gray-100 border px-4 py-5 shadow"
//                     >
//                       <dd className="flex justify-center mt-1 text-3xl font-semibold tracking-tight text-blue-900">
//                         {item.stat}
//                       </dd>
//                       <dt className="mt-2 flex justify-center truncate text-sm font-medium text-gray-500">
//                         {item.name}
//                       </dt>
//                     </div>
//                   ))}
//                 </dl>

//                 <ul className="grid grid-cols-1 gap-2 mt-2">
//                   {kpiService_m.map((kpi) => (
//                     <li
//                       key={kpi.Name}
//                       className="col-span-1 flex flex-col divide-y divide-white"
//                     >
//                       <div className="relative flex flex-1 flex-col p-2">
//                         <div className="flex items-baseline gap-2">
//                           <h3 className="text-base font-medium text-gray-900">
//                             {kpi.Name}
//                           </h3>
//                         </div>
//                         <div className="mt-2">{kpi.container}</div>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               </CardContent>
//             </Card>
//           </DemoContainer>
//         </div>
//       </div>
//     </>
//   );
}
