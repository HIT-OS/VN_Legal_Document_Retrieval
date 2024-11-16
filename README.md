# VN-Law-Advisor [![Demo]()]() [![Documentation]()]()

<a href="https://github.com/HIT-OS/VN_Legal_Document_Retrieval/issues/new?assignees=&labels=&projects=&template=bug_report.md&title=%F0%9F%90%9B+Bug+Report%3A+">Bug Report ⚠️
</a>

<a href="https://github.com/HIT-OS/VN_Legal_Document_Retrieval/issues/new?assignees=&labels=&projects=&template=feature_request.md&title=RequestFeature:">Request Feature 👩‍💻</a>

Ứng dụng hỗ trợ tra cứu, hỏi đáp tri thức pháp luật dựa trên Bộ pháp điển và CSDL văn bản QPPL Việt Nam. Mục tiêu là phát triển một hệ thống tra cứu, hỏi đáp tri thức pháp luật Việt Nam dựa trên các mô hình ngôn ngữ lớn cùng với nền tảng lowcode.

Dự án được open source theo giấy phép [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.en.html) bởi đội tác giả HIT-OS13. Để biết thêm chi tiết về cuộc thi, bạn có thể xem tại [đây](https://www.olp.vn/procon-pmmn/ph%E1%BA%A7n-m%E1%BB%81m-ngu%E1%BB%93n-m%E1%BB%9F).

Link thuyết trình Canva tại cuộc thi [link](https://www.canva.com/design/DAGWnmJZWjo/QKufW1WAumndxgjB55kEaw/edit)

Slide bài thuyết trình tại cuộc thi dưới dạng PDF có thể được truy cập tại đây: [Slide]()

## 🔎 Danh Mục

1. [Giới Thiệu](#Giới-Thiệu)
2. [Chức Năng](#chức-năng-chính)
3. [Tổng Quan Hệ Thống](#👩‍💻-tổng-quan-hệ-thống)
4. [Cấu Trúc Thư Mục](#cấu-trúc-thư-mục)
5. [Hướng Dẫn Cài Đặt](#hướng-dẫn-cài-đặt)
    - [📋 Yêu Cầu - Prerequisites](#yêu-cầu-📋)
    - [🔨 Cài Đặt](#🔨-cài-đặt)
6. [CI/CD](#ci/cd)
7. [🙌 Đóng Góp](#🙌-đóng-góp-cho-dự-án)
8. [📝 License](#📝-license)

## Giới Thiệu

-   [Pháp điển](https://vi.wikipedia.org/wiki/Ph%C3%A1p_%C4%91i%E1%BB%83n) là tập hợp các quy phạm pháp luật đang còn hiệu lực của các văn bản quy phạm pháp luật do cơ quan nhà nước ở trung ương ban hành, từ Thông tư trở lên và trừ Hiến pháp.
-   [Cơ sở dữ liệu văn bản quy phạm pháp luật Việt Nam](https://quochoi.vn/csdlth/vanbanphapluat/Pages/Home.aspx) được xây dựng từ năm 2000, bao gồm các văn bản quy phạm pháp luật từ năm 1990 đến nay. Cơ sở dữ liệu này được cập nhật thường xuyên, đảm bảo tính toàn vẹn, đầy đủ và chính xác của các văn bản quy phạm pháp luật.
-   Tuy nhiên, do việc cập nhật không thường xuyên của pháp điển so với các văn bản quy phạm pháp luật, nên pháp điển hiện tại không đảm bảo tính toàn vẹn, đầy đủ và chính xác của các văn bản quy phạm pháp luật.

## Chức Năng Chính

Project tập trung vào các chức năng chính như sau:

-   🤖 Trả lời các câu hỏi về pháp luật của người dùng.
-   🔍 Hệ thống tra cứu các pháp điển, văn bản quy phạm pháp luật: chỉ mục, liên kết các điều mục, các bảng và biểu mẫu.
-   📖 Tóm tắt văn bản, hỗ trợ người dùng trong lúc tra cứu.
-   📝 Gợi ý văn bản quy phạm pháp luật theo từ khóa tìm kiếm, nhận đóng góp để cải thiện gợi ý.

## 👩‍💻 Tổng Quan Hệ Thống

Backend của hệ thống được thiết kế theo kiến trúc microservices, với các công nghệ sử dụng như sau:

-   [NestJS](https://nextjs.org/): Xây dựng web-app, hỗ trợ SEO, SSR, SSG.
-   [Flask](https://flask.palletsprojects.com/en/2.0.x/): Dựng API cho Q&A - RAG Service.
-   [LangChain](https://www.langchain.com/): Sử dụng để truy vấn các context là tri thức luật.
-   [MySQL](https://www.mysql.com/): Cơ sở dữ liệu quan hệ.
-   [Redis](https://redis.io/): Cơ sở dữ liệu NoSQL in-memory dạng key-value.
-   [ChromaDB](https://www.trychroma.com/): Cơ sở dữ liệu embedding dạng vector.
-   [Docker](https://www.docker.com/): Containerize các service.
-   [Docker Compose](https://docs.docker.com/compose/): Quản lý các container.

<img loading="lazy" src="./docs/images/system_architecture.svg" alt="Architecture" width="100%" height=600>

### RAG

Sử dụng mô hình [Vietnamese SBERT](https://huggingface.co/keepitreal/vietnamese-sbert) để tạo embedding cho các tri thức pháp luật. Các embedding được lưu vào Chroma - một loại vector database.

Sau đó, xây dựng hệ thống RAG với framework [LangChain](https://www.langchain.com/) để truy vấn các context là các điều từ pháp điển, sau đó đưa context cho mô hình LLM để sinh ra các câu trả lời.

Mô hình LLM chọn sử dụng là [phoGPT](./https://github.com/VinAIResearch/PhoGPT), kết hợp context và câu hỏi để sinh câu trả lời.

### CI/CD

Project CI/CD sử dụng Github và [Github Actions](https://docs.github.com/en/actions) để tự động hóa quá trình build và deploy. Quy trình như hình vẽ sau:

![CI/CD]()

Các workflows của project được lưu tại: [.github/workflows](.github/workflows), với các workflow như sau:

-   [server.yaml](.github/workflows/server.yaml): Build docker for dockerhub

## Cấu trúc thư mục

-   [Crawler](./law-crawler) - Crawl vào CSDL từ nguồn pháp điển Việt Nam.
-   [Server](./serve) - Chứa các mô hình, services, kiến trúc của hệ thống.
-   [Web](./web) - Giao diện người dùng.

## Hướng Dẫn Cài Đặt

Tất cả các images build từ services backend bạn có thể tìm thấy tại [Docker Hub]().

### Yêu Cầu 📋

Để cài đặt và chạy được dự án, trước tiên bạn cần phải cài đặt các công cụ bên dưới. Hãy thực hiện theo các hướng dẫn cài đặt sau, lưu ý chọn hệ điều hành phù hợp với máy tính của bạn:

-   [Docker-Installation](https://docs.docker.com/get-docker/)
-   [Docker-Compose-Installation](https://docs.docker.com/compose/install/)
-   [NodeJS v18-Installation](https://nodejs.org/en/download/)

> **Lưu ý:** NextJS 14 chỉ tương thích với NodeJS từ version 18 trở lên.

### 🔨 Cài Đặt

Trước hết, hãy clone dự án về máy tính của bạn:

```bash
git clone https://github.com/HIT-OS/VN_Legal_Document_Retrieval.git
```

cd vào thư mục VN_Legal_Document_Retrieval:

```bash
cd VN_Legal_Document_Retrieval
```

#### Chạy crawler lấy dữ liệu pháp điển và các van bản quy phạm pháp luật (optional):

Bước này chỉ cần chạy một lần duy nhất để lấy dữ liệu pháp điển và các văn bản quy phạm pháp luật vào cơ sở dữ liệu MySQL. Nếu bạn đã có dữ liệu, bạn có thể bỏ qua bước này và tự import vào hệ thống với hướng dẫn phía dưới.

Để cào dữ liệu, hãy:

```bash
cd law-crawler
```

Và tiếp tục theo hướng dẫn trong thư mục law-crawler [README.md](./law-crawler/README.md).

### Chạy backend hệ thống

-   Đầu tiên, cd vào thư mục backend:

```bash
cd server
```

-   Start các services với 1 lệnh docker-compose:

```bash
docker-compose up -d
```

<!-- #### PORT BINDING

-   Sau khi chạy xong, các service sẽ được chạy trên các port như sau:
<table width="100%">
<thead>
<th>
Service
</th>
<th>
PORT
</th>
</thead>
<tbody>
<tr>
<td>API Gateway</td>
<td>

8000:8000

8001:8001

8002:8002

8003:8003

8004:8004

</td>

</tr>
<tr>
<td>Auth Service</td>
<td>5000:5000</td>
</tr>
<tr>
<td>Law Service</td>
<td>8080:8080</td>
</tr>
<tr>
<td>RAG Service</td>
<td>5001:5001</td>
</tr>
<tr>
<td>Recommendation Service</td>
<td>5002:5002</td>
</tr>
</tbody>
</table> -->

### Chạy web-app

<!-- -   Đầu tiên, cd vào thư mục web:

```bash
cd web
```

-   Cài đặt các thư viện cần thiết:

```bash
npm install
```

-   Chạy web-app development mode:

```bash
npm run dev
```

Lúc này web-app sẽ chạy ở địa chỉ [http://localhost:3000](http://localhost:3000). Đến đây, bạn đã cài đặt xong. Còn nếu như bạn muốn chạy project ở môi trường production, hãy ngừng development server và chạy các lệnh sau:

-   Build frontend web-app

```bash
npm run build
```

-   Chạy web-app production mode:

```bash
npm run start
```

Lúc này web-app sẽ chạy ở địa chỉ [http://localhost:3000](http://localhost:3000). -->

## 🙌 Đóng góp cho dự án

<a href="https://github.com/HIT-OS/VN_Legal_Document_Retrieval/issues/new?assignees=&labels=&projects=&template=bug_report.md&title=%F0%9F%90%9B+Bug+Report%3A+">Bug Report ⚠️
</a>

<a href="https://github.com/HIT-OS/VN_Legal_Document_Retrieval/issues/new?assignees=&labels=&projects=&template=feature_request.md&title=RequestFeature:">Request Feature 👩‍💻</a>

Mọi đóng góp của các bạn đều được trân trọng, đừng ngần ngại gửi pull request cho dự án.

## Liên hệ

-   Phạm Đình Tiến: phamdt203@gmail.com
-   Đặng Hoàng Phương: hoangphuong270703@gmail.com
-   Nguyễn Tiến Kiên: tienkiennropro@gmail.com

## 📝 License

This project is licensed under the terms of the [GPL V3](LICENSE) license.