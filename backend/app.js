var express = require('express'),
 mysql = require('./MysqlDB/mysql'),
cors = require('cors'),
bodyParser = require('body-parser'),
 


  Articals = require('./controller/artical')

 app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());



 app.use('/api', Articals)


const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})



