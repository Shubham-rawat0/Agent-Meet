import { LoadingState } from "@/components/loading-state";
import { AgentsView, AgentsViewError, AgentsViewLoading } from "@/modules/agents/ui/views/agents-view"
import { getQueryClient ,trpc} from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { AgentsListHeader } from "@/modules/agents/ui/components/agents-list-header";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SearchParams } from "nuqs";
import { loadSearchParams } from "@/modules/agents/param";

interface Props{
  searchParams:Promise<SearchParams>
}

async function page({searchParams}:Props) {
  const filters =await loadSearchParams(searchParams)
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in")
  }

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions({...filters})); //prefetching data
  // User Request
  //   ↓
  // Server (new QueryClient)
  //   ↓
  // Prefetch → Cache (temporary)
  //   ↓
  // Dehydrate(converting server cache into a JSON-safe format) → send JSON
  //   ↓
  // Browser
  //   ↓
  // Hydrate(restoring server-fetched data into client cache) → persistent (session) , agentview will use this cached data in useSuspenseQuery

  return (
    <>
    <AgentsListHeader/>
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<AgentsViewLoading/>}>
        <ErrorBoundary fallback={<AgentsViewError/>}>
           <AgentsView />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
    </>
  );
}
export default page