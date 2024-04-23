const sqlite = require('sqlite3').verbose();

const db = new sqlite.Database('./users.db',sqlite.OPEN_READWRITE,(err)=>{
    if(err){
        console.log(err)
    }
});

const sql = `CREATE TABLE users(id INTEGER PRIMARY KEY AUTOINCREMENT,name,email,password)`
db.run(sql)