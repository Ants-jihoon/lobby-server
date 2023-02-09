const net = require('net');
const jwt = require("jsonwebtoken");
const EventEmitter = require('events');
const protobuf = require('protobufjs');
const { lobbyctrl } = require('./controller/lobby')
const dotenv = require('dotenv');
dotenv.config();

const emitter = new EventEmitter();

protobuf.load("messages.proto", (err, root) => {
    if (err) {
        throw err;
    }
    const login = root.lookupType('login');
    const customerList = root.lookupType('CustomerList');

    const server = net.createServer(function (socket) {
        console.log(socket.address().address + " connected.");



        socket.on('data', function (data) {
            try {
                console.log(data)
                const message = login.decode(data);
                const command = message.cd;
                const cl_data = message.token;


                if (command === 0) {
                    emitter.emit('login', cl_data)
                } else if (command === 1) {
                    console.log("buyitem")
                } else if (command === 2) {
                    console.log("sellitem")
                }

            } catch (err) {
                console.error(err);
            }
        });

        socket.on('close', function () {
            console.log(socket.address().address + 'client disconnted.');
        });




        emitter.on('login', async (cl_data) => {
            // const req = socket.request;
            // const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
            // console.log("새로운 클라이언트 접속", ip, socket.id, req.ip);
            try {
                const token = cl_data;
                const payload = jwt.verify(token, process.env.JWT_KEY);
                const Nick = payload.sub
                const userdata = await lobbyctrl.login(Nick)

                console.log(userdata.nickname)
                console.log(socket.address().address + 'in login method')
                const response = customerList.encode({
                    nickname: userdata.nickname,
                    level: userdata.level,
                    exp: userdata.exp,
                    cash: userdata.cash
                }).finish();
                socket.write(response);
            } catch (error) {
                throw new Error("정상적인 접근이 아닙니다.")
            }

        })
    });




    server.on('error', function (err) {
        console.log('err' + err);
    });


    server.listen(8005, function () {
        console.log('linsteing on 8005..');
    });
});