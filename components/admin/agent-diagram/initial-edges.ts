import { AgentEdgeType } from '@/types/agent-diagram/agent-edge-type';
import { MarkerType } from '@xyflow/react';

export const initialEdges: AgentEdgeType[] = [
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
