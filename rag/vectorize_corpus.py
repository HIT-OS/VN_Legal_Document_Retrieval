"""
  Copyright (C) 2024 phamdt203

  This file is part of VN_Legal_Document_Retrieval.

  VN_Legal_Document_Retrieval is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  VN_Legal_Document_Retrieval is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with VN_Legal_Document_Retrieval.  If not, see <http://www.gnu.org/licenses/>.
"""

from langchain_community.document_loaders.csv_loader import CSVLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma
from langchain_community.document_loaders import DirectoryLoader
from directory import *

import torch

loader = DirectoryLoader(DOCS_PATH, glob="./*.csv", loader_cls=CSVLoader)
results = loader.load()
text_splitter = CharacterTextSplitter(chunk_size=1500, chunk_overlap=0)
texts = text_splitter.split_documents(results)

current_device = "cpu"
if torch.cuda.is_available():
    current_device="cuda"

embeddings = HuggingFaceEmbeddings(model_name=ST_MODEL_PATH, model_kwargs={"device": current_device})
vectordb = Chroma.from_documents(documents=texts,
                                 embedding=embeddings,
                                 persist_directory=DB_PERSIST_PATH)
vectordb.persist()

print("ok")