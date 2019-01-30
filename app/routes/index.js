var express = require('express');
var router = express.Router();


/** FORMIDABLE */
var formidable = require('formidable');


/** FS - FILE system */
var fs = require('fs');







/* GET home page. */
router.get('/', function(req, res, next)
{
  res.render('index', { title: 'Express' });
});







router.get('/file', (req,res) =>
{

  let path = './' + req.query.path;

  if( fs.existsSync(path) )
  {

    fs.readFile(path, (err,data) =>
    {

      if( err )
      {

        console.error(err);
        
        res.status(400).json({

          error: err

        });

      }//end if
      else
      {
        
        res.status(200).end(data);

      }//end else

    });//end readFile

  }//end if
  else
  {

    res.status(404).json({

      error: 'Arquivo não encontrado'

    });//end status

  }//end else



});//END route





router.delete('/file', (req,res) =>
{

  let form = new formidable.IncomingForm({

    uploadDir: './upload',
    keepExtensions: true

  });//end formidable

  form.parse(req, (err,fields, files) =>
  {

    let path = "./" + fields.path;

    if( fs.existsSync(path) )
    {

      fs.unlink(path,  err =>
      {

        if( err )
        {

          res.status(400).json({

            err

          });//end status

        }//end if
        else
        {

          res.json({

            /** fields: fields */
            fields
      
          });//end json

        }//end else

      });//end unlink

    }//end if
    else
    {

      res.status(404).json({

        error: 'Arquivo não encontrado'

      });//end status

    }//end else

  });//end parse



});//END route





router.post('/upload', (req,res) =>
{

  let form = new formidable.IncomingForm({

    uploadDir: './upload',
    keepExtensions: true

  });//end formidable

  form.parse(req, (err,fields, files) =>
  {

    res.json({

      /** files: files */
      files

    });//end json

  });//end parse



});//END route





/** MODULO EXPORTS */
module.exports = router;
