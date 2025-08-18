"use server";

import { CreateWorkflowSchemaType } from "@/features/workflows/schema";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/client";
import { WorkflowStatus } from "@/features/workflows/types";

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

  try {
    const result = await prisma.workflow.create({
      data: {
        userId,
        status: WorkflowStatus.DRAFT,
        definition: "TODO",
        ...data
      }
    });

    return result;
  } catch {
    throw new Error("Failed to create workflow");
  }
}
