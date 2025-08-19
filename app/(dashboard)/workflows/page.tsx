import { Suspense } from "react";
import UserWorkflowsSkeleton from "@/features/workflows/components/UserWorkflowsSkeleton";
import { UserWorkflows } from "@/features/workflows/components/UserWorkflows";
import CreateWorkflowDialog from "@/features/workflows/components/CreateWorkflowDialog";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Workflows",
  description: "Manage your workflows"
};

const Workflows = () => {
  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">Workflows</h1>
          <p className="text-muted-foreground">Manage your workflows</p>
        </div>
        <CreateWorkflowDialog />
      </div>

      <div className="h-full py-6">
        <Suspense fallback={<UserWorkflowsSkeleton />}>
          <UserWorkflows />
        </Suspense>
      </div>
    </div>
  );
};

export default Workflows;
