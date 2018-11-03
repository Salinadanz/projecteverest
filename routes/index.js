var express = require('express');
var router = express.Router();


var Users=require('../modules/users');
var Notes=require('../modules/notes');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'WLIT - Women Leaders in Technology' });
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

                res.render('editNote', {notes})
                });
            });

});

router.get('/deletenote/:id', function(req,res){
                Notes.findOneAndRemove({_id: req.params.id},function(err,note){
                console.log('user deleted',note);
                res.redirect('/editNote')
            });

             })

router.get('/editNote', function(req, res, next) {
    Notes.find().exec(function(err, notes) {
        res.render('editNote', {notes});
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

		});
	} else {
	console.log('entr username and password')
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

        var promise=user.save()
        promise.then((user) => {
        	                   console.log('user signed up with values',user);
                                });
        })



module.exports = router;
