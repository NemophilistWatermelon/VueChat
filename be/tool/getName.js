const mysql = require("../router/model/mysql");

function getName(tableName, uid, callback) {
    var select = `select  name from ${tableName} where uid=${uid}`;
    if (uid !== "") {
        mysql.query(select, (err, data) => {
            if (err) {
                throw err;
            } else {
                callback(data[0].name)
            }
        })
    }

}

function del(tableName, attr,values, callback) {;
    var del = `delete from ${tableName} where ${attr} = ${values}`;
    var select = `select  ${attr} from ${tableName} where  ${attr} = ${values}  `;
    if (values != undefined) {
        new Promise(reject => {
            mysql.query(select, (err, data) => {
                if (err) {
                    callback(err);
                } else {
                    if (data[0].length != 0) {
                        mysql.query(del, (err, data) => {
                            if (err) callback(err);
                            
                        })
                    }
                }
            })
        }, resolve => {
                console.log(resolve)
        }).then(rel => {
            callback(rel);
        });
        
    }
 }
function altName(tableName, attr, values, uid, fid, callback) {
    var update = `update  ${tableName} set  ${attr} = '${values}' where uid = ${uid} and mid = ${fid}`
    new Promise(reject => {
        mysql.query(update, (err, data) => {
            if (err) {吧
                callback(err);
            } 
        })
    }).then(reject => {
        callback("修改成功");
    })
}

var obj = { getName, del, altName }

module.exports = obj;
