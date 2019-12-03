let {mongoose} = require('./mongodb-connect')

let configSchema = mongoose.Schema({
    u_last_id:{
        type:Number,
        required: true
    },
    com_last_id:{
        type:Number,
        required: true
    },
    cou_last_id:{
        type:Number,
        required: true
    },
    p_last_id:{
        type:Number,
        required: true
    },
    r_last_id:{
        type:Number,
        required: true
    }
})

configSchema.statics.obtenerConfig = function(){
    return Config.findOne({});
}

configSchema.statics.getNextUserId = async function(){
    let datos = await Config.findOne({});
    console.log(datos);
    if(datos == undefined){
        generateInitialConf();
    }

    await Config.findOneAndUpdate(
        {_id:datos._id},
        {$set:{u_last_id:datos.u_last_id + 1}},
        {new: true}
        );

    return datos.u_last_id + 1
}

configSchema.statics.getNextCommentId = async function(){
    let datos = await Config.findOne({});
    console.log(datos);
    if(datos == undefined){
        generateInitialConf();
    }

    await Config.findOneAndUpdate(
        {_id:datos._id},
        {$set:{com_last_id: datos.com_last_id + 1}},
        {new: true}
        );

    return datos.com_last_id + 1
}

configSchema.statics.getNextCourseId = async function(){
    let datos = await Config.findOne({});
    console.log(datos);
    if(datos == undefined){
        generateInitialConf();
    }

    await Config.findOneAndUpdate(
        {_id:datos._id},
        {$set:{cou_last_id: datos.cou_last_id + 1}},
        {new: true}
        );

    return datos.cou_last_id + 1
}

configSchema.statics.getNextProfessorId = async function(){
    let datos = await Config.findOne({});
    console.log(datos);
    if(datos == undefined){
        generateInitialConf();
    }

    await Config.findOneAndUpdate(
        {_id: datos._id},
        {$set:{p_last_id: datos.p_last_id + 1}},
        {new: true}
        );

    return datos.p_last_id + 1
}

configSchema.statics.getNextRelationId = async function(){
    let datos = await Config.findOne({});
    console.log(datos);
    if(datos == undefined){
        generateInitialConf();
    }

    await Config.findOneAndUpdate(
        {_id: datos._id},
        {$set:{r_last_id: datos.r_last_id + 1}},
        {new: true}
        );

    return datos.r_last_id + 1
}

async function generateInitialConf() {
    let conf = {
        u_last_id:0,
        com_last_id:0,
        cou_last_id:0,
        p_last_id:0,
        r_last_id:0
    }
    let newConfig = new Config(conf);
    await newConfig.save()
}

let Config = mongoose.model('configs',configSchema);

module.exports = Config;