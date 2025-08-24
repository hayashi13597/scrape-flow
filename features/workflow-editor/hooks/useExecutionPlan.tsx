"use client";

import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";
import {
  FlowToExecutionPlan,
  FlowToExecutionPlanType,
  FlowToExecutionPlanValidationError
} from "@/features/workflow-editor/services/executionPlan";
import { AppNode } from "@/features/workflow-editor/types/appNode";
import useFlowValidation from "@/features/workflow-editor/hooks/useFlowValidation";
import { toast } from "sonner";

const useExecutionPlan = () => {
  const { toObject } = useReactFlow();
  const { setInvalidInputs, clearErrors } = useFlowValidation();

  const handleError = useCallback(
    (error: FlowToExecutionPlanType["error"]) => {
      switch (error?.type) {
        case FlowToExecutionPlanValidationError.NO_ENTRY_POINT:
          toast.error("No entry point found");
          break;
        case FlowToExecutionPlanValidationError.INVALID_INPUTS:
          toast.error("Not all inputs values are set");
          setInvalidInputs(error.invalidElements ?? []);
          break;
        default:
          toast.error("Something went wrong");
          break;
      }
    },
    [setInvalidInputs]
  );

  return useCallback(() => {
    const { nodes, edges } = toObject();
    const { executionPlan, error } = FlowToExecutionPlan(
      nodes as AppNode[],
      edges
    );

    if (error) {
      handleError(error);
      return null;
    }

    clearErrors();

    return executionPlan;
  }, [toObject, handleError, clearErrors]);
};

export default useExecutionPlan;
