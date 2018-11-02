var mongoose=require('mongoose');

const NotesSchema=mongoose.Schema({
	title: String,
	text: String,
	createdDate:{
		type:Date,
		default:Date.now
	}
})

module.exports=mongoose.model('Notes',NotesSchema)