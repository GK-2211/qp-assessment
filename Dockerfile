# Use Node.js as base image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./



# Install dependencies
RUN npm install


# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Start the application
CMD ["ts-node", "src/app.ts"] 