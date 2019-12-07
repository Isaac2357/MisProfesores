const {mongoose} = require('./mongodb-connect')
const Config = require ('./Config')

let coursesSchema = mongoose.Schema({
    couid:{
        type: Number,
        required: true,
        unique: true
    },
    nombre: {
        type:String,
        required: true,
        unique: true
    },
    departamento: {
        type: String,
        required: true,
        enum: ["DESI", "DEL", "DFH", "EAM", "MAF", "PTI", "PES", "HDU"]
    },  
    creditos: {
        type: String,
        required: true,
        enum: ["4", "6", "8", "16"]
    },
    estatus: {
        type: Boolean,
        required: true
    }
});

coursesSchema.statics.getCourses = function() {
    return Course.find({});
}

coursesSchema.statics.getCourse = function(couid){
    return Course.findOne({couid}, {
        _id: 0,
        couid: 1,
        nombre: 1,
        departamento: 1,
        creditos: 1,
        estatus: 1
    }); 
}

coursesSchema.statics.updateCourse = function(couid, datos){
    return Course.findOneAndUpdate(
                {couid},
                {$set:datos},
                {new: true}
                );
}

coursesSchema.statics.createCourse = async function(course){
    let couid = await Config.getNextCourseId()
    course.couid = couid;
    course.estatus = true;
    let newCou = Course(course);
    return newCou.save()
}

let Course = mongoose.model('courses', coursesSchema);

module.exports = Course;
