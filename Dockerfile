# Gunakan Node.js versi LTS
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json dan lock file
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy semua source code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build NestJS app
RUN npm run build

# Expose port (default NestJS)
EXPOSE 3000

# Jalankan aplikasi
CMD ["node", "dist/main.js"]