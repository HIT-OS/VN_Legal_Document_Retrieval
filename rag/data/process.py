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

df = pd.read_csv("rag/docs/train.csv")

df = df[['noidung']]  # Giả sử bạn chỉ cần hai cột 'id' và 'text'

# print(df.columns)
df.to_csv("rag/docs/train_filtered_file.csv", index=False)
