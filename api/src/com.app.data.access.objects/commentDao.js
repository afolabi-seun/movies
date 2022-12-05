var db = require('./baseDao');

class CommentDAO {

    constructor(name, comment) {
        this.name = name;
        this.comment = comment;
    }

    CreateCommentSQL(callback) {
        let params = (`'${this.name}','${this.comment}'`);
        let sql = `call proc_comment_create(${params})`;
        db.Query(sql, function (err, ret) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, ret);
            }
        });
    }

    static ListCommentSQL(obj, callback) {
        let params = (`'${obj.userId}','${obj.session}'`)
        let sql = `call proc_get_comment(${params})`
        db.Query(sql, function (err, ret) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, ret);
            }
        });
    }
}

module.exports = CommentDAO;