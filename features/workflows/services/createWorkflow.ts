"use server";

import { CreateWorkflowSchemaType } from "@/features/workflows/schema";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/client";
import { WorkflowStatus } from "@/features/workflows/types";
import { revalidatePath } from "next/cache";
import { AppNode } from "@/features/workflow-editor/types/appNode";
import { Edge } from "@xyflow/react";
import { createFlowNode } from "@/features/workflow-editor/lib/createFlowNode";
import { TaskType } from "@/features/workflow-editor/types/task";

interface CreateWorkflowProps {
  data: CreateWorkflowSchemaType;
}

export async function createWorkflow({ data }: CreateWorkflowProps) {
  const { name } = data;
  if (!name) {
    throw new Error("name is required");
  }

  const { userId } = await auth();

  if (!userId) {
    throw new Error("unauthenticated");
  }

  const initialFlow: { nodes: AppNode[]; edges: Edge[] } = {
    nodes: [],
    edges: []
  };

  initialFlow.nodes.push(createFlowNode(TaskType.LUNCH_BROWSER));

  try {
    const result = await prisma.workflow.create({
      data: {
        userId,
        status: WorkflowStatus.DRAFT,
        definition: JSON.stringify(initialFlow),
        ...data
      }
    });
    revalidatePath("/workflows");
    return result;
  } catch {
    throw new Error("Failed to create workflow");
  }
}
