var define = require('node-requirejs-define'),
    commentDAO = require('../com.app.data.access.objects/commentDAO'),
    rulecfg = require('../com.app.configuration/ruleConf.json'),
    validation = require('../com.app.utils/validationHandler'),
    dispatch = require('../com.app.service.layer/dispatcher'),
    logger = require('../com.app.utils/logHandler').Logger;


define(function () {

    function GetComment(req, res, next) {
        try {
            let parm = {};
            commentDAO.ListCommentSQL(parm, (err, data) => {
                if (err) {
                    dispatch.SendDataBaseErrorMessage(res, err);
                } else {
                    var dt = JSON.parse(data);
                    logger.info('/getComments', data);
                    dispatch.SendGenricMessage(res, dt);
                }
            });

        } catch (e) {
            logger.error('/getComments', e);
            dispatch.DispatchErrorMessage(res, 'application error in GetComments()..');
        }
    }

    function CreateComment(req, res, next) {
        try {
            const validationRule = rulecfg.validation.commentCreation;
            validation.Validator(req.body, validationRule, {}, (err, status) => {
                if (!status) {
                    dispatch.SendBadRequestMessage(res, err);
                    logger.error('/createComment', err);
                } else {
                    var userId = req.body.userId,
                        movieId = req.body.movieId,
                        comment = req.body.comment,
                        jsnReq = { userId: userId, movieId: movieId, comment: comment },
                        jsnDta = JSON.stringify(jsnReq);

                    logger.info('/createComment', jsnDta);

                    let comments = new commentDAO(userId, movieId, comment);
                    comments.CreateCommentSQL((err, data) => {
                        if (err) {
                            dispatch.SendDataBaseErrorMessage(res, err);
                        } else {
                            var dt = JSON.parse(data);
                            logger.info('/createComment', data);
                            dispatch.SendGenricMessage(res, dt);
                        }
                    });
                }
            });
        } catch (e) {
            logger.error('/createComment', e);
            dispatch.DispatchErrorMessage(res, 'application error in CreateComment()..');
        }
    }

    return {
        GetComment: GetComment,
        CreateComment: CreateComment
    }

});