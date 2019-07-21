var mongoose=require('mongoose');

const HomestaysSchema=mongoose.Schema({
	place: String,
	rates: String,
})

module.exports=mongoose.model('Homestays',HomestaysSchema)