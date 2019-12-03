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
        enum: ["DESI"]
    },  
    creditos: {
        type: String,
        required: true,
        enum: ["4", "6", "8", "16"]
    }
});

coursesSchema.statics.getCourses = function() {
    return Course.find({});
}

coursesSchema.statics.getCourse = function(couid){
    return Course.findOne({couid}); 
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
    let newCou = Course(course);
    return newCou.save()
}

let Course = mongoose.model('courses', coursesSchema);

module.exports = Course;
