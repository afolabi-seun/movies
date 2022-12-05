var define = require('node-requirejs-define'),
    dbCon = require('./connectDao'),
    logger = require('../com.app.utils/logHandler').Logger;

define(function () {

    async function Query(sql, callback) {
        await dbCon.Connection((err, connection) => {
            if (err) {
                return callback(err, null);
            } else {
                if (connection) {
                    connection.query(sql, (err, results) => {
                        closeConnection(connection);
                        if (err) {
                            logger.error('Query()', err);
                            return callback(err, null);
                        } else {
                            resolveResponse(results, function (err, resp) {
                                if (err) {
                                    logger.error('resolveResponse()', err);
                                    callback(err, null);
                                } else {
                                    callback(null, resp);
                                }
                            });
                        }
                    });
                }
            }
        });
    }

    const resolveResponse = function (results, callback) {
        try {
            var data = results[0];
            switch (data) {
                case undefined:
                    const resp = { status: 'Failed', message: 'An error occured while trying to resolve database json response' };
                    callback(resp, null);
                    break;
                default:
                    var dta = results[0][0].v_responseMessage,
                        res;

                    switch (dta) {
                        case undefined:
                            res = results[0][0].responseMessage;
                            callback(null, res);
                            break;
                        default:
                            res = results[0][0].v_responseMessage;
                            callback(null, res);
                            break;
                    }
            }
        } catch (e) {
            logger.error('error received in resolveResponse()', e);
            return callback(e, null);
        }
    }

    const closeConnection = async function (conn) {
        await conn.release(function (err) {
            if (err)
                console.log('Error closing movie db connection\n', err);
            else
                console.log('movie connection closed.');
        });
    }

    return {
        Query: Query
    }
});