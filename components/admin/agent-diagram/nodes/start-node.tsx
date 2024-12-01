import PlayIcon from '@heroicons/react/24/outline/PlayIcon';
import { Handle, Position } from '@xyflow/react';
import { FC, memo } from 'react';

interface StartNodeProps {
  isConnectable: boolean;
}

export const StartNode: FC<StartNodeProps> = memo(function StartNode({ isConnectable }) {
  return <>
    <Handle
      type="source"
      position={ Position.Right }
      isConnectable={ isConnectable }
    />
    <div className="bg-green-400/90 rounded-md shadow-sm p-2">
        <PlayIcon className='size-6'/>
    </div>
  </>;
});
