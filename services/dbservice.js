const redisClient = require('../databases/redis');
const mysqlDB = require('../databases/mysql');

const redisCli = redisClient.v4;


const mysqlService = {
    getnick: (Nick) => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT nickname FROM user WHERE nickname = ?`
            mysqlDB.query(sql, [Nick], (err, data) => {
                if (err) { console.log('error') }
                else { resolve(data[0]) }
            });
        })

    },

    getdata: (Nick) => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT nickname, exp, level, cash FROM user WHERE nickname = ?`;
            mysqlDB.query(sql, [Nick], (err, data) => {
                if (err) { console.log('error') }
                else { resolve(data[0]); }
            })
        })

    }


}

const redisService = {

    getstate: (Nick) => {
        return new Promise((resolve, reject) => {
            redisCli.get(Nick, (err, value) => {
                resolve(value)
            });
        })
    },

    setstate: (Nick) => {
        redisCli.set(Nick, 'inlobby')
    }

}

module.exports = {
    mysqlService,
    redisService,
}