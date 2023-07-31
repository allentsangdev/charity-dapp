"use client"

import * as React from "react"
import Link from "next/link"
import thousandSeparator from "@/func/thousandSep"
import axios from "axios"
import { NumericFormat } from "react-number-format"
import { useQuery } from "react-query"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import Loading from "@/components/Loading"
import { AlertModal } from "@/components/donator/Modal"

const page = () => {
  const [isWithdraw, setIsWithdraw] = React.useState(false)
  const [doLoading, setDoLoading] = React.useState(false)
  const getData = async () => {
    const response = await axios.post("http://20.63.75.49:4000/get-campaign", {
      identityLabel: "User1@org1.example.com",
      chaincodeArgs: [`C1`],
    })
    return response.data
  }

  const { data, isLoading } = useQuery(`campaignC1`, getData)

  const handleWithdraw = () => {
    setIsWithdraw(true)
    setDoLoading(true)

    setTimeout(() => setDoLoading(false), 2000)
  }

  return (
    <>
      {isLoading || doLoading ? (
        <Loading />
      ) : (
        <div className="w-full flex justify-center items-center">
          <Card className="">
            <CardHeader>
              <CardTitle className="w-96 h-12 flex justify-center text-2xl">
                {data?.CampaignName}
              </CardTitle>
              <CardDescription />
              <CardDescription />
              <CardDescription />
              <CardDescription className="text-base">
                {data?.FundReceiver}
              </CardDescription>
              <CardDescription />
              <Separator orientation="horizontal" />
              <CardDescription />
              <CardDescription>{data?.CampaignDesc}</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-4">
                    <Label htmlFor="name">Amount</Label>
                    {isWithdraw
                      ? "$0"
                      : `$${thousandSeparator(data?.CurrentRaisedAmt)}`}
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link href="/">
                <Button variant="ghost">Log out</Button>
              </Link>
              <AlertModal isDonator={false} {...{ handleWithdraw }}>
                <Button>Withdraw</Button>
              </AlertModal>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  )
}

export default page
