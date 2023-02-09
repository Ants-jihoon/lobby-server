const { mysqlService, redisService } = require('../services/dbservice');

const lobbyctrl = {

    login: async (Nick) => {
        const dbuser = await mysqlService.getnick(Nick)
        try {
            if (dbuser.nickname === Nick) {
                const state = await redisService.getstate(Nick)
                if (state === "inlobby" || state === "gaming") {
                    throw new Error("정상적인 접근이 아닙니다.");
                }
                // await redisService.rename(Nick, "inlobby")
                // 로그아웃 관련된거 만들고 활성화

                return await mysqlService.getdata(Nick)
            }
        }
        catch (error) {

        }
    },




}


const storectrl = {

    buyitem: async (Nick, item) => {
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

    },

    sellitem: async () => {


    }



}

const inventoryctrl = {



}

module.exports = {
    lobbyctrl,
}
