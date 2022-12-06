var db = require('./baseDao');

class UserDAO {

    constructor(name, description, releaseDate, ticketPrice, country, genre, photo) {
        this.name = name;
        this.description = description;
        this.releaseDate = releaseDate;
        this.ticketPrice = ticketPrice;
        this.country = country;
        this.genre = genre;
        this.photo = photo;
    }

    CreateMovieSQL(callback) {
        let params = (`'${this.name}','${this.description}','${this.releaseDate}','${this.ticketPrice}',
                       '${this.country}','${this.genre}','${this.photo}','${null}'`);
        let sql = `call proc_movies_create(${params})`;
        db.Query(sql, function (err, ret) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, ret);
            }
        });
    }

    static ListMovieSQL(obj, callback) {
        let params = (`'${null}'`)
        let sql = `call proc_get_movie(${params})`
        db.Query(sql, function (err, ret) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, ret);
            }
        });
    }
}

module.exports = UserDAO;