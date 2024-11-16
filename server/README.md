# Vietnam Legal Document Retrieval Server

Hệ thống phía máy chủ ứng dụng truy xuất văn bản pháp lý Việt Nam

## I. Cài đặt local

1. Yêu cầu:

- [NodeJS](https://nodejs.org/en/download/package-manager/current) (version >= 18)
- [MySQL](https://www.mysql.com/)

3. Config: Tạo file `.env` dựa vào file mẫu `.env.example`

4. Tải dependencies:

```bash
# npm
npm install
# yarn
yarn
```

4. Migrate database:

```bash
npx prisma migrate dev
```

5. Generate Prisma Client

```bash
npx prisma generate
```

6. Chạy server ở `http://localhost:3000`:

```bash
# npm
npm run start:dev
# yarn
yarn start:dev
```

## II. Cài đặt bằng docker

1. Download [Docker](https://docs.docker.com/get-started/get-docker/) và [Docker compose](https://docs.docker.com/compose/install/)
2. Chạy service:

```bash
docker-compose up -d
```

## Công nghệ sử dụng

1. Framework: [NestJS](https://nestjs.com/)

2. ORM: [Prisma](https://www.prisma.io/)

3. Validation: [typestack/class-validator: Decorator-based property validation for classes.](https://github.com/typestack/class-validator)

4. More: axios, bcrypt, express-rate-limit,...
