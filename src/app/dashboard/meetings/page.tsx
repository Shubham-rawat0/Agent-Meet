import { MeetingsListHeader } from "@/modules/meetings/ui/components/meetings-list-header"
import { MeetingsView, MeetingsViewError, MeetingsViewLoading } from "@/modules/meetings/ui/view/meeting-view"
import { getQueryClient , trpc } from "@/trpc/server"
import { auth } from "@clerk/nextjs/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { redirect } from "next/navigation"
import { Suspense } from "react"
import type { SearchParams } from "nuqs/server"
import { ErrorBoundary } from "react-error-boundary"
import { loadSearchParams } from "@/modules/meetings/param"

interface Props{
  searchParams : Promise<SearchParams>
}

async function  page({searchParams}:Props) {
  const filters = await loadSearchParams(searchParams)
    const { userId } = await auth();
    
      if (!userId) {
        redirect("/sign-in")
      }
    const queryClient =getQueryClient()
    void queryClient.prefetchQuery(
        trpc.meetings.getMany.queryOptions({...filters})
    )
  return (
    <>
    <MeetingsListHeader/>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<MeetingsViewLoading />}>
          <ErrorBoundary fallback={<MeetingsViewError />}>
            <MeetingsView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
}
export default page