import 'dotenv/config'
import { openai } from './openai.js'

import { CharacterTextSplitter } from 'langchain/text_splitter'
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf'

import { YoutubeLoader } from '@langchain/community/document_loaders/web/youtube'
import { createMemoryVectorStore } from './utils.js'

const myVideo = 'https://www.youtube.com/watch?v=kb72I1JOygE'
const myPdf = 'createToken.pdf'

async function docFromYTVideo(video) {
  // Load the transcript from YouTube
  const loader = YoutubeLoader.createFromUrl(video, {
    language: 'en',
    addVideoInfo: true,
  })
  const transcript = await loader.load()

  // Split the  youtube's transcript into difference chunks
  const splitter = new CharacterTextSplitter({
    separator: ' ',
    chunkSize: 2500,
    chunkOverlap: 200,
  })
  const splitDocsFromYTVideo = await splitter.splitDocuments(transcript)

  return splitDocsFromYTVideo
}

async function docFromPdf(pdf) {
  // Load the transcript from PDF
  const loader = new PDFLoader(pdf)
  const transcript = await loader.load()

  // Split the transcript into chunks
  const splitter = new CharacterTextSplitter({
    separator: '. ',
    chunkSize: 2500,
    // both chunks before and after the separator around 200 characters
    // to make sure the separator is not cut off
    // and the context is not lost

    chunkOverlap: 200,
  })
  const splitDocs = await splitter.splitDocuments(transcript)

  return splitDocs
}

// Load Combined Document Store
async function loadDocumentStore() {
  const splittedDocsFromYTVideo = await docFromYTVideo(myVideo)
  const splittedDocsFromPdf = await docFromPdf(myPdf)

  const store = createMemoryVectorStore([
    ...splittedDocsFromYTVideo,
    ...splittedDocsFromPdf,
  ])

  return store
}

const question = process.argv[2]

async function getAnswer() {
  const allDataFromVectorStore = await loadDocumentStore()
  const results = await allDataFromVectorStore.similaritySearch(question, 2)

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    temperature: 0,
    messages: [
      {
        role: 'assistant',
        content:
          'You are my assistance, Answer questions to your best ability.',
      },
      {
        role: 'user',
        content: `Answer the question t. don't lie and make up stuff. Just say you need more context.
        Question: ${question}

        Context: ${results.map((r) => r.pageContent).join('\n')}
        Source:`,
      },
    ],
  })

  console.log(response.choices[0].message.content)
}

getAnswer()
