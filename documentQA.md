# YouTuble & PDF question  Answer system

1. Processing a transcripts from a Youtube video and pdf file.
2. Storing them in memory-based vector store.
3. Using OpenAI to answer user queries based on the stored data.


## How it works
``` jason
  const allDataFromVectorStore = await loadDocumentStore()
  const results = await allDataFromVectorStore.similaritySearch(question, 2)
  ```

 `allDataFromVectorStore` : Splitting the transcript into chunks(Youtube and pdf)

  `similaritySearch` :  OpenAI to answer user question based on the stored data.
