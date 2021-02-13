var dbConn = require("../MysqlDB/mysql");

const articals = async () => {
const promise = new Promise((resolve, reject) => {    
dbConn.query('SELECT * FROM articals', function (
    error,
    data
    ) {
    if (error) {
      reject(err);
    } else {
      resolve(data);
    }
    });
    });
    return promise;
    };
    

    const addartical = async (postData) => {
        
        const Image = postData.file.filename;
        const ImageDesc = postData.body.ImageDesc;
        
        const promise = new Promise((resolve, reject) => {
        dbConn.query(
        'INSERT INTO articals (Image,ImageDesc) VALUES ("' +
        Image +
        '","' +
        ImageDesc +
        '")',
        function (error, data) {
        if (error) {
        reject(error);
        } else {
        resolve(data);
        }
        }
        );
        });
        return promise;
        };

        


module.exports = {
    articals,addartical
    };