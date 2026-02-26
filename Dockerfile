# Base image (OS)

FROM node:25-slim

# working directory

WORKDIR /app

# copy code from host to container

COPY package.json ./

# run build and install

RUN npm install

COPY . .

# expose the server

EXPOSE 4200

# keep the server running

CMD ["npx","ng","serve","--host","0.0.0.0","--port","4200"] 
