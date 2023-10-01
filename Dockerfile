# Base image
FROM node:lts-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Create a "dist" folder with the production build
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the server using the production build
CMD ["node", "dist/main.js"]
