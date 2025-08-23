"use client";

import { Button } from "@/components/ui/button";
import { useReactFlow } from "@xyflow/react";
import { useMutation } from "@tanstack/react-query";
import { updateWorkflow } from "@/features/workflows/services/updateWorkflow";
import { toast } from "sonner";

interface SaveBtnProps {
  workflowId: string;
}

const SaveBtn = ({ workflowId }: SaveBtnProps) => {
  const { toObject } = useReactFlow();

  const saveMutation = useMutation({
    mutationFn: updateWorkflow,
    onSuccess: () => {
      toast.success("Workflow saved successfully", {
        id: "workflow-saving"
      });
    },
    onError: error => {
      toast.error(error.message, {
        id: "workflow-saving"
      });
    }
  });

  return (
    <Button
      disabled={saveMutation.isPending}
      variant="outline"
      className="flex items-center gap-2"
      onClick={() => {
        const workflowDefinition = JSON.stringify(toObject());
        toast.loading("Saving workflow...", { id: "workflow-saving" });
        saveMutation.mutate({
          id: workflowId,
          definition: workflowDefinition
        });
      }}
    >
      Save
    </Button>
  );
};
export default SaveBtn;
