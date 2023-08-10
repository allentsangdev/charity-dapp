"use client"

import { useState } from "react"
import Link from "next/link"
import axios from "axios"
import { ethers } from "ethers"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import {registerAsCharityOrg} from "../../controller/controller"

export function Tab() {
  const [wallet, setWallet] = useState("")

  const handleCampaignRegister = async () => {
    registerAsCharityOrg(window.ethereum, "Testing Name","Testinf Desc")
  }

  const requestAccount = async () => {
    if (window?.ethereum) {
      console.log("Metamask detected")

      try {
        const accounts = await window?.ethereum?.request({
          method: "eth_requestAccounts",
        })
        console.log(accounts)
        setWallet(accounts[0])
      } catch (e) {
        console.log(e)
      }
    }
  }

  const handleConnectDonorWallet = async () => {
    try {
      if (!window.ethereum) {
        throw new Error("Ethereum provider not detected")
      }

      await requestAccount()

      // Create a Web3Provider instance
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      console.log("provider:", provider)
      const signer = provider.getSigner()
      const address = await signer.getAddress()

      console.log("signer: ", signer)
      console.log("address: ", address)
    } catch (error) {
      console.error("Error connecting wallet:", error)
    }
  }

  return (
    <Tabs className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Organization</TabsTrigger>
        <TabsTrigger value="password">Donator</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Organization</CardTitle>
            <CardDescription>
              Enter your email below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Username</Label>
              <Input id="name" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Password</Label>
              <Input id="password" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <div className="w-full border">
              <Link href="/dashboard/campaigns">
                <Button onClick={handleCampaignRegister} className="w-full">
                  Register
                </Button>
              </Link>
            </div>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Donator</CardTitle>
            <CardDescription>
              Connect your Metamask wallet to create your account
            </CardDescription>
          </CardHeader>
          {/* <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Username</Label>
              <Input id="current" type="email" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">Password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent> */}
          <CardFooter className="w-full flex justify-between items-center">
            <div className="w-full border">
              <Link href="">
                <Button onClick={handleConnectDonorWallet} className="w-full">
                  Connect your wallet
                </Button>
              </Link>
            </div>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
