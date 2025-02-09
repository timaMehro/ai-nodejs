import OpenAI from 'openai'
import 'dotenv/config'

const openai = new OpenAI()

const completion = await openai.chat.completions.create({
  model: 'gpt-4o-mini',
  messages: [
    { role: 'system', content: 'You are a my assistant.' },
    {
      role: 'user',
      content: 'Write a haiku about recursion in programming.',
    },
  ],
  store: true,
})

console.log(completion.choices[0].message)
