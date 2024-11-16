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

from flask import Flask, request, jsonify
from flask_cors import CORS
from directory import *
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores.chroma import Chroma
import torch
import  re
from waitress import serve
import os
import google.generativeai as genai

genai.configure(api_key=os.getenv("API_KEY"))
model = genai.GenerativeModel("gemini-1.5-pro")

current_device = "cpu"
if torch.cuda.is_available():
    current_device="cuda"

embeddings = HuggingFaceEmbeddings(model_name=ST_MODEL_PATH, model_kwargs={"device": current_device})
vectordb = Chroma(embedding_function=embeddings,
                  persist_directory=TOPIC_DB_PATH)

HF_API_URL = os.getenv("HF_INFERENCE_API")
ACCESS_TOKEN_KEY = os.getenv("ACCESS_TOKEN_KEY")
headers = {
    "Authorization": f"Bearer {ACCESS_TOKEN_KEY}",
	"Content-Type": "application/json"
}

app = Flask(__name__)

CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

def extract_law_details(text):
    demuc_id = None
    vbpl_link = None
    demuc_match = re.search(r"demuc_id:\s*([a-f0-9-]{36})\s*", text)
    if demuc_match:
        demuc_id = demuc_match.group(1).strip()

    vbpl_link_match = re.search(r"vbqppl_link:\s*([\S]+)", text)
    if vbpl_link_match:
        vbpl_link = vbpl_link_match.group(1).strip()

    return demuc_id, vbpl_link

@app.route('/api/v1/test', methods=['GET'])
def test_question():
    return {
        "message" : "success"
    }, 200

print("cscdcdcdcd")
@app.route('/api/v1/question', methods=['POST'])
def add_question():

    data = request.get_json()

    try:
        question = data["question"]
    except Exception as e:
        return {
            "status": "error",
            "response": "No question in payload",
            "message": e
        }, 400
    
    if not question:
        return {
            "status": "error",
            "response": "Question can not be empty",
            "message": e
        }, 400

    # TODO: load answer from cache if exist
    
    output = vectordb.similarity_search(question, k=10)
    context = ""
    citation = []
    for doc in output:
        result_string = doc.page_content
        demuc_id, vbpl_link = extract_law_details(result_string)
        index = result_string.find("noidung: ")
        if index != -1:
            result_string = result_string[index + len("noidung: "):].strip()
        end_index = result_string.find("chimuc:")
        if end_index != -1:
            result_string = result_string[:end_index].strip()
        result_string = result_string.replace("\n", " ")
        result_string = re.sub(r"\s+", r" ", result_string)
        context += f"{result_string} " 

        print(result_string)
    
        citation.append({
            "demuc_id": demuc_id,
            "link": vbpl_link,
            "noidung": result_string
        })
    
    context = context.strip()
    if not context:
        return {
            "status": "error",
            "response": "Error while retrieving context from DB",
        }, 500


    inputs = f"Này, hãy đọc đoạn văn bản sau đây:\n{context}\nHãy trả lời câu hỏi theo cách hiểu của bạn, bỏ những câu mở đầu như là 'Đoạn văn bản trên ...': {question}"
    response = model.generate_content(inputs)

    if not response:
        return {
            "status": "error",
            "response": "Error while generating answer",
        }, 500
    response =  response.text

    res = {
        "status": "success",
        "question": question,
        "citation": citation,
        "response": response,
    }
    return res, 200

if __name__ == '__main__':
    print('QNA server is running. ')
    serve(app, host='0.0.0.0', port=5001, threads=1)
