# Use an official Node runtime as a parent image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages
RUN npm install express

# Make port 3001 available to the world outside this container
EXPOSE 3001

# Define environment variable
ENV PORT=3001

# Run app when the container launches
CMD ["node", "index.js"]
