import { MiniMap } from '@xyflow/react';
import { clsx } from 'clsx';
import { EyeSlashIcon, MapIcon } from '@heroicons/react/24/outline';
import React, { useCallback, useState } from 'react';

export default function AgentDiagramMinimap() {
  const [isMinimapVisible, setIsMinimapVisible] = useState(false);
  const onToggleMinimap = useCallback(() => {
    setIsMinimapVisible(isMinimapVisible => !isMinimapVisible);
  }, []);

  return (
    <>
      {
        isMinimapVisible && <MiniMap
          nodeStrokeColor={ ({ type }) => {
            switch (type) {
              case 'start':
                return 'green';
              case 'agent':
                return 'blue';
              case 'tools':
                return 'yellow';
              case 'end':
                return 'red';
              default:
                return 'white';
            }
          } }
        />
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
    </>
  );
}
