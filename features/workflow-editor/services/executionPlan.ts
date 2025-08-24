import {
  WorkflowExecutionPlan,
  WorkflowExecutionPlanPhase
} from "@/features/workflow-editor/types/task";
import {
  AppNode,
  AppNodeMissingInputs
} from "@/features/workflow-editor/types/appNode";
import { Edge } from "@xyflow/react";
import { TaskRegistry } from "@/features/workflow-editor/lib/task/register";

export enum FlowToExecutionPlanValidationError {
  "NO_ENTRY_POINT",
  "INVALID_INPUTS"
}

export type FlowToExecutionPlanType = {
  executionPlan?: WorkflowExecutionPlan;
  error?: {
    type: FlowToExecutionPlanValidationError;
    invalidElements?: AppNodeMissingInputs[];
  };
};

export function FlowToExecutionPlan(
  nodes: AppNode[],
  edges: Edge[]
): FlowToExecutionPlanType {
  const entryPoint = nodes.find(
    node => TaskRegistry[node.data.type].isEntryPoint
  );
  if (!entryPoint) {
    return {
      error: {
        type: FlowToExecutionPlanValidationError.NO_ENTRY_POINT
      }
    };
  }

  const inputsWithErrors: AppNodeMissingInputs[] = [];
  const planned = new Set<string>();

  const invalidInputs = getInValidInputs(entryPoint, edges, planned);
  if (invalidInputs.length > 0) {
    inputsWithErrors.push({
      nodeId: entryPoint.id,
      inputs: invalidInputs
    });
  }

  const executionPlan: WorkflowExecutionPlan = [
    {
      phase: 1,
      nodes: [entryPoint]
    }
  ];

  planned.add(entryPoint.id);

  for (
    let phase = 2;
    phase <= nodes.length && planned.size < nodes.length;
    phase++
  ) {
    const nextPhase: WorkflowExecutionPlanPhase = { phase, nodes: [] };
    for (const currentNode of nodes) {
      if (planned.has(currentNode.id)) {
        // Node already put in the execution plan
        continue;
      }

      const inValidInputs = getInValidInputs(currentNode, edges, planned);

      if (inValidInputs.length > 0) {
        const incomers = getIncomers(currentNode, nodes, edges);
        if (incomers.every(incomer => planned.has(incomer.id))) {
          // If all incoming incomers/edges are planned and there are still
          // invalid inputs, which means that the workflow is invalid
          console.error("invalid inputs", inValidInputs, currentNode.id);
          inputsWithErrors.push({
            nodeId: currentNode.id,
            inputs: inValidInputs
          });
        } else {
          // let's skip this node for now
          continue;
        }
      }

      nextPhase.nodes.push(currentNode);
    }
    for (const node of nextPhase.nodes) {
      planned.add(node.id);
    }
    executionPlan.push(nextPhase);
  }

  console.log("inputsWithErrors", inputsWithErrors);

  if (inputsWithErrors.length > 0) {
    return {
      error: {
        type: FlowToExecutionPlanValidationError.INVALID_INPUTS,
        invalidElements: inputsWithErrors
      }
    };
  }

  return {
    executionPlan
  };
}

function getInValidInputs(node: AppNode, edges: Edge[], planned: Set<string>) {
  const invalidInputs: string[] = [];

  const inputs = TaskRegistry[node.data.type].inputs;
  for (const input of inputs) {
    const inputValue = node.data.inputs[input.name];
    const inputValueProvided = inputValue?.length > 0;
    if (inputValueProvided) {
      // This input is fine, so we can move on
      continue;
    }

    // If the user does not provide a value, then we need to check
    // if there is an output linked to the current input
    const incomingEdges = edges.filter(edge => edge.target === node.id);

    const inputLinkedToOutput = incomingEdges.find(
      edge => edge.targetHandle === input.name
    );

    const requiredInputProvidedByVisitedOutput =
      input.required &&
      inputLinkedToOutput &&
      planned.has(inputLinkedToOutput.source);

    if (requiredInputProvidedByVisitedOutput) {
      // The inputs are required, and we have a valid value for it
      // provided by a task that is already planned
      continue;
    } else if (!input.required) {
      // If the input is not required but there is an output linked to it,
      //  then we need to be sure that the output is already planned
      if (!inputLinkedToOutput) continue;
      if (inputLinkedToOutput && planned.has(inputLinkedToOutput.source)) {
        // The output is providing a value to the input: the input is fine
        continue;
      }
    }

    invalidInputs.push(input.name);
  }

  return invalidInputs;
}

function getIncomers(node: AppNode, nodes: AppNode[], edges: Edge[]) {
  if (!node.id) return [];
  const incomersIds = new Set();
  edges.forEach(edge => {
    if (edge.target === node.id) {
      incomersIds.add(edge.source);
    }
  });
  return nodes.filter(node => incomersIds.has(node.id));
}
