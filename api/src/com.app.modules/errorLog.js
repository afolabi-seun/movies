var define = require('node-requirejs-define'),
    appcfg = require('../com.app.configuration/appConf.json'),
    errorDao = require('../com.app.data.access.objects/errorDao'),
    rulecfg = require('../com.app.configuration/ruleConf.json'),
    validation = require('../com.app.utils/validationHandler'),
    dispatch = require('../com.app.service.layer/dispatcher'),
    logger = require('../com.app.utils/logHandler').Logger;

define(function () {

    function GetInfoLog(req, res, next) {
        try {
            const validationRule = rulecfg.validation.infoLog;
            validation.Validator(req.body, validationRule, {}, (err, status) => {
                if (!status) {
                    dispatch.SendBadRequestMessage(res, err);
                    logger.error('/getInfoLog', err);
                } else {
                    var startDate = req.body.startDate + appcfg.application.timeSettings.startTimeStamp,
                        endDate = req.body.endDate + appcfg.application.timeSettings.endTimeStamp;

                    let obj = { startDate: startDate, endDate: endDate };
                    errorDao.GetInfoErrSQL(obj, (data) => {
                        if (data.length > 0) {
                            dispatch.SendGenricMessage(res, data);
                        } else {
                            dispatch.SendGenricMessage(res, data);
                        }

                    });
                }
            });
        } catch (e) {
            logger.console('/getInfoLogin', e);
            dispatch.DispatchErrorMessage(res, 'application error in GetInfoLog()..');
        }
    }

    function GetErrorLog(req, res, next) {
        try {
            const validationRule = rulecfg.validation.errorLog;
            validation.Validator(req.body, validationRule, {}, (err, status) => {
                if (!status) {
                    dispatch.SendBadRequestMessage(res, err);
                    logger.error('/getErrorLog', err);
                } else {
                    var startDate = req.body.startDate + appcfg.application.timeSettings.startTimeStamp,
                        endDate = req.body.endDate + appcfg.application.timeSettings.endTimeStamp;

                    let obj = { startDate: startDate, endDate: endDate };
                    errorDao.GetErrSQL(obj, (data) => {
                        if (data.length > 0) {
                            dispatch.SendGenricMessage(res, data);
                        } else {
                            dispatch.SendGenricMessage(res, data);
                        }
                    });
                }
            });
        } catch (e) {
            logger.console('/getErrorLog', e);
            dispatch.DispatchErrorMessage(res, 'application error in GetErrorLog()..');
        }
    }

    function GetDebugLog(req, res, next) {
        try {
            const validationRule = rulecfg.validation.debugLog;
            validation.Validator(req.body, validationRule, {}, (err, status) => {
                if (!status) {
                    dispatch.SendBadRequestMessage(res, err);
                    logger.error('/getDebugLog', err);
                } else {
                    var startDate = req.body.startDate + appcfg.application.timeSettings.startTimeStamp,
                        endDate = req.body.endDate + appcfg.application.timeSettings.endTimeStamp;

                    let obj = { startDate: startDate, endDate: endDate };
                    errorDao.GetDebugErrSQL(obj, (data) => {
                        if (data.length > 0) {
                            dispatch.SendGenricMessage(res, data);
                        } else {
                            dispatch.SendGenricMessage(res, data);
                        }
                    });
                }
            });
        } catch (e) {
            logger.console('/getDebugLog', e);
            dispatch.DispatchErrorMessage(res, 'application error in GetDebugLog()..');
        }
    }

    return {
        GetInfoLog: GetInfoLog,
        GetErrorLog: GetErrorLog,
        GetDebugLog: GetDebugLog
    }
});