# # Dockerfile for React Frontend
# FROM node:14-alpine as build

# # Set working directory
# WORKDIR /frontend

# # Copy package.json and package-lock.json
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the application code
# COPY . ./

# # Build the React application
# RUN npm run build

# # Install serve to serve the build
# RUN npm install -g serve

# # Expose the port the app runs on
# EXPOSE 5173

# # Start the application
# CMD ["serve", "-s", "build"]

FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

CMD [ "npm", "run", "preview" ]