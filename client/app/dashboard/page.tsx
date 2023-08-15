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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Loading from "@/components/Loading"
import { AlertModal } from "@/components/donator/Modal"

const page = () => {
  const [isWithdraw, setIsWithdraw] = React.useState(false)
  const [doLoading, setDoLoading] = React.useState(false)
  // const getData = async () => {
  //   const response = await axios.post("http://20.63.75.49:4000/get-campaign", {
  //     identityLabel: "User1@org1.example.com",
  //     chaincodeArgs: [`C1`],
  //   })
  //   return response.data
  // }

  // const { data, isLoading } = useQuery(`campaignC1`, getData)

  const handleWithdraw = () => {
    setIsWithdraw(true)
    setDoLoading(true)

    setTimeout(() => setDoLoading(false), 2000)
  }

  return (
    <>
      {/* {isLoading || doLoading ? (
        <Loading />
      ) : ( */}
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-medium">Campaigns</h3>
          <p className="text-sm text-muted-foreground">
            Update your account settings. Set your preferred language and
            timezone.
          </p>
        </div>
        <Separator />
      </div>
      {/* ADD CAMPAIGN IS HERE  */}
      {/* <MyDrawer>
        <Button className="flex justify-center items-center text-lg font-bold rounded-full">
          +
        </Button>
      </MyDrawer> */}
      {/* ADD CAMPAIGN IS HERE  */}
    </>
  )
}

export default page
