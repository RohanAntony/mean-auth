var router = require('express').Router();
var MongoClient = require('mongodb').MongoClient;
var crypto = require('crypto');

router.get('/register',function(req,res){
  res.render('register');
})

router.post('/register',function(req,res){
  if(!req.body.username || !req.body.password || !req.body.confirmPassword)
    res.send('Form not completely filled');
  else if(req.body.password != req.body.confirmPassword)
    res.send('Passwords do not match');
    //perform a check if username is already taken here
  else{
    var saveObject = {};
    var salt = crypto.createHash('md5').update(req.body.username).digest('hex');
    crypto.pbkdf2(req.body.password,salt,10000,100,'sha224',function(err,hash){
      if(err)
        throw err;
      saveObject.salt = salt;
      saveObject.hash = hash.toString('hex');
      saveObject.username = req.body.username;
      console.log(saveObject);
      MongoClient.connect('mongodb://localhost/test',function(err,db){
        if(err)
          throw err;
        db.collection('authentication').insert(saveObject,function(err,saved){
          if(err)
            throw err;
          delete req.body.password;
          delete req.body.confirmPassword;
          console.log(saved.insertedIds[0]);
          console.log(req.body);
          //pass this id to the developer and
          //let him define his database design on top of this
        })
      });
    })
    res.redirect('/');
  }
})

module.exports = router;
