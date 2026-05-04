"use client"

import {  useSuspenseQuery } from "@tanstack/react-query"
import { useTRPC } from "@/trpc/client"
import { LoadingState } from "@/components/loading-state"
import { ErrorState } from "@/components/error-state"
import { DataTable } from "@/components/data-table"
import { columns } from "../components/columns"
import { EmptyState } from "../components/empty-state"
import { useAgentFilters } from "../../hooks/use-agent-filters"
import { DataPagination } from "../components/data-pagination"
import { useRouter } from "next/navigation"

export const AgentsView = ()=>{
  const [filters , setFilters] = useAgentFilters()
    const trpc= useTRPC()
    const router=useRouter()
     const {data } = useSuspenseQuery(trpc.agents.getMany.queryOptions({...filters})) //prefetched data in dashboard/page will be used
    
    return (
      <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
        <DataTable
          columns={columns}
          data={data.items}
          onRowClick={(row) => {
            console.log("ID:", row.id);
            console.log("PATH:", `/dashboard/agents/${row.id}`);
            router.push(`/dashboard/agents/${row.id}`);
          }}
        />

        <DataPagination
          page={filters.page}
          totalPages={data.totalPages}
          onPageChange={(page) => setFilters({ page })}
        />

        {data.items.length === 0 && (
          <EmptyState
            title="create your first agent"
            description="Create an agent to join your meeting. Each agent will follow your instructions and can interact with participants during the call"
          />
        )}
      </div>
    );
}

export const AgentsViewLoading=()=>{
  return (
    <LoadingState title="Loading Agents" description="This may take a while."/>
  )
}

export const AgentsViewError=()=>{
  return (
    <ErrorState title="Something went wrong"
    description="Please try again later."/>
  )
}