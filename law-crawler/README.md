## 🚀 **Crawler: Cào Dữ Liệu Pháp Luật Từ Các Nguồn Uy Tín**

Đây là một phần quan trọng trong việc xây dựng hệ thống hỗ trợ hỏi đáp và tra cứu pháp lý, nơi dữ liệu của hệ thống sẽ dễ dàng thu thập và xử lý dữ liệu từ các nguồn pháp luật đáng tin cậy tại Việt Nam. Mục tiêu là giúp chúng ta nhanh chóng thu thập thông tin từ **Pháp Điển Việt Nam** và **Văn Bản Quy Phạm Pháp Luật** (VBQPPL), sau đó lưu trữ và xử lý nó một cách đơn giản.


## 🧑‍💻 **Các Công Nghệ và Thư Viện Sử Dụng**

**Python**: Ngôn ngữ lập trình chính để xây dựng các crawler và xử lý dữ liệu.

**BeautifulSoup**: Thư viện Python dùng để phân tích cú pháp HTML và XML, giúp lấy dữ liệu từ các trang web.

**Requests**: Thư viện giúp thực hiện các yêu cầu HTTP và tải về dữ liệu từ các trang web.

**MySQL**: Hệ quản trị cơ sở dữ liệu để lưu trữ dữ liệu thu thập được.

**Flask**: Framework web nhẹ dùng để tạo API nếu cần thiết cho hệ thống.

**Docker**: Công cụ giúp tạo môi trường cô lập và dễ dàng triển khai các dịch vụ như MySQL, PHPMyAdmin.

**PHPMyAdmin**: Công cụ giao diện web để quản lý cơ sở dữ liệu MySQL.
JSON: Định dạng lưu trữ dữ liệu giúp bạn dễ dàng chuyển dữ liệu giữa các hệ thống.


## 📝 **Cào Dữ Liệu Pháp Điển Việt Nam**

**Bước 1**: Tải và giải nén file zip từ [Pháp Điển Việt Nam]([https://phapdien.moj.gov.vn/Pages/chi-tiet-bo-phap-dien.aspx]) vào thư mục **phap-dien**. 

**Cấu trúc của module:**
```
law-crawler/
├── document-crawler/
├── models/
├── phap-dien/
├── db.py
├── helper.py
├── json_process.py
├── main.py
├── README.md
├── requirements.txt
```

**Bước 2**: Tạo các file JSON từ `phapdien.js` gốc:

- **chude.json**: Chứa thông tin về các chủ đề pháp lý.
- **demuc.json**: Liệt kê các đề mục của Pháp Điển.
- **treeNode.json**: Lưu trữ cấu trúc phân cấp của Pháp Điển (Phần, Chương, Mục, Tiểu Mục, Điều).

Đến cuối cùng, cấu trúc thư mục của bạn sẽ trông như thế này:
```
phap-dien
├── BoPhapDien.html
├── phapdien.js
├── chude.json
├── demuc.json
├── treeNode.json
├── demuc/
│   ├── 1/...
│   ├── 2/...
├── lib/
```

### ⚙️ **Cài Đặt Môi Trường**

Trước khi chạy module crawler cần chuẩn bị môi trường với các thư viện cần thiết:

```bash
pip install -r requirements.txt
```

### 🐳 **Chạy MySQL và PHPMyAdmin Containers Với Docker**

Tạo môi trường database bằng cách sử dụng Docker. Chạy các container MySQL và PHPMyAdmin để dễ dàng quản lý dữ liệu:

```bash
docker-compose up -d
```

### 🏃 **Cào Dữ Liệu Pháp Điển**

Đã đến lúc bắt tay vào công việc! Chạy crawler để thu thập dữ liệu và lưu trữ vào cơ sở dữ liệu:

```bash
python main.py
```

Sau khi quá trình cào xong, bạn có thể xuất dữ liệu của các điều trong pháp điển ra file `.csv` thông qua PHPMyAdmin để sử dụng khi thực hiện lưu các vector embedding của văn bản.

---

### 📑 **Cào Dữ Liệu Văn Bản Quy Phạm Pháp Luật (VBQPPL)**

Tiếp tục với việc cào dữ liệu từ **Văn Bản Quy Phạm Pháp Luật**. Hãy làm theo các bước sau để hoàn thành việc thu thập thông tin này.

**Bước 1**: Chạy MySQL và PHPMyAdmin container:

```bash
docker-compose up -d
```

**Bước 2**: Di chuyển vào thư mục chứa mã nguồn của crawler:

```bash
cd document-crawler
```

**Bước 3**: Cài đặt các thư viện cần thiết:

```bash
pip install -r requirements.txt
```

**Bước 4**: Chạy crawler để thu thập dữ liệu từ VBQPPL:

```bash
python main.py
```

**Bước 5**: Phân chia các VBQPPL thành từng **Điều**:

```bash
python split_document.py
```

### 🛠️ **Lưu Trữ Dữ Liệu**

Khi quá trình hoàn tất, tất cả dữ liệu từ VBQPPL sẽ được lưu vào cơ sở dữ liệu. Bạn có thể xuất nó ra dưới dạng file `.csv` để lưu trữ các vector embedding cho huấn luyện sau này.

---

### ✅ **Tóm Tắt Các Bước**

1. **Tải và giải nén dữ liệu Pháp Điển Việt Nam** vào thư mục **phap-dien**.
2. **Chạy các crawler** để lấy dữ liệu pháp lý từ Pháp Điển Việt Nam và VBQPPL.
3. **Lưu trữ dữ liệu vào MySQL** thông qua Docker và PHPMyAdmin.
4. **Xuất dữ liệu dưới dạng .csv** để sử dụng sau.

---

### ⚡ **Lời Kết**

Chúc bạn thành công trong việc triển khai crawler và xây dựng hệ thống pháp lý của riêng mình! Module này sẽ giúp bạn tự động hóa quá trình thu thập dữ liệu từ các nguồn uy tín, giúp bạn tiết kiệm thời gian và công sức trong công việc nghiên cứu và phân tích pháp lý.

Nếu bạn gặp bất kỳ vấn đề gì, đừng ngần ngại liên hệ với chúng tôi để được hỗ trợ!

Happy coding! 🚀

---
### 📧 **Liên hệ**

- Phạm Đình Tiến: phamdt203@gmail.com

---
