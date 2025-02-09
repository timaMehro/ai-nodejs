import { OpenAI } from './openai.js'

const result = await openai.chat.completions.create({
  // The model you choose influences output and impacts cost.
  model: 'gpt-4o-mini',

  // https://platform.openai.com/docs/guides/text-generation#messages-and-roles

  messages: [
    {
      // system:the background story for AI(priming the system)
      role: 'system',
      content:
        'You are a my assistant, answer my question to best of your ability as accurately as possible',
    },
    {
      role: 'user',
      content: 'salam',
    },
  ],
  // When using the store: true option, completions are stored for 30 days.

  store: true,
})

console.log(result)
