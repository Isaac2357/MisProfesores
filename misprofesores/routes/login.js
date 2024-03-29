const express = require('express');
const router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.route('/')
.post(async (req, res) => {
    let {correo, password} = req.body;
    if (correo != undefined && password != undefined) {
        let doc = await User.getUser(correo);

        if (doc != null) {
            if (password == doc.password) {
                let token = jwt.sign({
                    uid: doc.uid,
                    correo: correo,
                    tipo: doc.tipo
                }, 'signature', {
                    expiresIn: 60*60 //una semana
                });
                res.send({token, uid: doc.uid, tipo: doc.tipo});
            } else {
                res.status(401).send({error: "Password does not match."})
            }
        } else {
            res.status(404).send({
                error: "User not registered."
            })
        }

    } else {
        res.status(400).send({
            error: "Missing info, email and password are required."
        })
    }
})

module.exports = router;
