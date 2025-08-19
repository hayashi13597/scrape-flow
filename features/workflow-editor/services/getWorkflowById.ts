"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/client";

export async function getWorkflowById(workflowId: string) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("unauthenticated");
  }

  const result = await prisma.workflow.findUnique({
    where: {
      id: workflowId,
      userId
    }
  });

  if (!result) {
    throw new Error("Workflow not found");
  }

  return result;
}
