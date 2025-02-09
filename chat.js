import readline from 'node:readline'
import { formatUserInput, createNewMessage } from './utils.js'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const chat = async () => {
  const history = [
    {
      role: 'system',
      content: `You are my wonderful and helpful AI assistant.`,
    },
  ]

  console.log('\nAI: How can I help Tima Jooon today?\n\n')

  for await (const userInput of rl) {
    
    if (userInput.trim().toLowerCase() === 'exit!') {
      rl.close()
      break
    }

    const userMessage = formatUserInput(userInput)
    const response = await createNewMessage(history, userMessage)

    history.push(userMessage, response)

    console.log(`\n\nAI: ${response.content}\n\n`)
  }
}

chat()
