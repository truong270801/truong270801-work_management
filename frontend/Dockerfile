FROM node:22.3.0

# Setting up a working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the source code
COPY . .

# Build the application
RUN npm run build

# Expose port and start the application
EXPOSE 3000
CMD ["npm", "run", "start"]
