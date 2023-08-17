"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createCampaign } from "@/controller/controller"
import convertToNumber from "@/func/convertToNumbers"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { format } from "date-fns"
import { CalendarIcon, Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { NumericFormat } from "react-number-format"
import { useMutation } from "react-query"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { useToast } from "../ui/use-toast"

const AddCampaginForm = ({ open, setOpen, refetch, walletAddress }: any) => {
  const router = useRouter()
  const form = useForm()
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // const mutation = useMutation(
  //   (data: any) => {
  //     const {
  //       name,
  //       description,
  //       dueDate,
  //       paymentType,
  //       adminFee,
  //       beneficiaries,
  //     } = data
  //     return axios.post(
  //       "https://charity-dapp-api.onrender.com/create-campaign",
  //       {
  //         _campaignName: name,
  //         _campaignDesc: description,
  //         _dueDate: format(dueDate, "PPP"),
  //         _acceptedPaymentMethod: paymentType,
  //         _adminFee: convertToNumber(adminFee),
  //         _beneficiaries: [beneficiaries],
  //       }
  //     )
  //   },
  //   {
  //     onError: (error: any) => {
  //       toast({
  //         variant: "destructive",
  //         title: "Uh oh! Something went wrong.",
  //         description: "There was a problem with your request.",
  //       })
  //     },
  //     onSuccess: (data: any) => {
  //       toast({
  //         description: "Your new Campaign has been created!.",
  //       })
  //       refetch()
  //       setOpen(false)
  //     },
  //   }
  // )

  // const { isLoading } = mutation

  const onSubmit = async (data: any) => {
    setIsLoading(true)
    const { name, description, dueDate, paymentType, adminFee, beneficiaries } =
      data

    const res = await createCampaign(
      window.ethereum,
      name,
      description,
      format(dueDate, "PPP"),
      paymentType,
      convertToNumber(adminFee),
      [beneficiaries]
    )

    if (res?.hash?.length > 0) {
      toast({
        description: "Your new Campaign has been created!.",
      })
      setOpen(false)
      setTimeout(() => {
        refetch()
        window.location.reload()
      }, 1500)
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      })
    }
    setIsLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="New Help..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about your Goals"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="w-full flex justify-between items-end">
          <div className="w-1/2">
            <FormField
              control={form.control}
              name="adminFee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Admin Fee %</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[90px]">
                        <SelectValue placeholder="%" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0">0%</SelectItem>
                      <SelectItem value="5">5%</SelectItem>
                      <SelectItem value="10">10%</SelectItem>
                      <SelectItem value="15">15%</SelectItem>
                      <SelectItem value="20">20%</SelectItem>
                      <SelectItem value="25">25%</SelectItem>
                      <SelectItem value="30">30%</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/2 ml-2">
            <FormField
              control={form.control}
              name="paymentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Accepted Payments" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="USDT">USDT</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Due Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="beneficiaries"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Beneficiaries</FormLabel>
              <FormControl>
                <Input placeholder="0x123Abc" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        {isLoading ? (
          <Button disabled className="w-full">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button className="w-full" type="submit">
            Create
          </Button>
        )}
      </form>
    </Form>
  )
}

export default AddCampaginForm
