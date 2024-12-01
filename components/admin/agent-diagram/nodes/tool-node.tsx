import { PuzzlePieceIcon } from '@heroicons/react/20/solid';
import { Handle, Position } from '@xyflow/react';
import { FC, memo } from 'react';

interface ToolNodeProps {
  isConnectable: boolean;
  data: {
    label: string
  };
}

export const ToolNode: FC<ToolNodeProps> = memo(function ToolNode({ isConnectable, data }) {
  return <>
    <Handle
      type="target"
      position={ Position.Left }
      isConnectable={ isConnectable }
    />
    <div className="bg-yellow-400/90 rounded-md shadow-sm p-2 flex flex-row gap-1 items-center">
      <PuzzlePieceIcon className="size-4"/>
      { data.label }
    </div>
    <Handle
      type="source"
      position={ Position.Right }
      isConnectable={ isConnectable }
    />
  </>;
});
