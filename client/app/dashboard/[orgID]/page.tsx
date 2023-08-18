"use client"

import { useState } from "react"
import { getTransaction, releaseFund } from "@/controller/controller"
import convertToNumber from "@/func/convertToNumbers"
import { formatCharityData } from "@/func/formatCharityData"
import thousandSeparator from "@/func/thousandSep"
import timeConvert from "@/func/timeConvert"
import axios from "axios"
import { Loader2, Plus } from "lucide-react"
import { useMutation, useQuery } from "react-query"
import Web3 from "web3"

import { AddCampaginDrawer, TxHistoryDrawer } from "@/components/ui/Drawer"
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
import TableLoading from "@/components/TableLoading"

export default function SettingsAccountPage({ params }: any) {
  const [isTxLoading, setIsTxLoading] = useState(false)
  const [txList, setTxList] = useState([])
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

  const handleReleaseFund = async (campID: number) => {
    const res = await releaseFund(window.ethereum, campID)

    console.log("campID: ", campID)

    if (res?.hash?.length > 0) {
      toast({
        description: "The fund has been released.",
      })
      // setTimeout(() => {
      //   window.location.reload()
      // }, 1500)
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      })
    }
  }

  const handleTxHistroy = async (campID: number) => {
    setIsTxLoading(true)
    console.log("campID: ", campID)

    const res = await getTransaction(window.ethereum, campID)

    const filteredData = res.filter(
      (entry: any) => entry[0] !== "0x0000000000000000000000000000000000000000"
    )

    const processedData = filteredData.map((entry: any) => {
      console.log("entry: ", entry)

      const weiToAvaRate = 1e-18 // 1 Wei = 0.000000000000000001 AVAX
      const avaToUsdRate = 12 // 1 AVAX = 10 USD

      // Given value in Wei
      const valueInWei = BigInt(entry["amountSent"])

      // Step 1: Convert from Wei to AVAX
      const valueInAva = Number(valueInWei) * weiToAvaRate

      // Step 2: Convert from AVAX to USD
      const valueInUsd = valueInAva * avaToUsdRate
      const from = entry["from"]

      const value = Number(valueInUsd).toFixed(2)
      const timeStamp = String(Number(BigInt(entry["timeStamp"])) * 1000)
      const date = timeConvert(timeStamp)
      return { value, date, from }
    })

    console.log(processedData)
    setTxList(processedData)

    // console.log(res)

    setIsTxLoading(false)
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
              campList?.map((camp: any) => (
                <TableRow key={camp?.id}>
                  <TableCell className="font-medium">{camp?.name}</TableCell>
                  <TableCell className="truncate max-w-xs">
                    {camp?.desc}
                  </TableCell>
                  <TableCell>{camp?.dueDate}</TableCell>
                  <TableCell>{camp?.adminFee}</TableCell>
                  <TableCell>{camp?.raisedAmount}</TableCell>
                  <TableCell>
                    <TxHistoryDrawer
                      {...{ refetch, walletAddress, txList, isTxLoading }}
                    >
                      <Button onClick={() => handleTxHistroy(camp?.id)}>
                        History
                      </Button>
                    </TxHistoryDrawer>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleReleaseFund(camp?.id)}
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
              <TableLoading />
            )}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
