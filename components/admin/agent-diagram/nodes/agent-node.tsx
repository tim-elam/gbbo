import { SparklesIcon } from '@heroicons/react/20/solid';
import { Handle, Position } from '@xyflow/react';
import { FC, memo } from 'react';

interface AgentNodeProps {
  isConnectable: boolean;
  data: {
    label: string
  };
}

export const AgentNode: FC<AgentNodeProps> = memo(function AgentNode({ isConnectable, data }) {
  return <>
    <Handle
      type="target"
      position={ Position.Left }
      isConnectable={ isConnectable }
    />
    <div className="bg-blue-100/95 rounded-md shadow-sm p-2 flex flex-row gap-1 items-center">
      <SparklesIcon className="size-4"/>
      { data.label }
    </div>
    <Handle
      type="source"
      position={ Position.Right }
      isConnectable={ isConnectable }
    />
  </>;
});
