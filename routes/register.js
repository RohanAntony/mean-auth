var router = require('express').Router();
var MongoClient = require('mongodb').MongoClient;
var crypto = require('crypto');

router.get('/',function(req,res){
  res.render('register');
})

router.post('/',function(req,res){
  if(!req.body.username || !req.body.password || !req.body.confirmPassword)
    res.send('Form not completely filled');
  else if(req.body.password != req.body.confirmPassword)
    res.send('Passwords do not match');
  else{
    MongoClient.connect('mongodb://localhost/test',function(err,db){
      if(err)
        throw err;
      db.collection('authentication').findOne({username:req.body.username},function(err,result){
        if(err)
          throw err;
        console.log(result);
        if(!result){
          var saveObject = {};
          var salt = crypto.createHash('sha224').update(req.body.username.toString()).digest('hex');
          crypto.pbkdf2(req.body.password,salt,10000,256,'sha256',function(err,hash){
            if(err)
              throw err;
            saveObject.salt = salt;
            saveObject.hash = hash.toString('hex');
            saveObject.username = req.body.username;
            console.log(saveObject);
            db.collection('authentication').insert(saveObject,function(err,saved){
              if(err)
                throw err;
              delete req.body.password;
              delete req.body.confirmPassword;
              console.log(saved.insertedIds[0]);
              console.log(req.body);
              //pass this id to the developer and
              //let him define his database design on top of this
              res.redirect('/');
              db.close();
            })
          })
        }else {
          //send this as error message to the developer callback
          res.send('Username already taken');
          db.close();
        }
      })
    })
  }
})

module.exports = router;
