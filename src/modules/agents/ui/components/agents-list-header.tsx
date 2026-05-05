"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon, XCircleIcon } from "lucide-react";
import { NewAgentDialog } from "./new-agent-dialog";
import { useState } from "react";
import { useAgentFilters } from "../../hooks/use-agent-filters";
import { AgentsSearchFilter } from "./agent-search-filter";
import { DEFAULT_PAGE } from "@/constant";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";


export const AgentsListHeader = () => {
  const [filters , setFilters] = useAgentFilters()
  const [isDialogOpen , setIsDialogOpen] = useState(false)

  const isAnyFilterModified = !!filters.search

  const onClearFilters=()=>{
    setFilters({search:"",
      page:DEFAULT_PAGE
    })
  }

  return (
    <>
      <NewAgentDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}/>
      <div className=" flex flex-col py-4 px-4 md:px-8 overflow-hidden">
        <div className="flex items-center w-full justify-between">
          <h5 className="font-medium text-xl">My Agents</h5>
          <Button onClick={()=>{setIsDialogOpen(true)}}>
            <PlusIcon />
            New Agent
          </Button>
        </div>
        <ScrollArea>
        <div className="flex items-center gap-x-2 pt-4">
          <AgentsSearchFilter/>
          {isAnyFilterModified &&(
            <Button variant="outline" size="sm" onClick={onClearFilters}>
              <XCircleIcon />
              clear
            </Button>
          )}
        </div>
        <ScrollBar orientation="horizontal"/>
        </ScrollArea>
      </div>
    </>
  );
};
