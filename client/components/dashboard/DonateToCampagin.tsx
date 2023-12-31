"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { donate } from "@/controller/controller"
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

const DonateToCampagin = ({ open, setOpen, camp, index, refetch }: any) => {
  const router = useRouter()
  const form = useForm()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (data: any) => {
    const { amount } = data
    setIsLoading(true)
    const usdToAvax = (convertToNumber(amount) / 12).toFixed(2).toString()

    const res = await donate(window.ethereum, camp?.id, usdToAvax)

    if (res?.hash?.length > 0) {
      toast({
        description: "Your new Campaign has been created!.",
      })
      setOpen(false)
      setTimeout(() => {
        refetch()
        window.location.reload()
      }, 2000)
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
                  prefix="$ "
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
