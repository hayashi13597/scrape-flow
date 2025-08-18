"use client";

import { useCallback, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Layers2Icon, Loader2 } from "lucide-react";
import CustomDialogHeader from "@/features/workflows/components/CustomDialogHeader";
import { useForm } from "react-hook-form";
import {
  createWorkflowSchema,
  CreateWorkflowSchemaType
} from "@/features/workflows/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { createWorkflow } from "@/features/workflows/services/createWorkflow";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface CreateWorkflowDialogProps {
  triggerText?: string;
}

const CreateWorkflowDialog = ({ triggerText }: CreateWorkflowDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const form = useForm<CreateWorkflowSchemaType>({
    resolver: zodResolver(createWorkflowSchema),
    defaultValues: {
      name: "",
      description: ""
    }
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createWorkflow,
    onSuccess: data => {
      console.log(data);
      toast.success("Workflow created successfully", {
        id: "workflow-creating"
      });
      setIsOpen(false);
      router.push(`/workflow/editor/${data.id}`);
    },
    onError: error => {
      toast.error(error.message, {
        id: "workflow-creating"
      });
      setIsOpen(false);
    }
  });

  const onSubmit = useCallback(
    (data: CreateWorkflowSchemaType) => {
      toast.loading("Creating workflow...", {
        id: "workflow-creating"
      });

      mutate({ data });
    },
    [mutate]
  );

  return (
    <Dialog
      open={isOpen}
      onOpenChange={open => {
        form.reset();
        setIsOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <Button>{triggerText ?? "Create Workflow"}</Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <CustomDialogHeader
          icon={Layers2Icon}
          title={"Create Workflow"}
          subTitle={"Start building your workflow"}
        />
        <div className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Name
                      <p className="text-xs text-primary">(required)</p>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Choose a description and unique name
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Description
                      <p className="text-xs text-primary">(optional)</p>
                    </FormLabel>
                    <FormControl>
                      <Textarea className={"resize-none"} {...field} />
                    </FormControl>
                    <FormDescription>
                      Provider a brief description of what your workflow does.
                      <br />
                      This is optional but can help you remenber the
                      workflow&apos;s purpose
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className={"w-full"} disabled={isPending}>
                {isPending ? <Loader2 className="animate-spin" /> : "Proceed"}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default CreateWorkflowDialog;
