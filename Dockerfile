# Use official Node.js image as base
FROM node:21-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the entire application to the container
COPY . .

ENV $(cat .env)

# Install dependencies
RUN npm install

# Expose port 3002
EXPOSE 3002

# Command to run when the container starts
CMD ["npm", "run", "dev"]


