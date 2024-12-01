import { Node } from '@xyflow/react';

export interface AgentNodeType extends Node {
  type:
    | 'start'
    | 'end'
    | 'agent'
    | 'tools'
}
