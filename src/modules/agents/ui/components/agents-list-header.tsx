"use client";

import { Button } from "@/components/ui/button";

export const AgentsListHeader = () => {
  return (
    <div className=" flex flex-col py-4 px-4 md:px-8 overflow-hidden">
      <div className="flex items-center w-full justify-between">
        <h5 className="font-medium text-xl">My Agents</h5>
          <Button>New Agents</Button>
        </div>
    </div>
  );
};
