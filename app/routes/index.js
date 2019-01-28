var express = require('express');
var router = express.Router();


/** FORMIDABLE */
var formidable = require('formidable');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});




router.post('/upload', (req,res) =>
{

  let form = new formidable.IncomingForm({

    uploadDir: './upload',
    keepExtensions: true

  })//end formidable.IncomingForm

  form.parse(req, (err,fields, files) =>
  {

    res.json({

      /** files: files */
      files

    });//end res.json


  });//end form.parse

  




});//END route





/** MODULO EXPORTS */
module.exports = router;
