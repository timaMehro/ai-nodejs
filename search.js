import 'dotenv/config'
import { Document } from 'langchain/document'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'

// import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { OpenAIEmbeddings } from '@langchain/openai'

import cosmetics from './searchData.js'

function convertCosmeticsToVectors() {
  return cosmetics.map(
    (cosmetic) =>
      new Document({
        pageContent: `Title: ${cosmetic.title}\n${cosmetic.description}`,
        metadata: { source: cosmetic.id, title: cosmetic.title },
        id: cosmetic.id,
      }),
  )
}

const createStore = () =>
  MemoryVectorStore.fromDocuments(
    convertCosmeticsToVectors(),
    new OpenAIEmbeddings(),
  )

export const search = async (query, count = 1) => {
  const store = await createStore()

  return store.similaritySearch(query, count)
}

console.log(await search('some thing that makes my eyes look good'))
