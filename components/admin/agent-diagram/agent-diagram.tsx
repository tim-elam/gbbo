'use client';
import React, { useCallback, useState } from 'react';
import {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  MarkerType,
  MiniMap,
  Node,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { EyeSlashIcon, MapIcon } from '@heroicons/react/24/outline';
import { clsx } from 'clsx';
import { StartNode } from '@/components/admin/agent-diagram/nodes/start-node';
import { EndNode } from '@/components/admin/agent-diagram/nodes/end-node';
import { AgentNode } from '@/components/admin/agent-diagram/nodes/agent-node';
import { ToolNode } from '@/components/admin/agent-diagram/nodes/tool-node';

const nodeTypes = {
  start: StartNode,
  end: EndNode,
  agent: AgentNode,
  tool: ToolNode,
};

interface GbboNode extends Node {
  type: keyof typeof nodeTypes;
}

const initialNodes: GbboNode[] = [
  {
    id: '__start__',
    position: { y: 50, x: 0 },
    data: {},
    type: 'start',
  },
  {
    id: 'agent',
    position: { y: 0, x: 100 },
    data: { label: 'Agent' },
    type: 'agent',
  },
  {
    id: 'tools',
    position: { y: 50, x: 150 },
    data: { label: 'Tools' },
    type: 'tool',
  },
  {
    id: '__end__',
    position: { y: 100, x: 275 },
    data: {},
    type: 'end',
  },
];

type GbboEdge = Edge;

const initialEdges: GbboEdge[] = [
  {
    id: 'start-to-agent',
    source: '__start__',
    target: 'agent',
    markerEnd: {
      type: MarkerType.ArrowClosed,
      height: 8,
      width: 8,
      color: 'black',
    },
    style: {
      strokeWidth: 2,
      stroke: 'black',
    },
  },
  {
    id: 'agent-to-tools',
    source: 'agent',
    target: 'tools',
    markerEnd: {
      type: MarkerType.ArrowClosed,
      height: 8,
      width: 8,
      color: 'black',
    },
    style: {
      strokeWidth: 2,
      strokeDasharray: '5, 3',
      stroke: 'black',
    },
  },
  {
    id: 'tools-to-agent',
    source: 'tools',
    target: 'agent',
    markerEnd: {
      type: MarkerType.ArrowClosed,
      height: 8,
      width: 8,
      color: 'black',
    },
    style: {
      strokeWidth: 2,
      stroke: 'black',
    },
  },
  {
    id: 'agent-to-end',
    source: 'agent',
    target: '__end__',
    markerEnd: {
      type: MarkerType.ArrowClosed,
      height: 8,
      width: 8,
      color: 'black',
    },
    style: {
      strokeWidth: 2,
      strokeDasharray: '5, 3',
      stroke: 'black',
    },
  },
];

interface ReactFlowPlaygroundProps {
  className?: string;
}

export default function AgentDiagram({ className }: ReactFlowPlaygroundProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isMinimapVisible, setIsMinimapVisible] = useState(false);

  const onConnect = useCallback(
    (params: GbboEdge | Connection) => setEdges((eds) => addEdge<GbboEdge>(params, eds)),
    [setEdges],
  );

  const onToggleMinimap = useCallback(() => {
    setIsMinimapVisible(isMinimapVisible => !isMinimapVisible);
  }, []);

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
        {
          isMinimapVisible && <MiniMap/>
        }
        <button
          className={ clsx('btn btn-square btn-sm btn-secondary absolute z-50 bottom-6 right-0', {
            'btn-outline': isMinimapVisible,
          }) }
          onClick={ onToggleMinimap }>
          { isMinimapVisible
            ? <EyeSlashIcon className="size-6"/>
            : <MapIcon className="size-6"/>
          }
        </button>
        <Background
          variant={ BackgroundVariant.Cross }
          gap={ 12 }
          size={ 1 }/>
      </ReactFlow>
    </div>
  );
}
