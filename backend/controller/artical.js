var express = require("express");
var router = express.Router();
var dbConn = require("../MysqlDB/mysql");
var path = require("path");
var multer = require("multer");
const queries = require('../promises/queries');
const { resolve } = require("path");

var Storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({
  storage: Storage,
}).single("file");


router.post('/addartical',upload,(req, res) => {
  const postData = req;
  try {
  queries.addartical(postData).then((data) => {
  res.json({ status: 'success' });
  });
  } catch (err) {
  res.json(err);
  }
  });


  router.get('/articals', (req, res) => {
    try{
      queries.articals().then(data=>{
      res.json(data);
    })
    } catch(err){
      next(err)
    }
    });


router.post("/update/:id", upload, async(req, res) => {
  let id = req.params.id;
  let Image = req.file.filename;
  let ImageDesc = req.body.ImageDesc;

  var form_data = {
    Image: Image,
    ImageDesc: ImageDesc,
  };
  try {
    var updatedata = await dbConn.query(
      "UPDATE articals SET ? WHERE id = " + id,
      form_data
    );
    if (updatedata) {
      res.json({
        status: "200",
        data: 'updated successfully',
      });
    }
  } catch (ex) {
    console.error(ex);
  }
});

    
module.exports = router;
