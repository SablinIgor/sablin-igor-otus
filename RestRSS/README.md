Подключение к базе данных

Для подключения к базе данных (далее DB) используются переменные окружения, перечисленные в файле .env.[development | production | stage etc.]
Формат файла:
 DBURL="mongodb://user:password@host:port/dbname"

Значения полей:
   user - имя пользователя DB
   password - пароль пользователя DB
   host - имя/ip сервера, где установлена DB
   port - порт сервера
   dbname - имя DB
