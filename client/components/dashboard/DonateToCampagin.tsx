"use client"

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

function convertToNumber(amountString: string) {
  // Remove all non-numeric characters using regular expression
  const numericString = amountString.replace(/[^\d.-]/g, "")

  // Convert the numeric string to a number
  const amountNumber = parseFloat(numericString)

  return amountNumber
}

const DonateToCampagin = ({ open, setOpen, refetch, camp, index }: any) => {
  const form = useForm()
  const { toast } = useToast()

  const mutation = useMutation(
    (data: any) => {
      const {
        name,
        description,
        dueDate,
        paymentType,
        adminFee,
        beneficiaries,
      } = data
      return axios.post(
        "https://charity-dapp-api.onrender.com/create-campaign",
        {
          _campaignName: name,
          _campaignDesc: description,
          _dueDate: format(dueDate, "PPP"),
          _acceptedPaymentMethod: paymentType,
          _adminFee: convertToNumber(adminFee),
          _beneficiaries: [beneficiaries],
        }
      )
    },
    {
      onError: (error: any) => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        })
      },
      onSuccess: (data: any) => {
        toast({
          description: "Your new Campaign has been created!.",
        })
        refetch()
        setOpen(false)
      },
    }
  )

  const { isLoading } = mutation

  const onSubmit = (data: any) => {
    mutation.mutate(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <NumericFormat
                  {...field}
                  customInput={Input}
                  thousandSeparator
                  allowNegative={false}
                  prefix="$"
                  placeholder="$"
                />
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
            Donate
          </Button>
        )}
      </form>
    </Form>
  )
}

export default DonateToCampagin
