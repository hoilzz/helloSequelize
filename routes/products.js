/**
 * Created by tender_rock on 2017. 4. 5..
 */
var express = require('express');
var router  = express.Router();


router.get('/', function(req, res){
    res.render('product', {
        title: 'Product Page'
    })
});

router.get('/insert', function(req, res){
    res.render('product/insert', {
        title: 'insert Page'
    })
});

router.get('/edit', function (req,res) {
    res.render('product/edit', {
        title: 'edit page'
    })
});

module.exports = router;