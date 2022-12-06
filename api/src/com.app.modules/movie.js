var define = require('node-requirejs-define'),
    mvieDao = require('../com.app.data.access.objects/movieDao'),
    rulecfg = require('../com.app.configuration/ruleConf.json'),
    validation = require('../com.app.utils/validationHandler'),
    dispatch = require('../com.app.service.layer/dispatcher'),
    logger = require('../com.app.utils/logHandler').Logger;


define(function () {

    function GetMovie(req, res, next) {
        try {
            const validationRule = rulecfg.validation.listMovies;
            validation.Validator(req.body, validationRule, {}, (err, status) => {
                if (!status) {
                    dispatch.SendBadRequestMessage(res, err);
                    logger.error('/getUser', err);
                } else {
                    var profileId = req.body.profileId,
                        session = req.headers['apisessionkey'],
                        channel = req.body.channel;
                    var jsnReq = { profileId: profileId, session: session, channel: channel },
                        jsnDta = JSON.stringify(jsnReq);

                    logger.info('/getUserDetails', jsnDta);

                    let parm = { profileId: profileId, session: session, channel: channel, jsonData: jsnDta };
                    mvieDao.ListMovieSQL(parm, (err, data) => {
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

    function CreateMovie(req, res, next) {
        try {
            const validationRule = rulecfg.validation.movieCreation;
            validation.Validator(req.body, validationRule, {}, (err, status) => {
                if (!status) {
                    dispatch.SendBadRequestMessage(res, err);
                    logger.error('/createUser', err);
                } else {
                    var name = req.body.name,
                        description = req.body.description,
                        releaseDate = req.body.releaseDate,
                        ticketPrice = req.body.ticketPrice,
                        country = req.body.countryId,
                        genre = req.body.genre,
                        photo = req.body.photo,
                        jsnReq = { name: name, description: description, releaseDate: releaseDate, ticketPrice: ticketPrice, country: country, genre: genre, photo: photo },
                        jsnDta = JSON.stringify(jsnReq);

                    logger.info('/createUser', jsnDta);

                    let movie = new mvieDao(name, description, releaseDate, ticketPrice, country, genre, photo);
                    movie.CreateMovieSQL((err, data) => {
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
        GetMovie: GetMovie,
        CreateMovie: CreateMovie
    }

});