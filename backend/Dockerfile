# Stage 1: Build
FROM node:20.11-bookworm AS builder

WORKDIR /app

# Copy configuration files first
COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./

# Install ALL dependencies from scratch
RUN npm install

# Explicitly copy source folder to ensure it's included
COPY src ./src
# Copy remaining files
COPY . .

# Verify binary presence (will fail early if missing)
RUN ls -l node_modules/@nestjs/cli/bin/nest.js

# Build using the direct script
RUN node node_modules/@nestjs/cli/bin/nest.js build

# Stage 2: Production
FROM node:20.11-bookworm-slim

WORKDIR /app

# Copy built assets and production dependencies
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Expose the port
EXPOSE 3001

# Command to run the application
CMD ["node", "dist/main"]
