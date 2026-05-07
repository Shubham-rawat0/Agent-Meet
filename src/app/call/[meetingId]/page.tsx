import { CallView } from "@/modules/call/ui/views/call-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { auth } from "@clerk/nextjs/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { redirect } from "next/navigation";

interface Props{
    params:Promise<{
        meetingId: string
    }>
}

async function page({params}:Props) {
    const {meetingId}=await params

     const { userId } = await auth();
        
          if (!userId) {
            redirect("/sign-in")
          }

          const queryClient=getQueryClient()

          void queryClient.prefetchQuery(trpc.meetings.getOne.queryOptions({id:meetingId}))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
        <CallView meetingId={meetingId}/>
    </HydrationBoundary>
  )
}
export default page