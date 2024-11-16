# One Stage: Install process
FROM node:20-alpine AS build

# Copy package.json and yarn.lock separately for better caching
COPY package.json yarn.lock ./

# Copy Prisma schema and generate client
COPY prisma ./prisma

# Install dependencies
RUN yarn install --frozen-lockfile

COPY . .

# Build the application
RUN yarn build

# Second Stage: Run the app
FROM node:20-alpine AS development

WORKDIR /app

# copy dist, node_modules package.json into the container
COPY --from=build /dist ./dist
COPY --from=build /node_modules ./node_modules
COPY --from=build /package.json ./package.json

EXPOSE 3000

CMD ["yarn", "start:prod"]
