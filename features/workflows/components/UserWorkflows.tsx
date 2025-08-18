import React from "react";
import { getWorkflowsForUser } from "@/features/workflows/services/getWorkflowsForUser";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, InboxIcon } from "lucide-react";
import CreateWorkflowDialog from "@/features/workflows/components/CreateWorkflowDialog";
import WorkflowCard from "@/features/workflows/components/WorkflowCard";

export const UserWorkflows = async () => {
  try {
    const workflows = await getWorkflowsForUser();
    if (workflows.length === 0) {
      return (
        <div className="flex-center flex-col gap-4 h-full">
          <div className="rounded-full bg-accent w-20 h-20 flex-center">
            <InboxIcon size={40} className="stroke-primary" />
          </div>
          <div className="flex flex-col gap-1 text-center">
            <p className="font-bold">No workflow created yet</p>
            <p className="text-sm text-muted-foreground">
              Click the button below to create your first workflow.
            </p>
          </div>
          <CreateWorkflowDialog triggerText="Create your first workflow" />
        </div>
      );
    }
    return (
      <div className="grid grid-cols-1 gap-4">
        {workflows.map(workflow => (
          <WorkflowCard key={workflow.id} workflow={workflow} />
        ))}
      </div>
    );
  } catch (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error instanceof Error ? error.message : "An unknown error occurred"}
        </AlertDescription>
      </Alert>
    );
  }
};
