#Build Angular
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --prod

#Servir com Nginx
FROM nginx:alpine

# Copia tudo que estiver dentro de dist/* (não importa o nome da pasta)
COPY --from=build /app/dist/ /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]