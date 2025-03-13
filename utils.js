import { openai } from './openai.js'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import { OpenAIEmbeddings } from '@langchain/openai'

export const formatUserInput = (userInput) => ({
  role: 'user',
  content: userInput,
})

// Create New Message:
export const createNewMessage = async (history, message) => {
  const chatCompletion = await openai.chat.completions.create({
    messages: [...history, message],
    model: 'gpt-3.5-turbo',
    temperature: 0,
  })

  return chatCompletion.choices[0].message
}

// Create Memory Vector Store:
export const createMemoryVectorStore = (document) => {
  return MemoryVectorStore.fromDocuments(document, new OpenAIEmbeddings())
}
