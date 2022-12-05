var define = require('node-requirejs-define'),
    appcfg = require('../com.app.configuration/appConf.json');

define(function () {

    function DispatchSuccessMessage(res, status, message) {
        res.status(200).json({
            data: {
                status: status,
                message: message
            }
        });
    }

    function DispatchBadRequestMessage(res, message) {
        res.status(400).json({
            data: {
                status: appcfg.error.badRequest.code,
                message: appcfg.error.badRequest
            }
        });
    }

    function DispatchErrorMessage(res, message) {
        res.status(500).json({
            data: {
                status: 'Failed',
                code: appcfg.error.notImplemented.code,
                status: appcfg.error.notImplemented.description,
                devMsg: message
            }
        });
    }

    function SendUnAuthorizedMessage(res) {
        res.status(200).json({
            data: {
                code: appcfg.error.forbidden.code,
                status: appcfg.error.forbidden.description,
                message: appcfg.error.forbidden.message
            }
        });
    }

    function SendUnAuthorizedUiKeyMessage(res) {
        res.status(200).json({
            data: {
                code: appcfg.error.forbiddenUiKey.code,
                status: appcfg.error.forbiddenUiKey.description,
                message: appcfg.error.forbiddenUiKey.message
            }
        });
    }

    function SendBadRequestMessage(res, err) {
        res.status(200).json({
            data: {
                status: 'Failed',
                code: appcfg.error.badRequest.code,
                message: appcfg.error.badRequest.description,
                devMsg: err
            }
        });
    }

    function SendDataBaseErrorMessage(res, err) {
        res.status(200).json({
            data: {
                status: 'Failed',
                code: appcfg.error.dataBaseError.code,
                message: appcfg.error.dataBaseError.description,
                devMsg: err
            }
        });
    }

    function SendGenricMessage(res, data) {
        res.status(200).json({
            data
        });
    }

    function SendNotFoundErrorMessage(res, err) {
        res.status(400).json({
            data: {
                status: 'Failed',
                code: appcfg.error.notFound.code,
                message: appcfg.error.notFound.description,
                devMsg: err
            }
        });
    }

    return {
        DispatchSuccessMessage: DispatchSuccessMessage,
        DispatchErrorMessage: DispatchErrorMessage,
        SendUnAuthorizedMessage: SendUnAuthorizedMessage,
        SendUnAuthorizedUiKeyMessage: SendUnAuthorizedUiKeyMessage,
        SendBadRequestMessage: SendBadRequestMessage,
        SendDataBaseErrorMessage: SendDataBaseErrorMessage,
        SendGenricMessage: SendGenricMessage,
        SendNotFoundErrorMessage: SendNotFoundErrorMessage,
        DispatchBadRequestMessage: DispatchBadRequestMessage
    }
});