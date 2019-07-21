var mongoose=require('mongoose');

const TripsSchema=mongoose.Schema({
	title: String,
	text: String,
})

module.exports=mongoose.model('Trips',TripsSchema)