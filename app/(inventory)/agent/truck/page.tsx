'use client';
import React, { useState, useEffect } from 'react';
import {
  TruckIcon,
  MapIcon,
  PresentationChartLineIcon
} from '@heroicons/react/24/outline';
import { Check, ChevronsUpDown } from 'lucide-react';
import { PiAirplaneTiltFill } from 'react-icons/pi';
import { FaTrainSubway, FaTruck } from 'react-icons/fa6';
import { RiShipFill } from 'react-icons/ri';
import AdminInput from '@/components/snop/input/admin-form';
import TruckInput from '@/components/snop/input/truck-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Command, CommandGroup, CommandItem } from '@/components/ui/command';
import { Checkbox } from '@/components/ui/checkbox';

import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import LaneMap from '@/components/network/LaneMap';
import Image from 'next/image';

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
export default function TruckForm() {
      const [tyopen, settyOpen] = React.useState(false);
      const [value, setValue] = React.useState('');
      const [selectedAccount, setSelectedAccount] = useState(origin[0].name);
      const [isCollapsed, setIsCollapsed] = useState(false);

    

 



 



     
    return (
      <div>
        <div className="border rounded-lg ">
          <div className="items-start justify-center gap-6 rounded-lg md:grid grid-cols-1">
            <div className="border rounded-lg bg-white">
              <div className="m-4 flex space-x-4 justify-between">
                <div className="flex space-x-4">
                  <CardTitle className="space-y-1 flex items-center text-blue-900 text-xl ">
                    Transport CleanSheet
                  </CardTitle>
                </div>
                <div className="flex items-center space-x-4">
                  <CardTitle className=" text-blue-900 text-xl">
                    Country
                  </CardTitle>
                  <div className="mt-2 flex items-center space-x-6">
                    <div className="flex items-center space-x-4">
                      <Select
                        defaultValue={selectedAccount}
                        onValueChange={setSelectedAccount}
                      >
                        <SelectTrigger
                          className={cn(
                            'flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:size-4 [&_svg]:shrink-0 w-[180px]',
                            isCollapsed &&
                              'flex size-9 shrink-0 items-center justify-center p-0 [&>span]:w-auto [&>svg]:hidden'
                          )}
                          aria-label="Select account"
                        >
                          <SelectValue placeholder="Select an account">
                            <Image
                              src={
                                origin.find(
                                  (account) => account.name === selectedAccount
                                )?.svg
                              }
                              width="30"
                              height="16"
                              alt="Flag"
                            />
                            <span
                              className={cn('ml-2', isCollapsed && 'hidden')}
                            >
                              {
                                origin.find(
                                  (account) => account.name === selectedAccount
                                )?.name
                              }
                            </span>
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {origin.map((account) => (
                            <SelectItem key={account.name} value={account.name}>
                              <div className="flex items-center gap-3 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-foreground">
                                <Image
                                  src={account.svg}
                                  width="30"
                                  height="16"
                                  alt="Flag"
                                />
                                {/* {account.svg} */}
                                {account.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className=" m-4 flex space-x-4">
                    <CardTitle className="space-y-1 flex items-center text-blue-900">
                      <span className="text-xl ">Currency</span>
                    </CardTitle>
                    <div className="mt-2 flex items-center space-x-6">
                      <Input
                        id="km"
                        name="0.5"
                        defaultValue={'0.5'}
                        className="text-lg text-gray-500 text-center w-[120px]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mx-4 border-b" />
              <div className="items-start justify-center  grid grid-cols-1 ">
                <DemoContainer className="text-blue-900">
                  <CardContent className="mt-4 grid gap-6">
             
                    <TruckInput />
                  </CardContent>
                </DemoContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
