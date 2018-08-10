/**
 * tree - вывод списка файлов и папок файловой системы
 *
 * Cкрипт `tree` для вывода списка файлов и папок файловой системы.
 * Результатом работы должен быть объект с массивами `{ files, folders }`.
 * Вызовы файловой системы должны быть асинхронными.
 * Скрипт принимает входной параметр - путь до папки.
 * Если каталог не найден - возвращается undefined
 */

// Подключаем зависимости
var path = require('path');
var fs = require('fs');
var async = require('async');

// Определяем переданный путь
var arg = process.argv[2]

// Объявление переменной для хранения результата работы скрипта
var result = null;

// Функция составления объекта, содержащего файлы и директории по переданному пути (см. arg)
function tree (dirPath, callback) {

    fs.readdir(dirPath, function (err, files) {
        if (err) return callback(err);

        var filePaths = [];
        var fileDirs = [];
        async.eachSeries(files, function (fileName, eachCallback) {
            var filePath = path.join(dirPath, fileName);

            fs.stat(filePath, function (err, stat) {
                if (err) return eachCallback(err);

                if (stat.isDirectory()) {
                    fileDirs.push(filePath);
                    tree(filePath, function (err, subDirFiles) {
                        if (err) return eachCallback(err);

                        filePaths = filePaths.concat(subDirFiles);
                        eachCallback(null);
                    });

                } else {
                    if (stat.isFile()) {
                        filePaths.push(filePath);
                    }
                    eachCallback(null);
                }
            });
        }, function (err) {
            callback(err, filePaths, {"files" : filePaths, "folders": fileDirs});
        });

    });
}

if (arg) {
    // Вывод результата (отладка)
    tree(arg, function (err, files, filesAndFolders) {
       console.log(filesAndFolders);

       result = filesAndFolders;
    });
}

// Возвращение объекта с массивами файлов и директорий
exports.result;