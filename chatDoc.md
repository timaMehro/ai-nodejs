
# What is the LLMs (large Language Model) ?

LLMs are AI models trained on vast text data to generate human-like text, enabling tasks like text generation, translation, and summarization.

# How memory works in LLMs?

### example

The only way to guarantee that it knows you are talking about you have to feed entire history of your conversation forever.

```json
{
  "message": [
    {
      "role": "user",
      "content": "My name is Tima."
    },
    {
      "role": "user",
      "content": "What is my name?"
    }
  ]
}
```

**_"Your name is Tima"_**.

You will get correct answer for this case, because we have history of your!


```json
{ "message" :[

    {
      "role": "use",
      "content": "what is my name?"
    },

  ]
}
```
**_"I am sorry, I do not know your name"_**

it can not remember your name for this case,because we do  not history.
However, summarizing past conversations can help retain information at a lower cost.

# How chat works?
- Uses the `readline` module to handle terminal input and output.
- Maintains a history of the conversation for better responses.
- Stops execution when the user types `"exit!"`.


```js
import { readline } from 'node:readline'

const readLineInstance= readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
```


The `readline` module provides an interface for reading input from the terminal and writing output. It's ideal for handling large JSON files efficiently, as it reads them line by line instead of loading the entire file into memory.

```js
export const createNewMessage = async (history, message) => {
  const chatCompletion = await openai.chat.completions.create({
    messages: [...history, message],
    model: 'gpt-3.5-turbo',
    temperature: 0,
  })


```
### Temperature
Controls randomness in the model’s output (like adjusting a drug dose for hallucinations):
- **Range:** 0 to 1
- **0.8** : More random responses
- **0.2** : More focused and deterministic
- **0** : Auto-adjusts based on log probability
