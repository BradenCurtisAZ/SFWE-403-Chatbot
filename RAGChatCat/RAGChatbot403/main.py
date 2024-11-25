import os
os.environ['COHERE_API_KEY'] = 'p1p0fpBMPtke1gCRNYl9GUO5aEleq9ua3ok5b27a'
from langchain_community.document_loaders import DirectoryLoader, TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_cohere import CohereEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_cohere import ChatCohere
from langchain.chains import RetrievalQA


class RAGChatbot:
    def __init__(self, cohere_api_key, docs_dir="./documents"):
        """
        Initialize the RAG chatbot with necessary components.

        Args:
            cohere_api_key (str): Your Cohere API key
            docs_dir (str): Directory containing documents to be processed
        """
        self.cohere_api_key = cohere_api_key
        self.docs_dir = docs_dir
        self.vectorstore = None
        self.qa_chain = None

    def load_documents(self):
        """Load and process documents from the specified directory."""
        loader = DirectoryLoader(self.docs_dir, glob="**/*.txt", loader_cls=TextLoader)
        documents = loader.load()

        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200,
            length_function=len,
        )
        chunks = text_splitter.split_documents(documents)
        return chunks

    def create_vectorstore(self, chunks):
        """Create a vector store from document chunks using Cohere embeddings."""
        embeddings = CohereEmbeddings(
            cohere_api_key=self.cohere_api_key,
            model="embed-english-v3.0"
        )

        vectorstore = FAISS.from_documents(chunks, embeddings)
        return vectorstore

    def setup_qa_chain(self):
        """Set up the QA chain."""
        llm = ChatCohere(
            cohere_api_key=self.cohere_api_key,
            model="command",
            temperature=0.7
        )

        qa_chain = RetrievalQA.from_chain_type(
            llm=llm,
            chain_type="stuff",
            retriever=self.vectorstore.as_retriever(search_kwargs={"k": 3}),
            return_source_documents=True,
        )

        return qa_chain

    def initialize(self):
        """Initialize the chatbot by setting up all components."""
        print("Loading and processing documents...")
        chunks = self.load_documents()

        print("Creating vector store...")
        self.vectorstore = self.create_vectorstore(chunks)

        print("Setting up QA chain...")
        self.qa_chain = self.setup_qa_chain()

        print("Initialization complete!")

    def chat(self, query):
        """
        Process a user query and return the response.

        Args:
            query (str): User's question

        Returns:
            dict: Contains the answer and source documents
        """
        if not self.qa_chain:
            raise ValueError("Chatbot not initialized. Please call initialize() first.")

        result = self.qa_chain.invoke({"query": query})
        return {
            "answer": result["result"],
            "sources": [doc.page_content for doc in result["source_documents"]]
        }


# Example usage
def main():
    # Initialize the chatbot
    cohere_api_key = os.getenv("COHERE_API_KEY")  # Get API key from environment variable
    if not cohere_api_key:
        raise ValueError("Please set the COHERE_API_KEY environment variable")

    docs_dir = "./documents"
    if not os.path.exists(docs_dir):
        os.makedirs(docs_dir)
    chatbot = RAGChatbot(cohere_api_key, docs_dir=docs_dir)

    # Make sure you have a documents directory with some .txt files
    chatbot.initialize()

    # Chat loop
    print("Chatbot is ready! Type 'quit' to exit.")
    while True:
        query = input("\nYou: ")
        if query.lower() == 'quit':
            break

        try:
            response = chatbot.chat(query)
            print("\nChatbot:", response["answer"])
            print("\nSources used:")
            for i, source in enumerate(response["sources"], 1):
                print(f"\n{i}. {source[:200]}...")
        except Exception as e:
            print(f"Error: {e}")


if __name__ == "__main__":
    main()