import { AgentNodeType } from '@/types/agent-diagram/agent-node-type';

export const initialNodes: AgentNodeType[] = [
  {
    id: '__start__',
    position: { y: 0, x: 0 },
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
    position: { y: 100, x: 100 },
    data: { label: 'Tools' },
    type: 'tools',
  },
  {
    id: '__end__',
    position: { y: 100, x: 250 },
    data: {},
    type: 'end',
  },
];
