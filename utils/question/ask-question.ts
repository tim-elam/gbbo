import { personLookupTool } from '@/utils/tools/person-lookup-tool';
import { getChatOpenAI } from '@/utils/langchain/openai/get-chat-openai';
import { MessagesAnnotation, StateGraph } from '@langchain/langgraph';
import { ToolNode } from '@langchain/langgraph/prebuilt';
import { HumanMessage, isAIMessage } from '@langchain/core/messages';

export async function askLangchainQuestion(question: string) {
  const tools = [personLookupTool];
  const toolNode = new ToolNode((tools));
  const model = getChatOpenAI().bindTools(tools);

  function shouldContinue({ messages }: typeof MessagesAnnotation.State) {
    const lastMessage = messages[messages.length - 1];
    if (isAIMessage(lastMessage) && lastMessage.tool_calls?.length) {
      return 'tools';
    }
    return '__end__';
  }

  async function callModel(state: typeof MessagesAnnotation.State) {
    const response = await model.invoke(state.messages);
    return { messages: [response] };
  }

  const workflow = new StateGraph(MessagesAnnotation)
    .addNode('agent', callModel)
    .addEdge('__start__', 'agent')
    .addNode('tools', toolNode)
    .addEdge('tools', 'agent')
    .addConditionalEdges('agent', shouldContinue);

  const app = workflow.compile();

  const finalState = await app.invoke({
    messages: [new HumanMessage(question)],
  });

  return finalState.messages.pop().content;
}
