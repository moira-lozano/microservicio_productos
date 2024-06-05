# Stage 1: Build
FROM node:16 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy built application from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Install production dependencies
RUN npm ci --only=production

# Expose port
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/main.js"]
