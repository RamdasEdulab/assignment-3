var express = require('express');
var router = express.Router();
var dbConn  = require('../MysqlDB/mysql');
var path = require('path');
var multer = require('multer');

var Storage= multer.diskStorage({
    destination:"./public/uploads/",
    filename:(req,file,cb)=>{
      cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
     }
  });
  
  var upload = multer({
    storage:Storage
  }).single('file');


router.post('/add',upload, function(req, res) {    
console.log(req.body)

    let Image = req.file.filename;
    let ImageDesc = req.body.ImageDesc;
    let errors = false;

    if(!errors) {

        var form_data = {
       
            Image: Image,
            ImageDesc: ImageDesc
        }
        
        dbConn.query('INSERT INTO articals SET ?', form_data, function(err, result) {
            
            if (err) {
                console.log(err)
                 
                return res.status(400).json({
                    message:'bad request'                   
                })
            } else {                
                res.json({
                    status:200,
                    data:result
                }); 
                
            }
        })
    }
})


router.get('/', function(req, res) {

    dbConn.query('SELECT * FROM articals', function(err,data) {
        if(err) {
         
        return res.json(err)
       
    }else {
        res.status(200).json({
            message: "articals retrieved successfully!",
            articals: data
            })
        }
    })
})


router.post('/update/:id',upload, function(req, res) {

    let id = req.params.id;
    let Image = req.file.filename;
    let ImageDesc = req.body.ImageDesc;
    let errors = false;

    if( !errors ) {   
 
        var form_data = {
            Image: Image,
            ImageDesc: ImageDesc
        }
        
        dbConn.query('UPDATE articals SET ? WHERE id = ' + id, form_data, function(err,data) {
      
            if (err) {
                console.log(err)
                return res.status(400).json({
                 message:'bad request'   
                })
            } else {
                res.status(200).json({
                    message: "articals retrieved successfully!",
                    articals: data
                    })
            }
        })
    }
})
   


module.exports = router;
