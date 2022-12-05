var define = require('node-requirejs-define'),
    jswt = require('jsonwebtoken'),
    crypto = require('crypto'),
    dispatch = require('../com.app.service.layer/dispatcher'),
    spkeasy = require('speakeasy'),
    appcfg = require('../com.app.configuration/appConf.json'),
    logger = require('../com.app.utils/logHandler').Logger;

define(function () {
    var secretKey = appcfg.application.apiSettings.secretKey,
        UIKey = appcfg.application.apiSettings.uiKey,
        salt = appcfg.application.apiSettings.salt,
        algorithm = appcfg.application.apiSettings.algorithm;


    function GetSession(userId, password) {
        var payLoad = {};
        payLoad.userId = userId;
        payLoad.userName = password;
        var session = jswt.sign(payLoad, secretKey, { expiresIn: appcfg.application.apiSettings.session.expiry });
        return session;
    }

    function VerifySession(session, success, failure) {
        jswt.verify(session, secretKey, function (err, decoded) {
            if (err) {
                failure();
            } else {
                success(decoded);
            }
        });
    }

    function ValidateSession(req, res, next, callback) {
        var session = req.headers['apisessionkey'];
        switch (session) {
            case undefined:
                {
                    dispatch.SendUnAuthorizedMessage(res);
                    break;
                }
            case null:
                {
                    dispatch.SendUnAuthorizedMessage(res);
                    break;
                }
            default:
                {
                    sessionAuth(req, res, next, callback);
                }
        }
    }

    const sessionAuth = function (req, res, next, callback) {
        var session = req.headers['apisessionkey'];
        VerifySession(session, function (decoded) {
            req['payload'] = JSON.parse(JSON.stringify(decoded));
            callback(req, res, next);
        }, function () {
            dispatch.SendUnAuthorizedMessage(res);
        });
    }

    function ValidateChannel(req, res, next, callback) {
        var channelKey = req.headers['channelkey'],
            uiKey = req.headers['uikey'];
        if (uiKey !== UIKey) {
            //validateChannelToken(channelKey, req, res, next, callback);
            dispatch.SendUnAuthorizedUiKeyMessage(res);
        } else {
            callback(req, res, next, callback);
        }
    }

    const validateChannelToken = function (channelKey, req, res, next, callback) {
        switch (channelKey) {
            case undefined:
                {
                    dispatch.SendUnAuthorizedMessage(res);
                    break;
                }
            case null:
                {
                    dispatch.SendUnAuthorizedMessage(res);
                    break;
                }
            default:
                {
                    dispatch.SendUnAuthorizedMessage(res);
                }
        }
    }

    function GetResetPasswordLink(userId) {
        var payLoad = {};
        payLoad.userId = userId;
        var token = jswt.sign(payLoad, secretKey);
        return token;
    }

    function GetToken() {
        let token = spkeasy.totp({
            "secret": process.env.OTP_KEY,
            "encoding": 'base32',
            "digits": appcfg.application.tokenSettings.digits, //6,
            "step": appcfg.application.tokenSettings.step, //60,
            "window": appcfg.application.tokenSettings.window //10
        });
        return token;
    }

    function VerifyToken(token) {
        var verified = spkeasy.totp.verify({
            secret: process.env.OTP_KEY,
            encoding: 'base32',
            token: token,
            step: appcfg.application.tokenSettings.step, //60,
            window: appcfg.application.tokenSettings.window //10
        });
        return verified;
    }

    function Encrypt(text) {
        var cipher = crypto.createCipher(algorithm, salt);
        var crypted = cipher.update(text, 'utf8', 'hex');
        crypted += cipher.final('hex');
        return crypted;
    }

    function Decrypt(text) {
        var decipher = crypto.createDecipher(algorithm, salt);
        var dec = decipher.update(text, 'hex', 'utf8');
        dec += decipher.final('utf8');
        return dec;
    }

    function HarshPassword(password) {
        // Hashing user's salt and password with 1000 iterations,
        //64 length and sha512 digest
        var hash = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
        return hash;
    };

    function UnharshPassword(password) {
        var clear = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
        return clear;
    };

    return {
        GetSession: GetSession,
        VerifySession: VerifySession,
        ValidateSession: ValidateSession,
        ValidateChannel: ValidateChannel,
        GetResetPasswordLink: GetResetPasswordLink,
        GetToken: GetToken,
        VerifyToken: VerifyToken,
        Encrypt: Encrypt,
        Decrypt: Decrypt,
        HarshPassword: HarshPassword,
        UnharshPassword: UnharshPassword
    }
});