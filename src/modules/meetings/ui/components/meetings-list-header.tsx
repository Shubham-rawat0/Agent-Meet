"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon,  } from "lucide-react";
import { NewMeetingDialog } from "./new-meeting-dialog";
import { useState } from "react";


export const MeetingsListHeader = () => {
 
  const [isDialogOpen , setIsDialogOpen]=useState(false)

  return (
    <>
      <NewMeetingDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
      <div className=" flex flex-col py-4 px-4 md:px-8 overflow-hidden">
        <div className="flex items-center w-full justify-between">
          <h5 className="font-medium text-xl">My Meetings</h5>
          <Button onClick={()=>{setIsDialogOpen(true)}}>
            <PlusIcon />
            New Meeting
          </Button>
        </div>
        <div className="flex items-center gap-x-2 pt-4">
         Filters
        </div>
      </div>
    </>
  );
};
