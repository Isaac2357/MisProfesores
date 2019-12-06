const express = require('express');
const router = express.Router();
const User = require('../models/User');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken')
const fields = ["password"];

router.route('/validate/:email')
.get( async (req, res) => {
    let correo = req.params.email;
    if (correo != undefined) {
        try {
            let usr = await User.getUser(correo);
            if (usr != null) {
                res.send({valid: true});
            } else {
                res.status(406);
                res.statusMessage = "User doesn't exist in the database.";
                res.send({error:"User doesn't exist in the database."});
            }
        } catch (error) {
            console.log(error);
            res.status(500);
            res.statusMessage = "Internal server error";
            res.send({error: "Internal server error"});
        }
    } else {
        res.status(406);
        res.statusMessage = "Missing params."
        res.send({error: "Missing params."});
    }
});

router.route('/update/:email')
.put(async (req, res) => {
    let correo = req.params.email;
    let data = req.body;
    if (correo != undefined) {
        try {
            let usr = await User.getUser(correo);
            if (usr != null) {
                if (data != null && data.password != undefined && isValidPasswordUpdate(data)) {
                    let update = await User.findOneAndUpdate({correo}, {password: data.password})
                    if (update) {
                        res.status(200);
                        res.statusMessage = "Password successfully changed.";
                        res.send({status:"Password successfully changed."});
                    } else {
                        res.status(500);
                        res.statusMessage = "Internal server error";
                        res.send({error: "Internal server error"});
                    }
                } else {
                    res.status(406);
                    res.statusMessage = "Invalid payload.";
                    res.send({error:"Invalid payload."});
                }
            } else {
                res.status(406);
                res.statusMessage = "User doesn't exist in the database.";
                res.send({error:"User doesn't exist in the database."});
            }
        } catch (error) {
            console.log(error);
            res.status(500);
            res.statusMessage = "Internal server error";
            res.send({error: "Internal server error"});
        }
    } else {
        res.status(406);
        res.statusMessage = "Missing params."
        res.send({error: "Missing params."});
    }
});

router.route('/sendemail')
.post(async (req, res) => {
    let {correo, code} = req.body;
    if(correo == undefined || code == undefined) {
        res.status(500).send({error: "Missing info."})
        return;
    }
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'isaaccabrera31@gmail.com',
          pass: 'cabrera2357'
        }
      });
      
      let mailOptions = {
        from: 'isaaccabrera31@gmail.com',
        to: `${correo}`,
        subject: 'Restore your password',
        text: `Code: ${code}`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          res.status(500).send({error: "Internal server error"})
        } else {
          console.log('Email sent: ' + info.response);
          res.status(200).send({status: "Email sent"})
        }
      });
});

router.route("/token/:email")
.get(async (req, res) => {
    let correo = req.params.email;
    if (correo != undefined) {
        let token = jwt.sign({
                        correo
                    }, 'signature', {
                        expiresIn: 60*60 //una hr
                    });
        res.send({token})
            
    } else {
        res.status(500).send({
            error: "Internal error."
        })
    }
})
.post(async (req, res) => {
    let token = req.body.token;
    let correo = req.params.email;
    console.log(token);
    if (token == undefined) {
        res.status(403).send({
            error: "Missing token."
        })
        return;
    }

    jwt.verify(token, 'signature', function (err, decoded) {
        if (decoded) {
            if (correo == decoded.correo) {
                res.send({status: true})
            } else {
                res.status(403).send({
                    error: "Not authorized."
                });
            }
            return;
        }
        if (err) {
            console.log("Error", err);
        }

        res.status(403).send({
            error: "Not authorized."
        });

    });
});


function isValidPasswordUpdate(data) {
    if (data != null) {
        let validFields = 0;
        for (let key in data) {
            if (!fields.includes(key)) {
                return false;
            } else {
                validFields++;
            }
        }
        return validFields == fields.length
    }
    return false;
}


module.exports = router