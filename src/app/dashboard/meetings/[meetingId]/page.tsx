import MeetingIdView, {
  MeetingIdViewError,
  MeetingIdViewLoading,
} from "@/modules/meetings/ui/view/meeting-id-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { auth } from "@clerk/nextjs/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface Props{
  params: Promise<{meetingId: string}>
}

async function page({params}:Props) {

  const { userId } = await auth();
    
      if (!userId) {
        redirect("/sign-in")
      }

  const {meetingId}=await params;

  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(trpc.meetings.getOne.queryOptions({id:meetingId}))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<MeetingIdViewLoading/>}>
        <ErrorBoundary fallback={<MeetingIdViewError />}>
          <MeetingIdView meetingId={meetingId} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
}
export default page