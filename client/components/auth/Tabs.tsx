"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { ethers } from "ethers"
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
  const [wallet, setWallet] = useState("")
  const router = useRouter()

  const { register: registerDonor, handleSubmit: handleDonorSubmit } = useForm({
    resolver: zodResolver(donorSchema),
  })

  const { register: registerOrg, handleSubmit: handleOrgSubmit } = useForm({
    resolver: zodResolver(orgSchema),
  })

  const handleCampaignRegister = async (name: string, desc: string) => {
    const res = await registerAsCharityOrg(window.ethereum, name, desc)

    if (res?.hash?.length > 0) {
      router.push("/dashboard/campaigns")
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      })
    }
  }

  const handleDonorRegister = async (name: string) => {
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
  }

  // const handleConnectDonorWallet = async () => {
  //   try {
  //     if (!window.ethereum) {
  //       throw new Error("Ethereum provider not detected")
  //     }

  //     await requestAccount()

  //     if (window.ethereum.selectedAddress) {
  //       // Metamask is already connected, proceed with the redirection
  //       router.push("/list")
  //       return
  //     }

  //     // Create a Web3Provider instance
  //     const provider = new ethers.providers.Web3Provider(window.ethereum)
  //     console.log("provider:", provider)
  //     const signer = provider.getSigner()
  //     const address = await signer.getAddress()

  //     console.log("signer: ", signer)
  //     console.log("address: ", address)
  //   } catch (error) {
  //     console.error("Error connecting wallet:", error)
  //   }
  // }

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
                <Button className="w-full" type="submit">
                  Connect your wallet
                </Button>
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
                <Button className="w-full" type="submit">
                  Connect your wallet
                </Button>
              </div>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
