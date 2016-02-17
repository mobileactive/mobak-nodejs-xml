NPM пакет для отправки СМС через сервис Мобильного Актива
=========================================================

Использование:
==============


```
require('mobak-nodejs-xml');

var sender = new Mobak('<YOUR_LOGIN>', '<YOUR_PASSWORD>');

sender.send({
    uid: Math.floor(Date.now() / 1000), // Уникальный идентификатор
    sender: 'Mobak', // Номер отправителя
    message: 'Test message', // Текст сообщения
    phone: '79194830777' // Номер получателя
});
```