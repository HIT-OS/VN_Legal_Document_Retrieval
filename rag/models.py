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

import pymysql
import os
import datetime

import peewee as pw
from dotenv import load_dotenv

load_dotenv()
db_name = os.getenv("MYSQL_DATABASE")
db_host = os.getenv("MYSQL_HOST")
db_password = os.getenv("MYSQL_ROOT_PASSWORD")
db_port = int(os.getenv("MYSQL_PORT"))
# print(db_name, db_host, db_password, db_port)
db_host = 'localhost'

conn = pymysql.connect(host=db_host, port=db_port, user='root', password=db_password)
cursor = conn.cursor()
cursor.execute(f"SHOW DATABASES LIKE '{db_name}'")
result = cursor.fetchall()
if result:
    print("Database exists")
else:
    print("Database not exists")
    cursor.execute(f'CREATE DATABASE {db_name}')
conn.close()

myDB = pw.MySQLDatabase(
    host=db_host,
    port=db_port,
    user="root",
    passwd=db_password,
    database=db_name
)

class MySQLModel(pw.Model):
    """A base model that will use our MySQL database"""
    id = pw.PrimaryKeyField(null=False)
    createdAt = pw.DateTimeField(default=datetime.datetime.now)
    updatedAt = pw.DateTimeField()
    
    def save(self, *args, **kwargs):
        self.updatedAt = datetime.datetime.now()
        return super(MySQLModel, self).save(*args, **kwargs)

    class Meta:
        database = myDB
        legacy_table_names = False

class QuestionModel(MySQLModel):
    question = pw.TextField()
    response = pw.TextField()

class Reference(MySQLModel):
    question_id = pw.ForeignKeyField(QuestionModel)
    mapc = pw.CharField(255)
    noidung = pw.TextField()
    ten = pw.TextField()

myDB.connect()
myDB.create_tables([QuestionModel, Reference])