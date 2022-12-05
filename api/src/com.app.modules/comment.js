var define = require('node-requirejs-define'),
    commentDAO = require('../com.app.data.access.objects/commentDAO'),
    rulecfg = require('../com.app.configuration/ruleConf.json'),
    validation = require('../com.app.utils/validationHandler'),
    dispatch = require('../com.app.service.layer/dispatcher'),
    logger = require('../com.app.utils/logHandler').Logger;


define(function () {

    function GetComment(req, res, next) {
        try {
            const validationRule = rulecfg.validation.listUsers;
            validation.Validator(req.body, validationRule, {}, (err, status) => {
                if (!status) {
                    dispatch.SendBadRequestMessage(res, err);
                    logger.error('/getComments', err);
                } else {
                    var userId = req.body.userId,
                        session = req.headers['apisessionkey'];
                    var jsnReq = { userId: userId, session: session },
                        jsnDta = JSON.stringify(jsnReq);

                    logger.info('/getComments', jsnDta);

                    let parm = { userId: userId, session: session };
                    commentDAO.ListCommentSQL(parm, (err, data) => {
                        if (err) {
                            dispatch.SendDataBaseErrorMessage(res, err);
                        } else {
                            var dt = JSON.parse(data);
                            logger.info('/getComments', data);
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

    function CreateComment(req, res, next) {
        try {
            const validationRule = rulecfg.validation.commentCreation;
            validation.Validator(req.body, validationRule, {}, (err, status) => {
                if (!status) {
                    dispatch.SendBadRequestMessage(res, err);
                    logger.error('/createUser', err);
                } else {
                    var name = req.body.name,
                        comment = req.body.comment,
                        jsnReq = { name: name, comment: comment },
                        jsnDta = JSON.stringify(jsnReq);

                    logger.info('/createUser', jsnDta);

                    let newUser = new commentDAO(name, comment);
                    newUser.CreateUserSQL((err, data) => {
                        if (err) {
                            dispatch.SendDataBaseErrorMessage(res, err);
                        } else {
                            var dt = JSON.parse(data);
                            logger.info('/createUser', data);
                            switch (dt.status.toLowerCase()) {
                                case "ok":
                                    var subject = 'New Profile',
                                        messg = { firstName, lastName, password, email },
                                        options = { email, messg: messg, subject: subject };
                                    msg.SendUserMsg(options);
                                    dispatch.SendGenricMessage(res, dt);
                                    break;
                                default:
                                    dispatch.SendGenricMessage(res, dt);
                                    break
                            }
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
        GetComment: GetComment,
        CreateComment: CreateComment
    }

});