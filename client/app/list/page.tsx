"use client"

import { useEffect, useLayoutEffect, useState } from "react"
import Link from "next/link"
import { formatCharityData } from "@/func/formatCharityData"
import thousandSeparator from "@/func/thousandSep"
import timeConvert from "@/func/timeConvert"
import listState from "@/store/listState"
import axios from "axios"
import { QueryClient, useQuery } from "react-query"

import { Campaign } from "@/types/campaign"
import {
  MoreInfoCampaginDrawer,
  MoreInfoOrgDrawer,
} from "@/components/ui/Drawer"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TableLoading from "@/components/TableLoading"

const TableDemo = () => {
  const getCampaigns = async () => {
    const response = await axios.get(
      `https://charity-dapp-api.onrender.com/get-all-campaign`
    )
    return response.data
  }

  const {
    data: campaigns,
    isLoading: isCampaignsLoading,
    refetch,
  } = useQuery("campaignsList", getCampaigns)

  const formattedCharityData = formatCharityData(campaigns, isCampaignsLoading)
  const campList = formattedCharityData

  const getOrgs = async () => {
    const response = await axios.get(
      `https://charity-dapp-api.onrender.com/get-all-charityOrg`
    )
    return response.data
  }
  const { data: orgs, isLoading: isOrgsLoading } = useQuery("orgList", getOrgs)

  const orgList = !isOrgsLoading
    ? orgs.map((item: any) => {
        return {
          name: item[1],
          desc: item[2],
        }
      })
    : null
  console.log(orgList)

  return (
    <>
      <div className="w-full">
        <Tabs
          defaultValue="campaigns"
          className="relative mt-10 mx-auto flex flex-col w-[90%]"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="organizations">Organizations</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          </TabsList>

          <TabsContent value="campaigns" className="w-full">
            <div className="border p-4 rounded-lg w-full mt-10 mb-40">
              {!isCampaignsLoading && !campList ? (
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
                      <TableHead>Raised Amount</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {!isCampaignsLoading ? (
                      campList?.map((camp: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell className="font-bold text-base">
                            {camp?.name}
                          </TableCell>
                          <TableCell className="truncate max-w-xs">
                            {camp?.desc}
                          </TableCell>
                          <TableCell>{camp?.dueDate}</TableCell>
                          <TableCell>{camp?.adminFee}</TableCell>
                          <TableCell>{camp?.raisedAmount}</TableCell>
                          <TableCell className="text-right">
                            <MoreInfoCampaginDrawer
                              {...{ camp, index, refetch }}
                            >
                              <Button>More info</Button>
                            </MoreInfoCampaginDrawer>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableLoading />
                    )}
                  </TableBody>
                </Table>
              )}
            </div>
          </TabsContent>
          <TabsContent value="organizations">
            <div className="border p-4 rounded-lg w-full mt-10 mb-40">
              {!isOrgsLoading && !orgList ? (
                <div className="w-full flex justify-center items-center">
                  There is no Campaign to show for now!
                </div>
              ) : (
                <Table className="w-full">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Description</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {!isOrgsLoading ? (
                      orgList?.map((org: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell className="font-bold text-base">
                            {org?.name}
                          </TableCell>
                          <TableCell className="truncate max-w-xs">
                            {org?.desc}
                          </TableCell>
                          <TableCell className="text-right">
                            <MoreInfoOrgDrawer {...{ org, index, refetch }}>
                              <Button>More info</Button>
                            </MoreInfoOrgDrawer>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableLoading />
                    )}
                  </TableBody>
                </Table>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}

export default TableDemo
