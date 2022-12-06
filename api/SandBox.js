var define = require('node-requirejs-define'),
    jswt = require('./src/com.app.utils/jwtHandler');

define(function () {

    const getPassword = function (password) {
        var userPswd = jswt.HarshPassword(password);
        console.log(userPswd);
    }

    getPassword('password');
});
