#!/bin/bash

# так же нужно:
# chmod +x move_files.sh

folder=""

while [[ "$#" -gt 0 ]]; do
    case $1 in
        --folder=*)
            folder="${1#*=}"  # Получаем значение после '='
            ;;
        *)
            echo "Unknown option: $1"  # Неизвестная опция
            exit 1
            ;;
    esac
    shift
done

# Если папка не указана, выводим ошибку
if [ -z "$folder" ]; then
    echo "Error: Folder parameter is required (e.g. --folder=test-2D-roguelike)"
    exit 1
fi

# Создаем папку, если её нет
mkdir -p "$folder"

# Перемещаем файлы
git diff --name-only HEAD@{1} HEAD | while read file; do
    # Удаляем файл, если уже существует в целевой папке
    rm -rf "$folder/$(basename "$file")"
    # Перемещаем файл в указанную папку
    git mv "$file" "$folder/"
done

git commit -m "Moved files into $folder directory (overwriting existing files)"

# mkdir -p test-2D-roguelike
# git diff --name-only HEAD@{1} HEAD | while read file; do
#     rm -rf "test-2D-roguelike/$(basename "$file")"  # Удаляем, если файл уже есть
#     git mv "$file" test-2D-roguelike/
# done