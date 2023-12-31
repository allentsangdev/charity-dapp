"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { ethers } from "ethers"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { useQuery } from "react-query"
import { z } from "zod"

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import {
  registerAsCharityOrg,
  registerAsDonor,
} from "../../controller/controller"
import { Textarea } from "../ui/textarea"
import { toast } from "../ui/use-toast"

const donorSchema = z.object({
  name: z.string().min(3).max(30),
})

const orgSchema = z.object({
  name: z.string().min(3).max(30),
  desc: z.string().min(5).max(100),
})

export function Tab() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const { register: registerDonor, handleSubmit: handleDonorSubmit } = useForm({
    resolver: zodResolver(donorSchema),
  })

  const { register: registerOrg, handleSubmit: handleOrgSubmit } = useForm({
    resolver: zodResolver(orgSchema),
  })

  const handleCampaignRegister = async (name: string, desc: string) => {
    setIsLoading(true)
    const res = await registerAsCharityOrg(window.ethereum, name, desc)

    if (res?.hash?.length > 0) {
      router.push(`/dashboard/${res?.from}`)
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      })
    }
    setIsLoading(false)
  }

  const handleDonorRegister = async (name: string) => {
    setIsLoading(true)
    const res = await registerAsDonor(window.ethereum, name)

    if (res?.hash?.length > 0) {
      router.push("/list")
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      })
    }
    setIsLoading(false)
  }

  const submitDonor = (data: any) => {
    console.log(data)
    handleDonorRegister(data?.name)
  }
  const submitOrganization = (data: any) => {
    console.log(data)
    const { name, desc } = data
    handleCampaignRegister(name, desc)
  }

  return (
    <Tabs className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Organization</TabsTrigger>
        <TabsTrigger value="password">Donor</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Organization</CardTitle>
            <CardDescription>
              Enter your name and description of your team to create your new
              account.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleOrgSubmit(submitOrganization)}>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" {...registerOrg("name")} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="desc">Description</Label>
                <Textarea id="desc" {...registerOrg("desc")} />
              </div>
            </CardContent>
            <CardFooter className="w-full flex justify-between items-center">
              <div className="w-full border">
                {isLoading ? (
                  <Button disabled className="w-full">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </Button>
                ) : (
                  <Button className="w-full" type="submit">
                    Connect your wallet
                  </Button>
                )}
              </div>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Donor</CardTitle>
            <CardDescription>
              Connect your Metamask wallet to create your account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleDonorSubmit(submitDonor)}>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" {...registerDonor("name")} />
              </div>
            </CardContent>
            <CardFooter className="w-full flex justify-between items-center">
              <div className="w-full border">
                {isLoading ? (
                  <Button disabled className="w-full">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </Button>
                ) : (
                  <Button className="w-full" type="submit">
                    Connect your wallet
                  </Button>
                )}
              </div>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
