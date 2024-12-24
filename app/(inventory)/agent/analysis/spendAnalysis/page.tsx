'use client';
import {
  reviewTabs,
  meetingTabs,
  kpiService_m,
  kpiCost_m,
  kpiService_q,
  kpiCost_q,
  kpiService_y,
  kpiCost_y
} from '@/app/data/analysis/spendData';
import React, { Fragment, useState } from 'react';
import {
  Disclosure,
  Menu,
  Transition,
  Dialog,
  Popover
} from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import {
  ChatBubbleBottomCenterTextIcon,
  PaperClipIcon,
  PencilIcon,
  TrashIcon,
  ChevronDoubleRightIcon,
  ChevronDownIcon
} from '@heroicons/react/20/solid';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

const navigation = [
  {
    name: 'Expense Analysis',
    href: '/agent/analysis/expenseAnalysis',
    current: false
  },
  {
    name: 'Inventory Analysis',
    href: '/agent/analysis/inventoryAnalysis',
    current: false
  },
  {
    name: 'Inventory Cost Analysis',
    href: '/agent/analysis/inventoryAnalysis',
    current: false
  },
  {
    name: 'On-Time Analysis',
    href: '/agent/analysis/apAnalysis',
    current: false
  },
  {
    name: 'OP Expense Analysis',
    href: '/agent/analysis/opAnalysis',
    current: false
  },
  {
    name: 'Order Analysis',
    href: '/agent/analysis/orderAnalysis',
    current: false
  },
  {
    name: 'Procurement Analysis',
    href: '/agent/analysis/procurementAnalysis',
    current: false
  },
  {
    name: 'Spend Analysis',
    href: '/agent/analysis/spendAnalysis',
    current: true
  },
  {
    name: 'Supplier Analysis',
    href: '/agent/analysis/supplyAnalysis',
    current: false
  }
];

const filters = [
  {
    id: 'year',
    name: 'Year',
    options: [
      { value: 'new-arrivals', label: 'All New Arrivals' },
      { value: 'tees', label: 'Tees' },
      { value: 'all', label: 'All' }
    ]
  },
  {
    id: 'quarter',
    name: 'Quarter',
    options: [
      { value: 'all', label: 'All' },
      { value: 'q1', label: 'Q1' },
      { value: 'q2', label: 'Q2' },
      { value: 'q3', label: 'Q3' },
      { value: 'q4', label: 'Q4' }
    ]
  },
  {
    id: 'region',
    name: 'Region',
    options: [
      { value: 'north', label: 'North' },
      { value: 'south', label: 'South' },
      { value: 'east', label: 'East' },
      { value: 'west', label: 'West' }
    ]
  },
  {
    id: 'country',
    name: 'Country',
    options: [
      { value: 'us', label: 'United States' },
      { value: 'ca', label: 'Canada' },
      { value: 'uk', label: 'United Kingdom' },
      { value: 'au', label: 'Australia' }
    ]
  }
];


const stats = [
  { name: 'Spend', stat: '$128M' },
  { name: 'Addressable', stat: '$105M' },
  { name: 'Supplier Count', stat: '55' },
  { name: 'Contract', stat: '$82M' }
];



