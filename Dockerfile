# Use official Node.js image as base
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy .env file
COPY .env ./

# Copy the entire application to the container
COPY . .

# Install dependencies
RUN npm install

# Expose port 3001
EXPOSE 3001

# Command to run when the container starts
CMD ["npm", "run", "dev"]

