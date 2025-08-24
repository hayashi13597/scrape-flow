"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/client";
import { FlowToExecutionPlan } from "@/features/workflow-editor/services/executionPlan";

export async function runWorkflow(form: {
  workflowId: string;
  flowDefinition?: string;
}) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("unauthenticated");
  }

  const { workflowId, flowDefinition } = form;
  if (!workflowId) {
    throw new Error("workflowId is required");
  }

  const workflow = await prisma.workflow.findUnique({
    where: {
      id: workflowId,
      userId
    }
  });

  if (!workflow) {
    throw new Error("Workflow not found");
  }

  if (!flowDefinition) {
    throw new Error("Flow definition is not defined");
  }

  const flow = JSON.parse(flowDefinition);
  const result = FlowToExecutionPlan(flow.nodes, flow.edges);
  if (result.error) {
    throw new Error("flow definition not valid");
  }

  if (!result.executionPlan) {
    throw new Error("No execution plan generated");
  }

  console.log(result.executionPlan);
  // return result.executionPlan;
}
