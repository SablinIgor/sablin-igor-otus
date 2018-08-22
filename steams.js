/**
 * Демонстрация работы с потоками в `NodeJS`:
 * - Readable, генерирующий случайные числа
 * - Transformable, добавляющий случайное число к первому
 */

const { Readable } = require('stream');
const { Writable } = require('stream');
const { Transform } = require('stream');

let count = 0;
let start = new Date;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

/*
Генератор случайных числе
 */
const Generator = new Readable({
    read() {
        this.push(getRandomInt(0, 1000).toString())
        count++;
        if (count > 500000) {
            var end = new Date; // конец измерения
            console.log( "Цикл занял " + (end - start) + " ms" );
            process.kill(process.pid);
        }
    },
    highWaterMark: 1
});

/*
Преобразователь потока
 */
const Transformation = new Transform({
    transform(chunk, encoding, callback) {
        this.push((parseInt(chunk.toString()) + getRandomInt(0, 1000)).toString());
        callback();
    },
    highWaterMark: 10
});

/*
Вывод потока в консоль
 */
const Printer = new Writable({
    write(chunk, encoding, callback) {
        console.log(chunk.toString());
        callback();
    },
    highWaterMark: 2
});

setTimeout((function() {
    return process.kill(process.pid);
}), 5000);

/*
Запуск потока
 */
Generator.pipe(Transformation).pipe(Printer);