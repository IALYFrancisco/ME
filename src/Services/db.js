const chalk = require("chalk")
const { connect } = require("mongoose");

function DbConnection() {
    connect(process.env.DB_URI)
        .then(()=>{ console.log(chalk.bgHex('#098702ff').hex('#fffbfc')('Database connection success.')) })
        .catch((err)=>{ console.log('Database connection error :' + err) })
}

module.exports = {
    DbConnection : DbConnection
}