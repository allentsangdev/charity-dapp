"use client"

import { useState } from "react"
import Link from "next/link"
import thousandSeparator from "@/func/thousandSep"
import { X } from "lucide-react"
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import TableLoading from "../TableLoading"
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
              className="ml-[600px] w-8 h-8 flex-shrink-0 rounded-full mb-8 flex justify-center items-center border-[#0F172A] border-2 cursor-pointer hover:opacity-60"
              onClick={() => setOpen(false)}
            >
              <p className="font-bold text-[#0F172A]">
                <X />
              </p>
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

export function MoreInfoCampaginDrawer({
  children,
  camp,
  index,
  refetch,
}: any) {
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
              className="ml-[600px] w-8 h-8 flex-shrink-0 rounded-full mb-8 flex justify-center items-center border-[#0F172A] border-2 cursor-pointer hover:opacity-60"
              onClick={() => setOpen(false)}
            >
              <p className="font-bold text-[#0F172A]">
                <X />
              </p>
            </div>
            <div className="max-w-lg mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="w-full h-12 flex justify-center">
                    {/* {data?.CampaignName} */}
                    <div className="w-full flex justify-center items-center font-bold text-3xl">
                      {camp?.name}
                    </div>
                  </CardTitle>
                  <CardContent>
                    <div className="w-full mt-10">{camp?.desc}</div>
                    <div className="flex flex-col w-full mt-10">
                      <div className="flex w-full justify-between items-center">
                        <p className="font-bold">Due Date:</p>
                        <div className="w">{camp?.dueDate}</div>
                      </div>
                      <div className="flex w-full justify-between mt-4">
                        <div className="w-full flex justify-between items-center">
                          <p className="font-bold">Raised Amount:</p>
                          {thousandSeparator(camp?.raisedAmount)}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardDescription />
                  <CardDescription />
                  <CardDescription />
                  <Separator />
                  <CardDescription />
                  <CardDescription />
                  <h1 className="font-bold text-xl w-full flex justify-center items-center">
                    How much would you like to help?
                  </h1>
                  <CardDescription />
                  <CardDescription />
                  <CardDescription />
                  <DonateToCampagin
                    {...{ open, setOpen, camp, index, refetch }}
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

export function MoreInfoOrgDrawer({ children, org, index, refetch }: any) {
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
              className="ml-[600px] w-8 h-8 flex-shrink-0 rounded-full mb-8 flex justify-center items-center border-[#0F172A] border-2 cursor-pointer hover:opacity-60"
              onClick={() => setOpen(false)}
            >
              <p className="font-bold text-[#0F172A]">
                <X />
              </p>
            </div>
            <div className="max-w-lg mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="w-full h-12 flex justify-center">
                    {/* {data?.CampaignName} */}
                    <div className="w-full flex justify-center items-center font-bold text-3xl">
                      {org?.name}
                    </div>
                  </CardTitle>
                  <CardContent>
                    <div className="w-full mt-10">{org?.desc}</div>
                  </CardContent>
                </CardHeader>
              </Card>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

export function TxHistoryDrawer({ children, txList, isTxLoading }: any) {
  const [open, setOpen] = useState(false)

  return (
    <Drawer.Root dismissible={false} open={open}>
      <Drawer.Trigger asChild onClick={() => setOpen(true)}>
        {children}
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="mx-auto bg-zinc-100 flex flex-col w-3/5 rounded-t-[10px] h-[86%] mt-24 fixed bottom-0 left-0 right-0">
          <div className="p-4 bg-white rounded-t-[10px] flex-1 border border-solid">
            {/* <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" /> */}
            <div
              className="ml-[970px] w-8 h-8 flex-shrink-0 rounded-full mb-8 flex justify-center items-center border-[#0F172A] border-2 cursor-pointer hover:opacity-60"
              onClick={() => setOpen(false)}
            >
              <p className="font-bold text-[#0F172A]">
                <X />
              </p>
            </div>
            <div className="w-[90%] p-4 mx-auto">
              <div className="w-full text-3xl flex justify-center items-center font-bold mb-10">
                <h1>Transaction History</h1>
              </div>
              {!isTxLoading && txList?.length === 0 ? (
                <div className="w-full flex justify-center items-center">
                  There is no Transaction to show for now!
                </div>
              ) : (
                <Table className="w-full">
                  <TableHeader>
                    <TableRow>
                      <TableHead>From</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {!isTxLoading ? (
                      txList?.map((camp: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell className="">{camp?.from}</TableCell>
                          <TableCell className="font-medium">
                            $ {camp?.value}
                          </TableCell>
                          <TableCell className="">{camp?.date}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableLoading />
                    )}
                  </TableBody>
                </Table>
              )}
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
