var appMain = function () {
    var express = require('express'),
        path = require('path'),
        cors = require('cors'),
        logger = require('morgan'),
        compression = require('compression'),
        cookieParser = require('cookie-parser'),
        RateLimit = require('express-rate-limit'),
        swaggerUi = require('swagger-ui-express'),
        swaggerDocument = require('./swagger.json'),

        baseUrl = '/movie/api',

        routes = require('./src/com.app.service.layer/router'),
        appcfg = require('./src/com.app.configuration/appConf.json'),
        log = require('./src/com.app.utils/logHandler').Logger;

    var app = express();

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

    app.use(logger('dev'));
    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ extended: false, limit: '50mb' }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    app.use(compression());

    app.use(cors());
    app.use(baseUrl, routes);

    app.use('/api-docs',
        swaggerUi.serve,
        swaggerUi.setup(swaggerDocument)
    );

    process.on('uncaughtException', function (err) {
        log.console((new Date).toUTCString() + ' uncaughtException:', err.message)
        log.console(err.stack)
    })

    //if we are here then the specified request is not found
    app.use((req, res, next) => {
        const err = new Error(appcfg.error.notImplemented.description);
        err.status = appcfg.error.notImplemented.code;
        next(err);
    });

    //all other requests are not implemented.
    app.use((err, req, res, next) => {
        res.status(err.status || 501);
        res.json({
            error: {
                code: err.status || 501,
                message: err.message
            }
        });
    });

    var limiter = new RateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
        delayMs: 0 // disable delaying - full speed until the max limit is reached
    });

    app.use(limiter);

    // error handlers

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function (err, req, res, next) {
            res.status(err.code || 500)
                .json({
                    status: 'error',
                    message: err
                });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function (err, req, res, next) {
        res.status(err.status || 500)
            .json({
                status: 'error',
                message: err.message
            });
    });

    module.exports = app;
}

appMain();