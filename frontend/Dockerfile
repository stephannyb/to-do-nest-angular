# Usamos apenas uma imagem base do Nginx, um servidor web leve e eficiente.
FROM nginx:1.27-alpine

# O Nginx serve arquivos a partir deste diretório por padrão.
# Primeiro, vamos remover o conteúdo padrão que vem na imagem.
RUN rm -rf /usr/share/nginx/html/*

# Agora, copiamos os arquivos da nossa aplicação (index.html, app.js, etc.)
# para o diretório público do Nginx.
# Assumindo que seu Dockerfile está na pasta 'frontend/', e seu código em 'frontend/app/'.
COPY ./app/ /usr/share/nginx/html/

# Expomos a porta 80, que é a porta padrão do Nginx.
EXPOSE 80

# Comando para iniciar o servidor Nginx em modo 'foreground'.
CMD ["nginx", "-g", "daemon off;"]