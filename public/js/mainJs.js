const socket = io('http://localhost:8003');

$(document).ready(() => $('#loginModal').modal('show'));

const login = () => {
    socket.emit("userRecord", { playerName: $("#name-input").val() })
}

const sendMessage = () => {
    socket.emit('chat', { message: $("#sendMessageText").val() })
    $("#sendMessageText").val("");
}

const changeUserList = (userList) => {
    $('#userList').html("");
    userList.forEach((user, i) => {
        $('#userList').append(
            `<li>
                &bull; ${user.name}
            </li>`
        );
    })
}

socket.on('mainInfo', (data) => changeUserList(data.users))

socket.on('chat', data => {
    $("#publicChat").append(`<li>${data.playerName} : <font color="gray">${data.message}</font></li>`)
})

socket.on('userRecord', data => {
    if (data.status) {
        $('#loginModal').modal('hide');
        $(".informationBox").html("");
        $(".mainArea").removeAttr("hidden");
    } else {
        $("#name-input").val("");
        $(".informationBox").html(data.info)
    }
})