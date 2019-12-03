const {mongoose} = require('./mongodb-connect')
const Config = require ('./Config')

let userSchema = mongoose.Schema({
    uid:{
        type: Number,
        required: true,
        unique: true
    },
    nombre: {
        type:String,
        required:true
    },
    correo: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    tipo:{
        type: String,
        required: true,
        enum: ["ADMIN", "PROF", "ALUMN"]
    },
    favProfesores:[{
        type: Number,
        required: true
    }],
    favCursos:[{
        type: Number,
        required: true
    }],
    idRelacion:[{
        type: Number,
        required: true
    }]
});

userSchema.statics.getUsers = function() {
    return User.find({});
}

userSchema.statics.getUser = function(correo){
    return User.findOne({correo}); 
}

userSchema.statics.createUser = async function(usr){
    let uid = await Config.getNextUserId();
    console.log("create usr", uid);
    usr.uid = uid;
    let newUser = User(usr);
    return newUser.save()
}

userSchema.statics.updateUser = function(correo, datos){
    return User.findOneAndUpdate(
                {correo},
                {$set:datos},
                {new: true}
                );
}

let User = mongoose.model('users', userSchema);

module.exports = User;
