const io = require("../servers").io
const Player = require('../classes/player')
let userList = require("./mainMemory").userList
const { checkUserExit } = require("./utils")

io.of("/").on('connect', socket => {
    let player = new Player();
    
    socket.on('userRecord', data => {
        let checkUser = checkUserExit(data.playerName)
        if (data.playerName != "" && checkUser.status) {
            socket.emit('userRecord', { status: true, info: 'Come in ...' })
            player.name = data.playerName;
            userList.push(player);
            io.emit('mainInfo', { users: userList })
        } else {
            socket.emit('userRecord', { status: false, info: checkUser.info })
        }
    })

    socket.on("chat", (data) => io.emit("chat", 
        {   
            playerName: player.name, 
            message: data.message, 
            status: data.message!==''? true : false 
        }
    ))

    socket.on('disconnect', data => {
        userList.forEach((user, i) => {
            if (user.uuid == player.uuid) {
                userList.splice(i, 1);
            }
        })
        io.emit('mainInfo', { users: userList })
    })
})

module.exports = io