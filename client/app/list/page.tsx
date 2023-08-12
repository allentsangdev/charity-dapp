"use client"

import { useEffect, useLayoutEffect, useState } from "react"
import Link from "next/link"
import thousandSeparator from "@/func/thousandSep"
import timeConvert from "@/func/timeConvert"
import listState from "@/store/listState"
import axios from "axios"
import { QueryClient, useQuery } from "react-query"

import { Campaign } from "@/types/campaign"
import { MoreInfoCampaginDrawer } from "@/components/ui/Drawer"
import { Button } from "@/components/ui/button"
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
import Loading from "@/components/Loading"

import { formatCharityData } from "../dashboard/campaigns/page"

const TableDemo = () => {
  const getData = async () => {
    const response = await axios.get(
      `https://charity-dapp-api.onrender.com/get-all-campaign`
    )
    return response.data
  }

  const { data, isLoading } = useQuery("list", getData)

  const formattedCharityData = formatCharityData(data, isLoading)
  const campList = formattedCharityData

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="border p-4 rounded-lg w-full mt-10 mb-40">
          {!isLoading && !campList ? (
            <div className="w-full flex justify-center items-center">
              There is no Campaign to show for now!
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
                      <TableCell className="font-medium">
                        {camp?.name}
                      </TableCell>
                      <TableCell>{camp?.desc}</TableCell>
                      <TableCell>{camp?.dueDate}</TableCell>
                      <TableCell>{camp?.adminFee}</TableCell>
                      <TableCell className="text-right">
                        <MoreInfoCampaginDrawer {...{ camp, index }}>
                          <Button>More info</Button>
                        </MoreInfoCampaginDrawer>
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
      )}
    </>
  )
}

export default TableDemo
