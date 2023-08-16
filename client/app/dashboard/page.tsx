"use client"

import * as React from "react"

import { Separator } from "@/components/ui/separator"

const page = () => {
  return (
    <>
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-medium">Campaigns</h3>
          <p className="text-sm text-muted-foreground">
            Update your account settings. Set your preferred language and
            timezone.
          </p>
        </div>
        <Separator />
      </div>
    </>
  )
}

export default page
