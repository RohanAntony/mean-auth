var router = require('express').Router();
var MongoClient = require('mongodb').MongoClient;
var crypto = require('crypto');

router.get('/',function(req,res){
  res.render('login');
})

router.post('/',function(req,res){
  console.log(req.body);
  MongoClient.connect('mongodb://localhost/test',function(err,db){
    if(err)
      throw err;
    db.collection('authentication').findOne({username:req.body.username},function(err,result){
      if(err)
        throw err;
      if(result){
        crypto.pbkdf2(req.body.password,result.salt,10000,256,'sha256',function(err,hash){
          console.log(hash.toString('hex'));
          console.log(result.hash);
          if(hash.toString('hex') == result.hash){
            res.send('Authentication successful');
          }else{
            res.send('Username or password is wrong');
          }
        });
      }else{
        res.send('Username or password is wrong!!!');
      }
    })
  })
})

module.exports = router;
