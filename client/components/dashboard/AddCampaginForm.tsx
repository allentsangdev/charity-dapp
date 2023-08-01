"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
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

function convertToNumber(amountString: string) {
  // Remove all non-numeric characters using regular expression
  const numericString = amountString.replace(/[^\d.-]/g, "")

  // Convert the numeric string to a number
  const amountNumber = parseFloat(numericString)

  return amountNumber
}

const AddCampaginForm = ({ open, setOpen }: any) => {
  const form = useForm()

  const mutation = useMutation((data: any) => {
    const { name, description, dueDate, paymentType, adminFee, beneficiaries } =
      data
    return axios.post("https://charity-dapp-api.onrender.com/create-campaign", {
      _campaignName: name,
      _campaignDesc: description,
      _dueDate: format(dueDate, "PPP"),
      _acceptedPaymentMethod: paymentType,
      _adminFee: convertToNumber(adminFee),
      _beneficiaries: [beneficiaries],
    })
  })

  const onSubmit = (data: any) => {
    mutation.mutate(data)

    setOpen(false)
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
                            "w-[190px] pl-3 text-left font-normal",
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
          name="adminFee"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Admin Fee</FormLabel>
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
        <Button className="w-full" type="submit">
          Create
        </Button>
      </form>
    </Form>
  )
}

export default AddCampaginForm
