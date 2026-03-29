export interface DomEventActionLog {
  type: 'log';
  message: string;
}

export interface DomEventActionStopPropagation {
  type: 'stopPropagation';
}

export type DomEventAction = DomEventActionLog | DomEventActionStopPropagation;

export interface DomEventNode {
  id: string;
  tagName: string;
  label: string;
  depth: number;
  parentId: string | null;
  handlerSource: string | null;
  handlerSummary: string | null;
  actions: DomEventAction[];
  unsupportedHandler: boolean;
  children: DomEventNode[];
}

export interface DomEventModel {
  roots: DomEventNode[];
  allNodes: DomEventNode[];
  byId: Record<string, DomEventNode>;
  defaultTargetId: string | null;
  hasUnsupportedHandlers: boolean;
}

export interface DomEventSimulationStep {
  nodeId: string;
  tagName: string;
  label: string;
  phase: 'target' | 'bubble';
  currentTarget: string;
  eventTarget: string;
  logs: string[];
  stoppedPropagation: boolean;
}

export interface DomEventSimulationResult {
  target: {
    nodeId: string;
    tagName: string;
    label: string;
  };
  logs: string[];
  steps: DomEventSimulationStep[];
}

const ACTION_PATTERN = /console\.log\(\s*(["'`])([\s\S]*?)\1\s*\)|event\.stopPropagation\(\s*\)/g;

function summarizeHandler(handlerSource: string | null) {
  if (!handlerSource) {
    return null;
  }

  const compact = handlerSource.replace(/\s+/g, ' ').trim();
  if (compact.length <= 64) {
    return compact;
  }

  return `${compact.slice(0, 61)}...`;
}

function parseHandlerActions(handlerSource: string | null) {
  if (!handlerSource) {
    return {
      actions: [] as DomEventAction[],
      unsupportedHandler: false,
    };
  }

  const actions: DomEventAction[] = [];
  let match = ACTION_PATTERN.exec(handlerSource);

  while (match !== null) {
    if (match[0].startsWith('console.log')) {
      actions.push({
        type: 'log',
        message: match[2] ?? '',
      });
    } else {
      actions.push({
        type: 'stopPropagation',
      });
    }

    match = ACTION_PATTERN.exec(handlerSource);
  }

  ACTION_PATTERN.lastIndex = 0;

  const unsupportedSource = handlerSource
    .replace(ACTION_PATTERN, '')
    .replace(/[;\s]+/g, '')
    .trim();

  return {
    actions,
    unsupportedHandler: unsupportedSource.length > 0,
  };
}

function extractOnClick(rawAttributes: string) {
  const match = rawAttributes.match(/onclick\s*=\s*(?:"([\s\S]*?)"|'([\s\S]*?)')/i);
  return match?.[1] ?? match?.[2] ?? null;
}

function assignLabels(nodes: DomEventNode[]) {
  const nodesByTag = new Map<string, DomEventNode[]>();

  for (const node of nodes) {
    const group = nodesByTag.get(node.tagName) ?? [];
    group.push(node);
    nodesByTag.set(node.tagName, group);
  }

  for (const [tagName, group] of nodesByTag) {
    if (group.length === 1) {
      group[0].label = tagName;
      continue;
    }

    const sorted = [...group].sort((a, b) => a.depth - b.depth || a.id.localeCompare(b.id));

    if (group.length === 2) {
      sorted[0].label = `outer ${tagName}`;
      sorted[1].label = `inner ${tagName}`;
      continue;
    }

    sorted.forEach((node, index) => {
      node.label = `${tagName} ${index + 1}`;
    });
  }
}

export function buildDomEventModel(markup: string): DomEventModel {
  const roots: DomEventNode[] = [];
  const allNodes: DomEventNode[] = [];
  const byId: Record<string, DomEventNode> = {};
  const stack: DomEventNode[] = [];
  const tagPattern = /<\/?([a-zA-Z][\w-]*)([^<>]*)>/g;

  let nodeIndex = 0;
  let match = tagPattern.exec(markup);

  while (match !== null) {
    const [fullMatch, rawTagName, rawAttributes] = match;
    const tagName = rawTagName.toLowerCase();
    const isClosingTag = fullMatch.startsWith('</');
    const isSelfClosing = /\/\s*>$/.test(fullMatch);

    if (isClosingTag) {
      while (stack.length > 0) {
        const candidate = stack.pop();
        if (candidate?.tagName === tagName) {
          break;
        }
      }

      match = tagPattern.exec(markup);
      continue;
    }

    const handlerSource = extractOnClick(rawAttributes);
    const { actions, unsupportedHandler } = parseHandlerActions(handlerSource);
    const parent = stack[stack.length - 1] ?? null;
    const node: DomEventNode = {
      id: `dom-node-${++nodeIndex}`,
      tagName,
      label: tagName,
      depth: stack.length,
      parentId: parent?.id ?? null,
      handlerSource,
      handlerSummary: summarizeHandler(handlerSource),
      actions,
      unsupportedHandler,
      children: [],
    };

    if (parent) {
      parent.children.push(node);
    } else {
      roots.push(node);
    }

    allNodes.push(node);
    byId[node.id] = node;

    if (!isSelfClosing) {
      stack.push(node);
    }

    match = tagPattern.exec(markup);
  }

  assignLabels(allNodes);

  const interactiveNodes = allNodes.filter(
    (node) => node.handlerSource !== null || node.actions.length > 0 || node.unsupportedHandler,
  );
  const defaultTargetId =
    [...interactiveNodes].sort((a, b) => b.depth - a.depth || b.id.localeCompare(a.id)).at(0)?.id ??
    null;

  return {
    roots,
    allNodes,
    byId,
    defaultTargetId,
    hasUnsupportedHandlers: allNodes.some((node) => node.unsupportedHandler),
  };
}

export function simulateDomClick(
  model: DomEventModel,
  targetNodeId: string,
): DomEventSimulationResult {
  const targetNode = model.byId[targetNodeId];

  if (!targetNode) {
    throw new Error(`DOM event target not found: ${targetNodeId}`);
  }

  const lineage: DomEventNode[] = [];
  let cursor: DomEventNode | undefined = targetNode;

  while (cursor) {
    lineage.push(cursor);
    cursor = cursor.parentId ? model.byId[cursor.parentId] : undefined;
  }

  const logs: string[] = [];
  const steps: DomEventSimulationStep[] = [];

  for (const [index, node] of lineage.entries()) {
    const phase = index === 0 ? 'target' : 'bubble';
    const stepLogs: string[] = [];
    let stoppedPropagation = false;

    for (const action of node.actions) {
      if (action.type === 'log') {
        stepLogs.push(action.message);
        logs.push(action.message);
        continue;
      }

      stoppedPropagation = true;
    }

    if (phase === 'target' || node.actions.length > 0 || node.handlerSource !== null) {
      steps.push({
        nodeId: node.id,
        tagName: node.tagName,
        label: node.label,
        phase,
        currentTarget: node.label,
        eventTarget: targetNode.label,
        logs: stepLogs,
        stoppedPropagation,
      });
    }

    if (stoppedPropagation) {
      break;
    }
  }

  return {
    target: {
      nodeId: targetNode.id,
      tagName: targetNode.tagName,
      label: targetNode.label,
    },
    logs,
    steps,
  };
}
