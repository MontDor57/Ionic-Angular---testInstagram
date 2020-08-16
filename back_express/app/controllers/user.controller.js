const User = require("../models/user.model.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
        message: "Ne peut pas être vide"
    });
}

    const user = new User({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        birthDate : req.body.birthDate,
        city : req.body.city,
        country : req.body.country,
        picture : req.body.picture,
        createdAt : req.body.createdAt
    });

    User.create(user, (err, data) => {
        if (err)
            res.status(500).send({
            message:
            err.message || "Error"
        });
        else res.send(data);
    });
};
exports.findAll = (req, res) => {
    User.getAll((err, data) => {
        if (err)
            res.status(500).send({
            message:
                err.message || "Error"
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    User.findById(req.params.userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                message: `Pas d'utilisateur avec id : ${req.params.userId}.`
            });
            } else {
                res.status(500).send({
                message: "Error " + req.params.userId
            });
            }
        } else res.send(data);
    });
};

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
        message: "Ne peut être vide"
    });
}

    User.updateById(
        req.params.userId,
        new User(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                    message: `pas d'utilisateur avec id : ${req.params.userId}.`
                });
            } else {
                res.status(500).send({
                message: "Error " + req.params.userId
            });
        }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    User.remove(req.params.userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                message: `pas d'utilisateur avec id:  ${req.params.userId}.`
            });
        } else {
            res.status(500).send({
                message: "ne peut supprimer" + req.params.userId
            });
        }
        } else res.send({ message: `Bien supprimer` });
    });
};

exports.deleteAll = (req, res) => {
    User.removeAll((err, data) => {
        if (err)
            res.status(500).send({
            message:
                err.message || "Error lors de la suppression"
            });
        else res.send({ message: `Suppression bien effectué` });
    });
};