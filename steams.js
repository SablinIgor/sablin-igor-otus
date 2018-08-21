/**
 * Демонстрация работы с потоками в `NodeJS`:
 * - Readable, генерирующий случайные числа
 * - Transformable, добавляющий случайное число к первому
 */

const { Readable } = require('stream');
const { Writable } = require('stream');
const { Transform } = require('stream');

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

/*
Генератор случайных числе
 */
const Generator = new Readable({
    read() {
        this.push(getRandomInt(0, 1000).toString())
    }
});

/*
Преобразователь потока
 */
const Transformation = new Transform({
    transform(chunk, encoding, callback) {
        this.push((parseInt(chunk.toString()) + getRandomInt(0, 1000)).toString());
        callback();
    }
});

/*
Вывод потока в консоль
 */
const Printer = new Writable({
    write(chunk, encoding, callback) {
        console.log(chunk.toString());
        callback();
    }
});

/*
Запуск потока
 */
Generator.pipe(Transformation).pipe(Printer);