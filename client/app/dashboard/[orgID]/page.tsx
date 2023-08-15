"use client"

import thousandSeparator from "@/func/thousandSep"
import axios from "axios"
import { useMutation, useQuery } from "react-query"

import { AddCampaginDrawer } from "@/components/ui/Drawer"
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

export const formatCharityData = (charityData: any, isLoading: boolean) => {
  if (!isLoading)
    return charityData?.map((data: any) => {
      const [address, nothingA, name, desc, dueDate, nothingB, adminFee] = data

      return {
        name: name,
        desc: desc,
        dueDate: dueDate,
        adminFee: `$${thousandSeparator(parseInt(adminFee.hex, 16))}`,
      }
    })
}

export default function SettingsAccountPage({ params }: any) {
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

  const mutation = useMutation(
    (id: any) => {
      return axios.post("https://charity-dapp-api.onrender.com/release-fund", {
        _campaignId: String(id),
      })
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
          description: "The fund is now released!",
        })
        refetch()
      },
    }
  )

  const { isLoading: withdrawIsLoading } = mutation

  return (
    <div className="space-y-6 w-full">
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
              Create a new Campaign
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
            </TableRow>
          </TableHeader>

          <TableBody>
            {!isLoading ? (
              campList?.map((camp: any, index: number) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{camp?.name}</TableCell>
                  <TableCell>{camp?.desc}</TableCell>
                  <TableCell>{camp?.dueDate}</TableCell>
                  <TableCell>{camp?.adminFee}</TableCell>
                  <TableCell className="text-right">
                    <Button onClick={() => mutation.mutate(index)}>
                      Withdraw
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <>
                <TableRow>
                  <TableCell>
                    <Skeleton className="h-10 w-[200px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-10 w-[200px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-10 w-[200px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-10 w-[200px]" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Skeleton className="h-10 w-[200px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-10 w-[200px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-10 w-[200px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-10 w-[200px]" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Skeleton className="h-10 w-[200px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-10 w-[200px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-10 w-[200px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-10 w-[200px]" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Skeleton className="h-10 w-[200px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-10 w-[200px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-10 w-[200px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-10 w-[200px]" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Skeleton className="h-10 w-[200px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-10 w-[200px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-10 w-[200px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-10 w-[200px]" />
                  </TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
