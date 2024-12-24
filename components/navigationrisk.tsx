'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as React from 'react'


function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const navigation = [
  {
    name: 'WM Agent',
    to: '/chat',
    current: true
  },
  {
    name: 'Dashboard',
    to: '/agent/dashboard',
    current: true
  },
  {
    name: 'Control Tower',
    to: '/agent/events',
    current: true
  },
  {
    name: 'Master Data',
    to: '/agent/masterData',
    current: true
  }
];

export function NavigationRisk() {
  const pathname = usePathname()
  return (
      <nav >
        <div className="w-full">
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <div className="flex items-baseline space-x-4">
                {navigation?.map(item => (
                  <Link
                    href={item.to}
                    key={item.name}
                    className={classNames(
                      'rounded-md px-2 py-2 text-xs font-semibold',
                      pathname === item.to
                        ? 'bg-sky-500 text-white border border-sky-500'
                        : 'text-primary hover:bg-sky-500 hover:text-white'
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
  )
}