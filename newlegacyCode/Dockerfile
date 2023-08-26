# Use an official Node.js runtime as the base image
FROM node:19-alpine


# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY ./ ./

# Install app dependencies
RUN npm install

# Copy the rest of the app's source code to the container
COPY . .

# Specify the command to run when the container starts
CMD ["node", "main.js"]
