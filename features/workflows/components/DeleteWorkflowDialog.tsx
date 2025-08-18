"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { useCallback, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { deleteWorkflow } from "@/features/workflows/services/deleteWorkflow";
import { toast } from "sonner";

interface DeleteWorkflowDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  workflowName: string;
  workflowId: string;
}

const DeleteWorkflowDialog = ({
  open,
  setOpen,
  workflowName,
  workflowId
}: DeleteWorkflowDialogProps) => {
  const [confirmText, setConfirmText] = useState<string>("");

  const { mutate, isPending } = useMutation({
    mutationFn: deleteWorkflow,
    onSuccess: () => {
      toast.success("Workflow deleted successfully", {
        id: "workflow-deleting"
      });
      setOpen(false);
    },
    onError: error => {
      toast.error(error.message, {
        id: "workflow-deleting"
      });
      setOpen(false);
    }
  });

  const handleDelete = useCallback(() => {
    toast.loading("Deleting workflow...", {
      id: "workflow-deleting"
    });
    mutate(workflowId);
  }, [mutate, workflowId]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader className="flex flex-col gap-2">
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className="flex flex-col gap-2">
            <span>
              If you delete this workflow, you will not be able to recover it.
            </span>
            <span>
              If you are sure, enter <b>{workflowName}</b> to confirm
            </span>
            <Input
              value={confirmText}
              onChange={e => setConfirmText(e.target.value)}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setConfirmText("")}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-white hover:bg-destructive/90"
            disabled={confirmText !== workflowName || isPending}
            onClick={handleDelete}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteWorkflowDialog;
