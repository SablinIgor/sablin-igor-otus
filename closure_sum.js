/**
 * Формирование пользовательского исключения.
 * @param {string} a - Текст сообщения об ошибке
 */
function UserException(message) {
    this.message = message;
    this.name = "Javascript Lesson 1 Exception";
}

/**
 * Проверка на корректность переданного аргумента.
 * @param {any} a - Переданный в функцию sum параметр
 */
function checkParam(a) {
    if (typeof(a) != "number") {
        throw new UserException("Передано значение отличное от числа: " + a)
    }
}

/**
 * Функция sum, которая может быть исполнена множество раз.
 * Если она исполнена без аргументов, то возвращает значение суммы всех переданных до этого значений.
 *
 * @param {number} a - Число, к-рое складывается с другим при сложении
 * @return Сумма переданных слагаемых
 * @author Igor Sablin
 * @version 1.0
 */
function sum(a) {
    let count = a;

    checkParam(a);

    return function by(b) {
        if (arguments.length === 0) {
            return count;
        } else {
            checkParam(b);
            count += b;
            return by;
        }
    }
}

/*try {
    console.log(sum(1)(4)(4)())
} catch (e) {
    console.log(e)
}*/
