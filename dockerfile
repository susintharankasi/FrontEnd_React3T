FROM node:18-alpine
# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install
RUN npm install @remix-run/router
RUN chmod +x node_modules/.bin/react-scripts
# Copy the rest of the application code
COPY . .

ARG REACT_APP_API_URL
ARG REACT_APP_WEATHER_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV REACT_APP_WEATHER_API_URL=$REACT_APP_WEATHER_API_URL
# Build the React app for production
RUN npm run build
RUN npm install -g serve

# Expose the port that the app will run on
EXPOSE 3000

# Serve the app using a simple HTTP server
CMD ["serve", "-s", "build", "-l", "3000", "--no-clipboard"]