function routerMain() {
  var express = require("express"),
    jswt = require('../com.app.utils/jwtHandler'),
    profile = require('../com.app.modules/profile'),
    movie = require('../com.app.modules/movie'),
    comment = require('../com.app.modules/comment'),
    errorlog = require('../com.app.modules/errorLog'),

    logger = require('../com.app.utils/logHandler').Logger,
    appRouter = express.Router();

  function initRouters() {

    //users...
    setUpBasendPoint('/createUser', profile.CreateUser);
    setUpBasendPoint('/authenticateUser', profile.AuthenticateUser);
    setUpSecureEndPoint('/getUser', profile.GetUser);

    //movie...
    setUpBasendPoint('/getMovie', movie.GetMovie);
    setUpBasendPoint('/createMovie', movie.CreateMovie);

    //comment...
    setUpSecureEndPoint('/getComment', comment.GetComment);
    setUpSecureEndPoint('/createComment', comment.CreateComment);

    //error logs...
    setUpBasendPoint('/getInfolog', errorlog.GetInfoLog);
    setUpBasendPoint('/getErrorlog', errorlog.GetErrorLog);
    setUpBasendPoint('/getDebuglog', errorlog.GetDebugLog);

    module.exports = appRouter;
  }

  const setUpBasendPoint = function (endpoint, action) {
    try {
      appRouter.post(endpoint, function (req, res, next) {
        jswt.ValidateChannel(req, res, next, action);
      });
    } catch (e) {
      logger.error('setUpBasendPoint', e);
    }
  }

  const setUpSecureEndPoint = function (endpoint, action) {
    try {
      appRouter.post(endpoint, function (req, res, next) {
        jswt.ValidateSession(req, res, next, action);
      });
    } catch (e) {
      logger.error('setUpSecureEndPoint', e);
    }
  }

  return {
    initRouters: initRouters
  }
};

routerMain().initRouters();