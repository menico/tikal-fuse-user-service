FROM node:boron

# Create app directory
RUN mkdir -p /deploy
WORKDIR /deploy


# Install app dependencies
COPY package.json /deploy
RUN npm install

# Bundle app source
COPY . /deploy

EXPOSE 8080
CMD [ "npm", "start" ]