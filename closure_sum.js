/**
 * Функция sum, которая может быть исполнена множество раз.
 * Если она исполнена без аргументов, то возвращает значение суммы всех переданных до этого значений.
 *
 * @param {number} Слагаемое - Число, к-рое складывается с другим при сложении
 * @return Сумма переданных аргументов
 * @author Igor Sablin
 * @version 1.0
 */
function sum(a) {
    var count = a;
    return function by(b) {
        if (b === undefined) {
            return count;
        } else {
            count += b;
            return by;
        }
    }
}
