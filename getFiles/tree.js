/**
 * tree - вывод списка файлов и папок файловой системы
 *
 * Cкрипт `tree` для вывода списка файлов и папок файловой системы.
 * Результатом работы должен быть объект с массивами `{ files, folders }`.
 * Вызовы файловой системы должны быть асинхронными.
 * Скрипт принимает входной параметр - путь до папки.
 */

// Подключаем зависимости
const path = require('path');
const fs = require('fs');

// Определяем переданный путь
const arg = process.argv[2]

// Объявление переменной для хранения результата работы скрипта
var list = {files: [], folders: [arg]};

var getPromise = (basePath, readdir) => {
    return new Promise(function (resolve, reject) {
        readdir(basePath, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(1);
            }
        });
    });
}

var checkout = (pending, list, callback) => {
    if (!pending) {
        return callback(null, list);
    }
}

function readdir(basePath, callback) {

    // оборачиваем в Promise
    if (!callback) {
        return getPromise(basePath, readdir);
    }

    // получаем список объектов текущей директории
    fs.readdir(basePath, function(err, files) {

        let pending = files.length;

        // Если все директории пройдены - выходим
        checkout(pending, list, callback)

        // анализируем объекты, находящиеся в текущей директории
        files.forEach(function(file) {

            var filePath = path.join(basePath, file);

            // заполнение массива с результатом и переход дальше по рекурсии
            fs.stat(filePath, function(_err, stats) {

                if (stats.isDirectory()) {
                    list.folders.push(filePath);

                    readdir(filePath, function(__err, res) {
                        checkout(--pending, list, callback)
                    });
                } else {
                    list.files.push(filePath);
                    checkout(--pending, list, callback)
                }
            });
        });
    });
}


try {
    fs.accessSync(arg);

    list.folders.push(arg);

    readdir(arg).then(
        function(resp) {
            console.log(list)
        },
        function(error) {
            console.error("something wrong... ", error);
        }
    );
} catch (err) {
    console.error('no access!');
}


exports.list;

