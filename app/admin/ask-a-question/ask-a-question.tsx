'use client';

import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { ArrowDownIcon } from '@heroicons/react/20/solid';
import React, { ChangeEvent, useState } from 'react';
import { askQuestion } from './actions';

export default function AskAQuestion() {
  const [question, setQuestion] = useState('eshe collins');
  const [answer, setAnswer] = useState('');


  function handleQuestionChange(event: ChangeEvent<HTMLInputElement>) {
    setQuestion(event.target.value);
  }

  async function handleAskQuestion() {
    const response = await askQuestion(question);
    setAnswer(response);
  }

  return (
    <div className="card bg-base-100 shadow-md">
      <div className="card-body">
        <h2 className="card-title">
          <QuestionMarkCircleIcon className="size-6"/>
          Ask a Question
        </h2>
        <div className="flex flex-col gap-4">
          <div className="join">
            <input className="input input-bordered w-full join-item"
                   type="text"
                   placeholder="My question is..."
                   value={question}
                   onChange={handleQuestionChange}
                   required/>
            <button
              className="btn join-item"
              onClick={handleAskQuestion}>
              Ask
              <ArrowDownIcon className="size-4"/>
            </button>
          </div>
          <div className="flex flex-col gap-2 items-stretch">
            <h3 className="text-lg">Answer</h3>
            <div className="bordered border-2 rounded-md bg-slate-50 min-h-16">
              { answer }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
