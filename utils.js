import { openai } from './openai.js'

export const formatUserInput = (userInput) => ({ role: 'user', content: userInput })

export const createNewMessage = async (history, message) => {
  const chatCompletion = await openai.chat.completions.create({
    messages: [...history, message],
    model: 'gpt-3.5-turbo',
    temperature: 0,
  })

  return chatCompletion.choices[0].message
}
