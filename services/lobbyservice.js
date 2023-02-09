const mysqlDB = require("../app")
const redisCli = require('../app')

const authService = {

    // checkValid: () => {

    // },

    emailValid: async (ID) => {

        const active = redisCli.get(ID);
        if (active === "inlobby")
            return true;
    },

}

const storeService = {

    buyitem: async () => {
        console.log("연결성공")
        // const ID = "wlgnstls0413@naver.com"
        // const check = service.emailValid(ID);
        // if (check) {
        //     //아이템 가격조회
        //     const price = mysqlDB.query(`SELECT itemprice FROM ITEM WHERE itemname = ${itemcode}`)//sql문 작성....
        //     //회원 cash조회
        //     const cash = mysqlDB.query(`SELECT cash FROM USER WHERE email = ${ID}`)
        //     //회원의 cash에서 아이템 가격 빼기
        //     if (price > cash) {
        //         return "캐시가 부족합니다."
        //     }
        //     cash -= price
        //     console.log(cash)
        //     mysqlDB.query(`UPDATE USER SET cash = ${cash} `)
        //     //회원의 inventory에 아이템 추가


        // }

    }
}

exports.module = {
    authService,
    storeService
}