# Build stage
# using base image as the app requires node to run the npm commands
# builder is kind of labelling this. This allows it to be used later in other stages.
FROM node:18-alpine AS builder

# setting working directory, creates a /app directory in the container and all the things now happen inside this
# its equivalent to anti-vibe directory
WORKDIR /app
# copying package.json and package-lock.json to the container to install the dependencies
COPY package*.json ./
# installing dependencies
RUN npm install
COPY . .
#  --schema=src/prisma/schema.prisma is used because prisma is inside /src of the Prisma schema file
RUN npx prisma generate --schema=src/prisma/schema.prisma
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/src/prisma ./src/prisma
EXPOSE 3000
ENV PORT=3000
ENV NODE_ENV=production
CMD ["sh", "-c", "npx prisma migrate deploy --schema=src/prisma/schema.prisma && npm run start"]