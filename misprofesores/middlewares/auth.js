const jwt = require('jsonwebtoken')

function auth(req, res, next) {
    let token = req.header('x-user-token');
    console.log(token);
    if (token == undefined) {
        res.status(403).send({
            error: "Missing token."
        })
        return
    }

    jwt.verify(token, 'signature', function (err, decoded) {
        if (decoded) {
            req.correo = decoded.correo;
            req.uid = decoded.uid;
            req.tipo = decoded.tipo;
            next();
            return;
        }
        if (err) {
            console.log("Error", err);
        }

        res.status(403).send({
            error: "Not authorized."
        });

    });
}

module.exports = {auth}