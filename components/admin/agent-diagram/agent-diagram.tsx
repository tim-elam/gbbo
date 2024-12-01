'use client';
import React, { useCallback } from 'react';
import {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { StartNode } from '@/components/admin/agent-diagram/nodes/start-node';
import { EndNode } from '@/components/admin/agent-diagram/nodes/end-node';
import { AgentNode } from '@/components/admin/agent-diagram/nodes/agent-node';
import { ToolsNode } from '@/components/admin/agent-diagram/nodes/tools-node';
import { AgentEdgeType } from '@/types/agent-diagram/agent-edge-type';
import { AgentNodeType } from '@/types/agent-diagram/agent-node-type';
import { initialNodes } from '@/components/admin/agent-diagram/initial-nodes';
import { initialEdges } from '@/components/admin/agent-diagram/initial-edges';
import AgentDiagramMinimap from './agent-diagram-minimap';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const nodeTypes: Record<AgentNodeType['type'], React.FunctionComponent<any>> = {
  start: StartNode,
  end: EndNode,
  agent: AgentNode,
  tools: ToolsNode,
};

interface AgentDiagramProps {
  className?: string;
}

export default function AgentDiagram({ className }: AgentDiagramProps) {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: AgentEdgeType | Connection) => setEdges((eds) => addEdge<AgentEdgeType>(params, eds)),
    [setEdges],
  );

  return (
    <div className={ className }>
      <ReactFlow
        nodes={ nodes }
        edges={ edges }
        onNodesChange={ onNodesChange }
        onEdgesChange={ onEdgesChange }
        nodeTypes={ nodeTypes }
        onConnect={ onConnect }
        fitView
      >
        <Controls/>
        <AgentDiagramMinimap />
        <Background
          variant={ BackgroundVariant.Cross }
          gap={ 12 }
          size={ 1 }/>
      </ReactFlow>
    </div>
  );
}
