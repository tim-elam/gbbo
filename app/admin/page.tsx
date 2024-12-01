import React from 'react';
import AskAQuestion from './ask-a-question/ask-a-question';
import AgentDiagram from '@/components/admin/agent-diagram/agent-diagram';

export default function Admin() {
  return (
    <div className='flex-1 h-full flex flex-col gap-4 items-stretch mb-4'>
      <AgentDiagram className='flex-1' />
      <AskAQuestion className='shrink-0' />
    </div>
  );
}
