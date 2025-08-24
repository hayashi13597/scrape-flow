"use client";

import { Button } from "@/components/ui/button";
import { PlayIcon } from "lucide-react";
import useExecutionPlan from "@/features/workflow-editor/hooks/useExecutionPlan";
import { useMutation } from "@tanstack/react-query";
import { runWorkflow } from "@/features/workflows/services/runWorkflow";
import { toast } from "sonner";
import { useReactFlow } from "@xyflow/react";

const ExecuteBtn = ({ workflowId }: { workflowId: string }) => {
  const generate = useExecutionPlan();
  const { toObject } = useReactFlow();

  const executeMutation = useMutation({
    mutationFn: runWorkflow,
    onSuccess: () => {
      toast.success("Workflow executed successfully", {
        id: "workflow-execution"
      });
    },
    onError: () => {
      toast.error("something went wrong", {
        id: "workflow-execution"
      });
    }
  });

  return (
    <Button
      variant="outline"
      className="flex items-center gap-2"
      disabled={executeMutation.isPending}
      onClick={() => {
        const plan = generate();
        if (!plan) {
          //   Client side validation
          return;
        }
        executeMutation.mutate({
          workflowId,
          flowDefinition: JSON.stringify(toObject())
        });
      }}
    >
      <PlayIcon size={16} className="text-chart-1" />
      Execute
    </Button>
  );
};
export default ExecuteBtn;
