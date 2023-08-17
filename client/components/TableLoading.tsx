import React from "react"

import { Skeleton } from "./ui/skeleton"
import { TableCell, TableRow } from "./ui/table"

const TableLoading = () => {
  return (
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
  )
}

export default TableLoading
