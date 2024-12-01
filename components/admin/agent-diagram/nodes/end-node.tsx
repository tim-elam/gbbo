import StopIcon from '@heroicons/react/24/outline/StopIcon';
import { Handle, Position } from '@xyflow/react';
import { FC, memo } from 'react';

interface EndNodeProps {
  isConnectable: boolean;
}

export const EndNode: FC<EndNodeProps> = memo(function EndNode({ isConnectable }) {
  return <>
    <Handle
      type="target"
      position={ Position.Left }
      isConnectable={ isConnectable }
    />
    <div className="bg-red-400/90 rounded-md shadow-sm p-2">
        <StopIcon className='size-6'/>
    </div>
  </>;
});
