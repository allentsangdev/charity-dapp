"use client"

import { useState } from "react"
import { releaseFund } from "@/controller/controller"
import convertToNumber from "@/func/convertToNumbers"
import { formatCharityData } from "@/func/formatCharityData"
import thousandSeparator from "@/func/thousandSep"
import axios from "axios"
import { Loader2, Plus } from "lucide-react"
import { useMutation, useQuery } from "react-query"
import Web3 from "web3"

import { AddCampaginDrawer } from "@/components/ui/Drawer"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { toast } from "@/components/ui/use-toast"

export default function SettingsAccountPage({ params }: any) {
  const [isReleaseLoading, setIsReleaseLoading] = useState(false)
  const walletAddress = params?.orgID
  const getData = async () => {
    const response = await axios.get(
      `https://charity-dapp-api.onrender.com/get-campaign-by-owner/${walletAddress}`
    )
    return response.data
  }

  const { data, isLoading, refetch } = useQuery("list", getData)

  const formattedCharityData = formatCharityData(data, isLoading)
  const campList = formattedCharityData

  const handleReleaseFund = async (index: number) => {
    setIsReleaseLoading(true)

    const res = await releaseFund(window.ethereum, index)

    if (res?.hash?.length > 0) {
      toast({
        description: "Your new Campaign has been created!.",
      })
      setTimeout(() => {
        window.location.reload()
      }, 1500)
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      })
    }
    setIsReleaseLoading(false)
  }

  return (
    <div className="space-y-5 w-full">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-medium">Campaigns</h3>
          <p className="text-sm text-muted-foreground mt-2">
            You can create a new one or manage the list.
          </p>
        </div>
        <div className="mt-3">
          <AddCampaginDrawer {...{ refetch, walletAddress }}>
            <Button className="flex justify-center items-center font-bold">
              <span className="mr-2">
                <Plus size={20} />
              </span>
              New Campaign
            </Button>
          </AddCampaginDrawer>
        </div>
      </div>
      <Separator />
      {!isLoading && !campList ? (
        <div className="w-full flex justify-center items-center">
          There is no Campaign, Wanna create a new one?
        </div>
      ) : (
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Admin Fee</TableHead>
              <TableHead>Raised Amount</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {!isLoading ? (
              campList?.map((camp: any, index: number) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{camp?.name}</TableCell>
                  <TableCell className="truncate max-w-xs">
                    {camp?.desc}
                  </TableCell>
                  <TableCell>{camp?.dueDate}</TableCell>
                  <TableCell>{camp?.adminFee}</TableCell>
                  <TableCell>{camp?.raisedAmount}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleReleaseFund(index)}
                      disabled={
                        convertToNumber(camp.raisedAmount) > 0 ? false : true
                      }
                    >
                      Withdraw
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <>
                <TableRow>
                  <TableCell>
                    <Skeleton className="h-10 w-[200px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-10 w-[200px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-10 w-[200px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-10 w-[200px]" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Skeleton className="h-10 w-[200px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-10 w-[200px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-10 w-[200px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-10 w-[200px]" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Skeleton className="h-10 w-[200px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-10 w-[200px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-10 w-[200px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-10 w-[200px]" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Skeleton className="h-10 w-[200px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-10 w-[200px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-10 w-[200px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-10 w-[200px]" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Skeleton className="h-10 w-[200px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-10 w-[200px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-10 w-[200px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-10 w-[200px]" />
                  </TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
