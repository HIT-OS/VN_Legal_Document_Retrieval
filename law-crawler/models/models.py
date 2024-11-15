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

from db import db
from peewee import *


class BaseModel(Model):
    class Meta:
        database = db


class PDChuDe(BaseModel):
    chude_id = CharField(max_length=128, primary_key=True)
    ten = TextField()
    stt = IntegerField()


class PDDeMuc(BaseModel):
    demuc_id = CharField(max_length=128, primary_key=True)
    ten = TextField()
    stt = IntegerField()
    chude_id = ForeignKeyField(PDChuDe, backref="demucs")


class PDChuong(BaseModel):
    chuong_id = CharField(max_length=128, primary_key=True)
    ten = TextField()
    demuc_id = ForeignKeyField(PDDeMuc, backref="chuongs")
    chimuc = TextField()
    stt = IntegerField()


class PDDieu(BaseModel):
    ten = TextField()
    demuc_id = ForeignKeyField(PDDeMuc, backref="dieus")
    chuong_id = ForeignKeyField(PDChuong, backref="dieus")
    chude_id = ForeignKeyField(PDChuDe, backref="dieus")
    mapc = CharField(max_length=128, primary_key=True)
    noidung = TextField()
    chimuc = IntegerField()
    vbqppl = TextField()
    vbqppl_link = TextField(null=True)
    stt = IntegerField()


class PDTable(BaseModel):
    dieu_id = ForeignKeyField(PDDieu, backref="tables")
    html = TextField()


class PDFile(BaseModel):
    dieu_id = ForeignKeyField(PDDieu, backref="files")
    link = TextField()
    path = TextField()


class PDMucLienQuan(BaseModel):
    dieu_id1 = ForeignKeyField(PDDieu)
    dieu_id2 = ForeignKeyField(PDDieu)

