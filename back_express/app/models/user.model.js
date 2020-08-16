const sql = require("./db.js");

const User = function(user) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.birthDate = user.birthDate;
    this.city = user.city;
    this.country = user.country;
    this.picture = user.picture;
    this.createdAt = user.createdAt;
};

User.create = (newUser, result) => {
    sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Utilisateur crée : ", { id: res.insertId, ...newUser });
        result(null, { id: res.insertId, ...newUser });
    });
};

User.findById = (userId, result) => {
    sql.query(`SELECT * FROM user WHERE id = ${userId}`, (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
        }

        if (res.length) {
        console.log("found user: ", res[0]);
        result(null, res[0]);
        return;
        }

        result({ kind: "not_found" }, null);
    });
};

User.getAll = result => {
    sql.query("SELECT * FROM user", (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
        }

        console.log("User : ", res);
        result(null, res);
    });
};

User.updateById = (id, user, result) => {
    sql.query(
        "UPDATE user SET firstName = ?, lastName = ?, email = ?, birthDate = ?, city = ?, country = ?, picture = ? WHERE id = ?",
        [user.firstName, user.lastName, user.email, user.birthDate, user.city, user.country, user.picture, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }

        console.log("Utilisateur modifié: ", { id: id, ...user });
        result(null, { id: id, ...user });
        }
    );
};

User.remove = (id, result) => {
    sql.query("DELETE FROM user WHERE id = ?", id, (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
        }

        if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
        }

        console.log("L'utilisateur supprimé est : ", id);
        result(null, res);
    });
};

User.removeAll = result => {
    sql.query("DELETE FROM user", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} user`);
        result(null, res);
    });
};

module.exports = User;