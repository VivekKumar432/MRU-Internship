# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json from the root directory into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code from the current directory into the container
COPY . .

# Expose the port the server runs on
EXPOSE 5000

# Start the Node.js server
CMD ["npx", "nodemon", "server.js"]
