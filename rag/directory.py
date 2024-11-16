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

from dotenv import load_dotenv, find_dotenv
load_dotenv(find_dotenv())
from os import getenv

TOPIC_DB_PATH= getenv("TOPIC_DB_PATH")
ST_MODEL_PATH= getenv("ST_MODEL_PATH")
QA_MODEL_PATH= getenv("QA_MODEL_PATH")
DB_PERSIST_PATH = getenv("DB_PERSIST_PATH")
DOCS_PATH = getenv("DOCS_PATH")
ENVIRONMENT = getenv("ENVIRONMENT")
ACCESS_TOKEN_KEY= getenv("ACCESS_TOKEN_KEY")

if ENVIRONMENT == "production":
    with open("/run/secrets/access_token_key", "r") as access_token_file:
        ACCESS_TOKEN_KEY = access_token_file.read()
    access_token_file.close()


