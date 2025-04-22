#!/bin/bash

# Сборка проекта
npm run build

echo "Сборка завершена. Выполняется деплой..."

# Опциональная настройка - укажите путь к вашему серверу
SERVER_PATH="/path/to/your/server/directory"

# Если используете локальный сервер, раскомментируйте и настройте следующие строки
# rsync -avz --delete out/ username@your-server.com:$SERVER_PATH

# Если деплоите на локальную папку
# cp -r out/* $SERVER_PATH

echo "Деплой завершен!" 