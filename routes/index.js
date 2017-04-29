var express = require('express');
var router = express.Router();
var fs = require('fs');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/sample.json', function(req,res,next){
  fs.readFile('model/sample.json', 'utf8', function (err, data) {
    if(err){
      console.error(err);
      res.end('500 Server Error')
    } else{
      var json_obj = JSON.stringify(data);
      res.json(json_obj);
    }

  });

});

router.get('/chat', function(req,res,next){
  res.render('chat');
})

module.exports = router;
