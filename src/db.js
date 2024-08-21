const mysql=require('mysql2/promise');

const mysqlpool=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'Prasadiot@123',
    database:'students'

})
module.exports={
    mysqlpool
}