# Use the official Node.js 10 image.
# https://hub.docker.com/_/node
FROM node:13.8.0

# Create and change to the app directory.
WORKDIR /Users/hayashihitoshi/Shinyaigeek

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package.json express.ts tsconfig.json yarn.lock webpack.config.common.js webpack.config.server.js ./
COPY src ./src/
COPY static ./static/

# Install production dependencies.
RUN yarn install --frozen-lock-file

RUN yarn run build

# Copy local code to the container image.
COPY . .

# Run the web service on container startup.
CMD [ "yarn", "start" ]