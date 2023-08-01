"use client"

import { Metadata } from "next"
import Image from "next/image"

import { Separator } from "@/components/ui/separator"
import { SidebarNav } from "@/components/dashboard/Sidebar"

const sidebarNavItems = [
  {
    title: "Campaigns",
    href: "/dashboard/campaigns",
  },
  {
    title: "Log out",
    href: "/",
  },
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <style jsx>{`
        /* Hide scrollbar */
        .scrollable-container {
          max-height: calc(100vh - 240px); /* Adjust the height accordingly */
          overflow-y: auto;
          scrollbar-width: none; /* Firefox */
        }

        .scrollable-container::-webkit-scrollbar {
          display: none; /* Hide scrollbar in WebKit browsers */
        }
      `}</style>

      <div className="md:hidden">{/* Your Image components */}</div>
      <div className="hidden space-y-6 p-10 pb-16 md:block w-[80%] mx-auto fixed top-20 left-[170px]">
        {/* Your header */}
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Manage your dashboard.</p>
        </div>
        <Separator className="my-1" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          {/* Make the children part scrollable */}
          <div className="flex w-full lg:w-4/5">
            <div className="flex-1 scrollable-container">{children}</div>
          </div>
        </div>
      </div>
    </>
  )
}
