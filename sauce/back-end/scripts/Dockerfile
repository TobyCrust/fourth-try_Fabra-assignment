# Use the official Node.js image as the base
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install --omit=dev

# Copy the rest of the application code
COPY . .

# Expose the port your Express app runs on (default: 3000)
EXPOSE 3001

# Start the application
CMD ["node", "server.js"]