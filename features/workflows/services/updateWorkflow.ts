"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/client";
import { WorkflowStatus } from "@/features/workflows/types";
import { revalidatePath } from "next/cache";

interface UpdateWorkflowProps {
  id: string;
  definition: string;
}

export async function updateWorkflow({ id, definition }: UpdateWorkflowProps) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("unauthenticated");
  }

  const workflow = await prisma.workflow.findUnique({
    where: {
      id,
      userId
    }
  });

  if (!workflow) {
    throw new Error("Workflow not found");
  }

  if (workflow.status !== WorkflowStatus.DRAFT) {
    throw new Error("Workflow is not in draft status");
  }

  await prisma.workflow.update({
    where: {
      id
    },
    data: {
      definition
    }
  });

  revalidatePath("/workflows");
}
