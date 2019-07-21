var express = require('express');
var router = express.Router();
var alert=require('alert-node');



var Users=require('../modules/users');
var Notes=require('../modules/notes');
var Trips=require('../modules/trips');
var Homestays=require('../modules/homestays');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'GHUMFIR' });
});

router.get('/homePg', function(req, res, next) {
    res.render('homePg');
  });

router.get('/addNote', function(req, res, next) {
  res.render('addNote');
});

router.post('/addNote',function(req,res){
    	console.log('req.....', req.body);
    	var note=new Notes({
                        	title:req.body.title,
                        	text:req.body.text
                            });

        var promise=note.save()
        promise.then((note) => {
            Notes.find().exec(function(err, notes)
                {
                //console.log('user has taken notes',note);

                res.render('viewNote', {notes})
                });
            });

});

router.get('/deletenote/:id', function(req,res){
                Notes.findOneAndRemove({_id: req.params.id},function(err,note){
                console.log('user deleted',note);
                res.redirect('/viewNote')
            });

             })

router.get('/editnote/:id', function(req, res) {
    Notes.findOne({_id: req.params.id},function(err,note){
        console.log('note',note);
                res.render('editNote',{note})

    });
});

router.post('/editnote', function(req,res){
    Notes.findOneAndUpdate({_id:req.body._id}, {$set: req.body}, (err,note) => {
        console.log('note updated......',note);
        if(!err)res.redirect('/viewNote')
    })
})


router.get('/viewNote', function(req, res, next) {
    Notes.find().exec(function(err, notes) {
        console.log('note')
        res.render('viewNote', {notes});
    })
});

router.get('/tripList', function(req, res, next) {
    Trips.find().exec(function(err, trips) {
                console.log('trip')
                res.render('tripList', {trips});
        })
});



router.get('/homeStay', function(req, res, next) {
    res.render('homeStay');
  });
  
router.post('/homeStay',function(req,res){
          console.log('req.....', req.body.place);
          var homestay=new Homestays({
                              place:req.body.place,
                              rates:req.body.rates
                              });
  
          var promise=homestay.save()
          promise.then((homestay) => {
              console.log(homestay);
              Homestays.find().exec(function(err, homestays)
                  {
                  console.log('user has taken notes',homestays);
  
                  res.render('viewHome', {homestays})
                  });
              });
              promise.catch((err) => {
                console.log(err,'err');
              });
  
});

router.get('/viewHome', function(req, res, next) {
    Homestays.find().exec(function(err, homestays) {
        console.log('homestay')
        res.render('viewHome', {homestays});
    })
});


router.get('/login',function(req,res){
	res.render('login');
})
router.post('/login',function(req,res){
	console.log('req.....', req.body);

	if(req.body.username && req.body.password) {
		Users.findOne({
			username: req.body.username,
			password:req.body.password
		},	function(err,user){
            console.log('logged in user',user);
            if(user!=null){
                res.redirect('/homePg');
            }

            else{
                alert('incorrect username/password');
            }
            

		});
	} else {
	console.log('enter username and password')
	}
});

router.get('/signup',function(req,res){
	res.render('signup');
})

router.post('/signup',function(req,res)
{
	console.log('req.....', req.body);

    var user=new Users({
	username:req.body.username,
	password:req.body.password
    });
    res.redirect('/homePg');

        var promise=user.save()
        promise.then((user) => {
        	                   console.log('user signed up with values',user);
                                });
        })



        

module.exports = router;
