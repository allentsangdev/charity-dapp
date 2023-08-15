"use client"

import { useState } from "react"
import Link from "next/link"
import { Drawer } from "vaul"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import AddCampaginForm from "../dashboard/AddCampaginForm"
import DonateToCampagin from "../dashboard/DonateToCampagin"
import { Label } from "./label"
import { Separator } from "./separator"

export function AddCampaginDrawer({ children, refetch, walletAddress }: any) {
  const [open, setOpen] = useState(false)
  return (
    <Drawer.Root dismissible={false} open={open}>
      <Drawer.Trigger asChild onClick={() => setOpen(true)}>
        {children}
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="mx-auto bg-zinc-100 flex flex-col w-2/5 rounded-t-[10px] h-[86%] mt-24 fixed bottom-0 left-0 right-0">
          <div className="p-4 bg-white rounded-t-[10px] flex-1 border border-solid">
            {/* <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" /> */}
            <div
              className="ml-[600px] w-8 h-8 flex-shrink-0 rounded-full mb-8 flex justify-center items-center bg-[#0F172A] cursor-pointer hover:opacity-90"
              onClick={() => setOpen(false)}
            >
              <p className="font-bold text-white">X</p>
            </div>
            <div className="max-w-md mx-auto">
              <Card className="">
                <CardHeader>
                  <CardTitle className="w-96 h-12 flex justify-center text-2xl">
                    {/* {data?.CampaignName} */}
                    <div className="w-full flex justify-center items-center">
                      Create a new Campaign
                    </div>
                  </CardTitle>
                  <CardDescription />
                  <CardDescription />
                  <CardDescription />
                  <AddCampaginForm
                    {...{ open, setOpen, refetch, walletAddress }}
                  />
                </CardHeader>
              </Card>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

export function MoreInfoCampaginDrawer({ children, camp, index }: any) {
  const [open, setOpen] = useState(false)
  console.log(camp)

  return (
    <Drawer.Root dismissible={false} open={open}>
      <Drawer.Trigger asChild onClick={() => setOpen(true)}>
        {children}
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="mx-auto bg-zinc-100 flex flex-col w-2/5 rounded-t-[10px] h-[86%] mt-24 fixed bottom-0 left-0 right-0">
          <div className="p-4 bg-white rounded-t-[10px] flex-1 border border-solid">
            {/* <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" /> */}
            <div
              className="ml-[600px] w-8 h-8 flex-shrink-0 rounded-full mb-8 flex justify-center items-center bg-[#0F172A] cursor-pointer hover:opacity-90"
              onClick={() => setOpen(false)}
            >
              <p className="font-bold text-white">X</p>
            </div>
            <div className="max-w-md mx-auto">
              <Card className="">
                <CardHeader>
                  <CardTitle className="w-96 h-12 flex justify-center text-2xl">
                    {/* {data?.CampaignName} */}
                    <div className="w-full flex justify-center items-center">
                      {camp?.name}
                    </div>
                  </CardTitle>
                  <CardDescription />
                  <CardDescription />
                  <CardDescription />
                  <DonateToCampagin {...{ open, setOpen, camp, index }} />
                </CardHeader>
              </Card>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
