# Imagen oficial de PHP con Apache
FROM php:8.2-apache

# Copiar los archivos del proyecto al contenedor
COPY . /var/www/html/

# Dar permisos
RUN chown -R www-data:www-data /var/www/html

# Habilitar mod_rewrite (si después quieres URLs amigables)
RUN a2enmod rewrite

# Exponer el puerto 80
EXPOSE 80

# Apache inicia automáticamente al levantar el contenedor
