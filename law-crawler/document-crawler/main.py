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

import pandas as pd
from sqlalchemy import create_engine
import re
from bs4 import BeautifulSoup
import requests

# Tạo kết nối với cơ sở dữ liệu
engine = create_engine("mysql+mysqlconnector://root:123456789@localhost:3306/law")

# Đọc dữ liệu từ cơ sở dữ liệu
df = pd.read_sql('SELECT vbqppl_link FROM pddieu GROUP BY vbqppl_link;', con=engine)

def get_infor(url):
    if url == None:
        return None
    match = re.search(r'ItemID=(\d+).*#(.*)', url)
    if match:
        item_id = match.group(1)
        return item_id
    else:
        print('Không tìm thấy khớp.')
def save_data(list_id, list_noidung):
    # Ghi dữ liệu vào cơ sở dữ liệu từ DataFrame
    df_to_write = pd.DataFrame({
        'id': list_id,
        'noidung': list_noidung
    })
    df_to_write.to_sql('vbpl', con=engine, if_exists='append', index=False)

list_vb = [get_infor(df.iloc[i]['vbqppl_link']) for i in range(len(df))]

print(len(df))

df_vb = pd.DataFrame(list_vb)
# Loại bỏ các giá trị None
df_vb = df_vb.dropna()
# Loại bỏ các giá trị trùng nhau
df_vb = df_vb.drop_duplicates()

print(len(df_vb))
list_id = []
list_noidung = []
for i in range(len(df_vb)):
    id = df_vb.iloc[i][0]
    print(i, "Get data id ", id)
    url_content = f'https://vbpl.vn/TW/Pages/vbpq-toanvan.aspx?ItemID={id}'
    try:
        response = requests.get(url_content, timeout=3)
        soup = BeautifulSoup(response.content, 'html.parser')
        div_text = soup.find_all('div', class_='fulltext')[0]
        noidung = div_text.find_all('div')[1]
        list_id.append(id)
        list_noidung.append(str(noidung))
    except Exception as e:
        print(response)
        print(e)
        continue

    if i % 10 == 0:
        save_data(list_id, list_noidung)
        print("Lưu thành công")
        list_id.clear()
        list_noidung.clear()
    print("Succesfully")


save_data(list_id, list_noidung)




