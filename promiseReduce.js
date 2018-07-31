/**
 * promiseReduce - работа с асинхронными функциями
 * Написать функцию `promiseReduce`, которая получает на вход
 * - массив асинхронных функций `asyncFunctions`, возвращающих `Promise`,
 * - `reduce` функцию и
 * - стартовое значение `initialValue`.
 *
 * `promiseReduce` поочередно вызывает переданные асинхронные функции
 * и выполняет `reduce` функцию сразу при получении результата до вызова следующей асинхронной функции.
 *
 */


let fn1 = () => {
    console.log('fn1')
    return Promise.resolve(1)
}

let fn2 = () => new Promise(resolve => {
    console.log('fn2')
    setTimeout(() => resolve(2), 1000)
})

let promises = [fn1, fn2]

let fnReduce = function (memo, value) {
    console.log('reduce')
    return memo * value
};

let initialValue = 1;

function promiseReduce(asyncFunctions, fnReduce, initialValue)
{
    return new Promise (function(resolve, reject) {

        // Инициализация цепочки промисов цепочки
        let chain = Promise.resolve();

        let currentValue = initialValue;

        // Последовательные вызовы асинхронных функций в цепочку промисов
        asyncFunctions.forEach(function(asyncFunction) {
            chain = chain
                .then(() => asyncFunction())
                .then((result) => {
                    currentValue = fnReduce(currentValue, result)
                })
        })

        // возвращение результата
        chain.then(() => {resolve(currentValue);})
    })
}

promiseReduce(promises, fnReduce, initialValue).then((result) => {console.log(result)});