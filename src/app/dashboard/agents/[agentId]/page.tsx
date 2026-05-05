import { AgentIdView, AgentsIdViewError, AgentsIdViewLoading } from "@/modules/agents/ui/views/agent-id-view"
import { getQueryClient ,trpc} from "@/trpc/server"
import { auth } from "@clerk/nextjs/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { redirect } from "next/navigation"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"

interface Props{
    params : Promise<{agentId:string}>
}

export default async function Page({ params }: Props) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }
  const { agentId } = await params;
   
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.agents.getOne.queryOptions({ id: agentId }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<AgentsIdViewLoading/>}>
        <ErrorBoundary fallback={<AgentsIdViewError/>}>
          <AgentIdView agentId={agentId} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};