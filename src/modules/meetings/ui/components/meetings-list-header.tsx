"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon, XCircleIcon,  } from "lucide-react";
import { NewMeetingDialog } from "./new-meeting-dialog";
import { useState } from "react";
import { MeetingsSearchFilter } from "./meetings-search-filter";
import { StatusFilter } from "./status-filter";
import { AgentIdFilter } from "./agent-id-filter";
import { useMeetingsFilters } from "../../hooks/use-meetings-filters";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {  DEFAULT_PAGE_SIZE } from "@/constant";


export const MeetingsListHeader = () => {

  const [filters , setFilters] = useMeetingsFilters()
  const [isDialogOpen , setIsDialogOpen]=useState(false)

  const isAnyFilterModified = !!filters.search || !!filters.status || !!filters.agentId

  const onClearFilters =() =>{
    setFilters({
      status:null,
      agentId:"",
      search:"",
      page:DEFAULT_PAGE_SIZE
    })
  }

  return (
    <>
      <NewMeetingDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <div className=" flex flex-col py-4 px-4 md:px-8 overflow-hidden">
        <div className="flex items-center w-full justify-between">
          <h5 className="font-medium text-xl">My Meetings</h5>
          <Button
            onClick={() => {
              setIsDialogOpen(true);
            }}
          >
            <PlusIcon />
            New Meeting
          </Button>
        </div>
        <ScrollArea>
          <div className="flex items-center gap-x-2 pt-4">
            <MeetingsSearchFilter />
            <StatusFilter />
            <AgentIdFilter />
            {isAnyFilterModified && (
              <Button variant="outline" onClick={onClearFilters}>
                <XCircleIcon className="size-4" />
                Clear
              </Button>
            )}
          </div>
          <ScrollBar orientation="horizontal"/>
        </ScrollArea>
      </div>
    </>
  );
};