function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function SpendAnalysisRoute() {
  const [open, setOpen] = useState(false);

   const [activeFilters, setActiveFilters] = useState<{
     [key: string]: string[];
   }>({});

   const handleFilterChange = (sectionId: string, optionValue: string) => {
     setActiveFilters((prev) => {
       const newFilters = { ...prev };
       if (newFilters[sectionId]?.includes(optionValue)) {
         newFilters[sectionId] = newFilters[sectionId].filter(
           (v) => v !== optionValue
         );
       } else {
         newFilters[sectionId] = [
           ...(newFilters[sectionId] || []),
           optionValue
         ];
       }
       if (newFilters[sectionId].length === 0) {
         delete newFilters[sectionId];
       }
       return newFilters;
     });
   };

   const removeFilter = (sectionId: string, optionValue: string) => {
     setActiveFilters((prev) => {
       const newFilters = { ...prev };
       newFilters[sectionId] = newFilters[sectionId].filter(
         (v) => v !== optionValue
       );
       if (newFilters[sectionId].length === 0) {
         delete newFilters[sectionId];
       }
       return newFilters;
     });
  };

  return (
    <>
      <div
        className="flex flex-col m-4"
        style={{
          minHeight: `calc(100vh - 4rem)`
        }}
      >
        {/* Filters */}
        <div className="bg-white border-b">
          <div className="mx-auto  px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                {filters.map((section) => (
                  <DropdownMenu key={section.id}>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="h-8">
                        {section.name}
                        <ChevronDownIcon className="ml-2 size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>{section.name}</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {section.options.map((option) => (
                        <DropdownMenuCheckboxItem
                          key={option.value}
                          checked={activeFilters[section.id]?.includes(
                            option.value
                          )}
                          onCheckedChange={() =>
                            handleFilterChange(section.id, option.value)
                          }
                        >
                          {option.label}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ))}
              </div>
              <div className="flex items-center space-x-2">
                {Object.entries(activeFilters).map(([sectionId, values]) =>
                  values.map((value) => {
                    const section = filters.find((f) => f.id === sectionId);
                    const option = section?.options.find(
                      (o) => o.value === value
                    );
                    return (
                      <Badge
                        key={`${sectionId}-${value}`}
                        variant="secondary"
                        className="flex items-center space-x-1"
                      >
                        <span>{option?.label}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-4 p-0 hover:bg-transparent"
                          onClick={() => removeFilter(sectionId, value)}
                        >
                          <XMarkIcon className="size-3" />
                          <span className="sr-only">Remove filter</span>
                        </Button>
                      </Badge>
                    );
                  })
                )}
                {Object.keys(activeFilters).length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveFilters({})}
                    className="text-sm font-medium text-gray-700"
                  >
                    Clear all
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* stats */}

        <div>
          <dl className="mx-4 mb-2 mt-4 grid grid-cols-1 gap-6  lg:grid-cols-4">
            {stats.map((item) => (
              <div
                key={item.name}
                className="items-center overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
              >
                <dt className="truncate text-center text-lg font-medium text-gray-500">
                  {item.name}
                </dt>
                <dd className="mt-1 text-center text-4xl font-bold tracking-tight  text-gray-900  lg:text-5xl">
                  {item.stat}
                </dd>
              </div>
            ))}
          </dl>
          <div className="relative">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="mx-4 w-full border-t border-gray-200" />
            </div>
          </div>
        </div>

        {/* charts */}

        <ul
          role="list"
          className="m-4 grid grid-cols-1 grid-rows-2 gap-6 md:grid-cols-2"
        >
          {/* grid-row-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 */}
          {kpiService_m.map((kpi) => (
            <li
              key={kpi.Name}
              className="col-span-1 flex flex-col divide-y divide-white rounded-lg bg-white shadow-xl shadow-slate-900/10"
            >
              <div className="relative flex flex-1 flex-col py-2 pl-3">
                <div className="flex items-baseline gap-2">
                  <div>
                    <h3 className="text-md mt-6 font-medium text-gray-900">
                      {kpi.Name}
                    </h3>
                    <h1 className="font-display text-d-h3 mb-3 text-4xl font-bold text-black">
                      {kpi.Value}
                    </h1>
                  </div>
                </div>
                <div>{kpi.container}</div>
              </div>
              <div></div>
            </li>
          ))}
        </ul>

        {/* icons with border */}
        <footer className="mt-auto">
          <Disclosure as="nav" className="bg-white h-16 border-t">
            {({ open }) => (
              <>
                <div className="w-full p-2 sm:px-2 lg:px-2">
                  <div className="flex h-12 items-center justify-">
                    <h2 className="text-md font-bold text-gray-500 mr-2">
                      DC Analysis
                    </h2>
                    <ChevronDoubleRightIcon
                      className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500 items-center"
                      aria-hidden="true"
                    />
                    <div className="flex items-center">
                      <div className="hidden md:block">
                        {/* <div className="flex items-baseline space-x-4"> */}
                        <div className="flex items-baseline">
                          {navigation.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className={classNames(
                                item.current
                                  ? 'bg-blue-500 text-white'
                                  : 'text-black hover:bg-blue-500 hover:text-white',
                                'text-md rounded-md px-5 py-2 mx-2 font-medium'
                              )}
                              aria-current={item.current ? 'page' : undefined}
                            >
                              {item.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="-mr-2 flex md:hidden">
                      {/* Mobile menu button */}
                      <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XMarkIcon
                            className="block size-6"
                            aria-hidden="true"
                          />
                        ) : (
                          <Bars3Icon
                            className="block size-6"
                            aria-hidden="true"
                          />
                        )}
                      </Disclosure.Button>
                    </div>
                  </div>
                </div>

                <Disclosure.Panel className="md:hidden">
                  <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                    {navigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'block rounded-md px-3 py-2 text-base font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </footer>
      </div>
    </>
  );
}
