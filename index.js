var request = require('request');
var crypto = require('crypto');

function Mobak(login, password) {

    this.baseUrl = 'http://client.mobak.ru/api';
    this.login = login;
    this.password = password
}

Mobak.prototype.send = function (options) {

    options = options || {};

    var xml = '<?xml version=\"1.0\" encoding=\"utf-8\"?>';
    xml += '<request uid=\"{uid}\" sender=\"{sender}\">';
    xml += '<security><login value=\"{login}\"/><sign value=\"{signature}\" /></security>';
    xml += '<message><text>{message}</text><abonent phone=\"{phone}\"/></message></request>';

    var hash = crypto.createHash('md5').update(options.uid + this.password).digest('hex').toLowerCase();

    xml = xml.replace("{uid}", options.uid);
    xml = xml.replace("{login}", this.login);
    xml = xml.replace("{signature}", hash);
    xml = xml.replace("{sender}", options.sender);
    xml = xml.replace("{message}", options.message);
    xml = xml.replace("{phone}", options.phone);

    console.log(xml);

    var httpOptions = {
        method: 'post',
        url: this.baseUrl + 'messages/xml',
        body: xml,
        headers: {
            'Content-Type': 'application/xml'
        }
    };

    request(httpOptions, function (err, res, body) {
        if (err) {
            console.log('Error :', err);
            return
        }
        console.log(' Body :', body)
    });

};

module.exports = Mobak;