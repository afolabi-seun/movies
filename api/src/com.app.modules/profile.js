var define = require('node-requirejs-define'),
    jswt = require('../com.app.utils/jwtHandler'),
    authDao = require('../com.app.data.access.objects/profileDao'),
    rulecfg = require('../com.app.configuration/ruleConf.json'),
    validation = require('../com.app.utils/validationHandler'),
    dispatch = require('../com.app.service.layer/dispatcher'),
    logger = require('../com.app.utils/logHandler').Logger;

define(function () {

    function AuthenticateUser(req, res, next) {
        try {
            const validationRule = rulecfg.validation.authentication;
            validation.Validator(req.body, validationRule, {}, (err, status) => {
                if (!status) {
                    dispatch.SendBadRequestMessage(res, err);
                    logger.error('/authenticateUser', err);
                } else {
                    var userName = req.body.userName,
                        password = req.body.password,
                        hshPassword = jswt.HarshPassword(password),
                        session = jswt.GetSession(userName, password),
                        jsnReq = { userName: userName, password: hshPassword, session: session },
                        jsnDta = JSON.stringify(jsnReq);

                    logger.info('/authenticateUser', jsnDta);

                    let params = { userName: userName, password: hshPassword, session: session };
                    authDao.AuthenticationSQL(params, (err, data) => {
                        if (err) {
                            dispatch.SendDataBaseErrorMessage(res, err);
                        } else {
                            logger.info('/authenticateUser', data);
                            var dt = JSON.parse(data);
                            dispatch.SendGenricMessage(res, dt);
                        }
                    });
                }
            });
        } catch (e) {
            logger.error('/authenticateUser', e);
            dispatch.DispatchErrorMessage(res, 'application error in AuthenticateUser()..');
        }
    }

    function GetUser(req, res, next) {
        try {
            const validationRule = rulecfg.validation.listUsers;
            validation.Validator(req.body, validationRule, {}, (err, status) => {
                if (!status) {
                    dispatch.SendBadRequestMessage(res, err);
                    logger.error('/getUser', err);
                } else {
                    var userId = req.body.userId,
                        session = req.headers['apisessionkey'];
                    var jsnReq = { userId: userId, session: session },
                        jsnDta = JSON.stringify(jsnReq);

                    logger.info('/getUser', jsnDta);

                    let parm = { userId: userId, session: session };
                    authDao.ListUserSQL(parm, (err, data) => {
                        if (err) {
                            dispatch.SendDataBaseErrorMessage(res, err);
                        } else {
                            var dt = JSON.parse(data);
                            logger.info('/getUser', data);
                            dispatch.SendGenricMessage(res, dt);
                        }
                    });
                }
            });
        } catch (e) {
            logger.error('/getUser', e);
            dispatch.DispatchErrorMessage(res, 'application error in GetUser()..');
        }
    }

    function CreateUser(req, res, next) {
        try {
            const validationRule = rulecfg.validation.userCreation;
            validation.Validator(req.body, validationRule, {}, (err, status) => {
                if (!status) {
                    dispatch.SendBadRequestMessage(res, err);
                    logger.error('/createUser', err);
                } else {
                    var userName = req.body.userName,
                        password = req.body.password,
                        userPswd = jswt.HarshPassword(password),
                        firstName = req.body.firstName,
                        lastName = req.body.lastName,
                        email = req.body.email,
                        address = req.body.address,
                        country = req.body.country,
                        jsnReq = { userName: userName, password: userPswd, firstName: firstName, lastName: lastName, email: email, address: address, country, country },
                        jsnDta = JSON.stringify(jsnReq);

                    logger.info('/createUser', jsnDta);

                    let newUser = new authDao(userName, userPswd, firstName, lastName, email, address, country);
                    newUser.CreateUserSQL((err, data) => {
                        if (err) {
                            dispatch.SendDataBaseErrorMessage(res, err);
                        } else {
                            var dt = JSON.parse(data);
                            logger.info('/createUser', data);
                            dispatch.SendGenricMessage(res, dt);
                        }
                    });
                }
            });
        } catch (e) {
            logger.error('/createUser', e);
            dispatch.DispatchErrorMessage(res, 'application error in CreateUser()..');
        }
    }

    return {
        AuthenticateUser: AuthenticateUser,
        GetUser: GetUser,
        CreateUser: CreateUser
    }
});