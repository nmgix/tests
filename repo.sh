#!/bin/bash

# chmod +x repo.sh
# repo example = https://github.com/nmgix/test-2D-roguelike

# Проверяем, что был передан параметр --repo=
if [[ -z "$1" || "$1" != --repo=* ]]; then
    echo "Использование: $0 --repo=<репозиторий>"
    exit 1
fi

# Извлекаем ссылку на репозиторий (удаляем префикс "https://github.com/username/")
REPO_URL="${1#--repo=}"

# Извлекаем название репозитория (удаляем "https://github.com/имя_пользователя/" и суффикс ".git")
REPO_NAME=$(echo "$REPO_URL" | sed -e 's|^https://github.com/[^/]*/||' -e 's|\.git$||')

# Шаг 1: fetch репозитория
git fetch "$REPO_URL"

# Шаг 2: checkout с новой веткой
git checkout -b "$REPO_NAME" FETCH_HEAD

# Шаг 3: создаем папку внутри текущего контента
mkdir "$REPO_NAME/"

# Шаг 4: перемещаем все файлы в подпапку
git ls-tree -z --name-only HEAD | xargs -0 -I {} git mv {} "$REPO_NAME/"

# Шаг 5: коммитим изменения
git commit -am "все файлы в подпапку $REPO_NAME"

# Шаг 6: возвращаемся на main
git checkout main

# Шаг 7: сливаем изменения
git merge --allow-unrelated-histories "$REPO_NAME"