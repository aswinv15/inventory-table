'use client';

import * as React from 'react';
import {
  Check,
  ChevronsUpDown,
  GalleryVerticalEnd,
  Search
} from 'lucide-react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger
} from '@/components/ui/sidebar';
import CustomersPage from '@/app/(inventory)/customers/page';
const data = {
  versions: ['1.0.1', '1.1.0-alpha', '2.0.0-beta1'],
  navMain: [

    {
      title: 'Building Your Application',
      href: '#',
      items: [
        {
          title: 'Customers',
          href: '',
          content: <CustomersPage />
        },
        {
          title: 'Data Fetching',
          href: '#',
          content: 'Learn about different data fetching methods.',
          isActive: true
        },
        {
          title: 'Rendering',
          href: '#',
          content: 'Explore various rendering techniques and optimizations.'
        },
        {
          title: 'Caching',
          href: '#',
          content: 'Implement caching strategies for better performance.'
        }
      ]
    },
    {
      title: 'API Reference',
      href: '#',
      items: [
        {
          title: 'Components',
          href: '#',
          content: 'Detailed documentation of all available components.'
        },
        {
          title: 'File Conventions',
          href: '#',
          content: 'Learn about the file naming conventions and organization.'
        }
      ]
    }
  ]
};

export default function AppSidebar() {
  const [selectedVersion, setSelectedVersion] = React.useState(
    data.versions[0]
  );
  const [selectedItem, setSelectedItem] = React.useState(
    data.navMain[1].items[1]
  );

  return (
    <SidebarProvider>
      <div className="flex w-full h-screen">
        <Sidebar>
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton
                      size="lg"
                      className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    >
                      <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                        <GalleryVerticalEnd className="size-4" />
                      </div>
                      <div className="flex flex-col gap-0.5 leading-none">
                        <span className="font-semibold">Documentation</span>
                        <span className="">v{selectedVersion}</span>
                      </div>
                      <ChevronsUpDown className="ml-auto" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-[--radix-dropdown-menu-trigger-width]"
                    align="start"
                  >
                    {data.versions.map((version) => (
                      <DropdownMenuItem
                        key={version}
                        onSelect={() => setSelectedVersion(version)}
                      >
                        v{version}{' '}
                        {version === selectedVersion && (
                          <Check className="ml-auto" />
                        )}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
            <form>
              <SidebarGroup className="py-0">
                <SidebarGroupContent className="relative">
                  <Label htmlFor="search" className="sr-only">
                    Search
                  </Label>
                  <SidebarInput
                    id="search"
                    placeholder="Search the docs..."
                    className="pl-8"
                  />
                  <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
                </SidebarGroupContent>
              </SidebarGroup>
            </form>
          </SidebarHeader>
          <SidebarContent>
            {data.navMain.map((section) => (
              <SidebarGroup key={section.title}>
                <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {section.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          isActive={item === selectedItem}
                          onClick={() => setSelectedItem(item)}
                        >
                          <button>{item.title}</button>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarContent>
          <SidebarRail />
        </Sidebar>
        <SidebarInset className="flex-1">
          {/* <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    {
                      data.navMain.find((section) =>
                        section.items.some((item) => item === selectedItem)
                      )?.title
                    }
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{selectedItem.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header> */}
          <div className="p-6">
            {/* <h2 className="text-2xl font-bold mb-4">{selectedItem.title}</h2> */}
            <p>{selectedItem.content}</p>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
