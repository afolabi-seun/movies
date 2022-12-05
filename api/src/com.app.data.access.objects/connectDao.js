var define = require('node-requirejs-define'),
    appcfg = require('../com.app.configuration/appConf.json'),
    dbcfg = require('../com.app.configuration/dbconf.json'),
    logger = require('../com.app.utils/logHandler').Logger;

const { Pool } = require('pg');

define(function () {

    const pooledConnect = function (dbConn, callback) {
        try {
            const pool = new Pool(dbConn)
            pool.connect((error, conn) => {
                if (error) {
                    callback(error, null);
                } else {
                    callback(null, conn);
                }
            });
        } catch (e) {
            logger.error('Connect()', e);
        }
    }

    /* ----------------------------------------------------------------------------------------------------------------------- */

    const useConnection = async function (callback) {
        try {
            var pooledConn;

            switch (appcfg.application.isProduction) {
                case false:
                    pooledConn = dbcfg.connections.pooled.dev.db;
                    break;
                case true:
                    pooledConn = dbcfg.connections.pooled.prod.db;
                    break;
            };

            switch (appcfg.application.isPooledConnection) {
                case true:
                    await pooledConnect(pooledConn, callback);
                    break;
            };
        } catch (e) {
            logger.error('Connect()', e);
        }
    }

    async function Connection(callback) {
        useConnection(callback);
    }

    return {
        Connection: Connection
    }
});