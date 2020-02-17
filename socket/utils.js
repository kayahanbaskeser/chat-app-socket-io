let userList = require("./mainMemory").userList

const checkUserExit = (userName) => {
    let result = { status: true, info: "Enter a Unique Nick Name ... " };
    userList.forEach(user => {
        if (user.name === userName) {
            result.status = false
        }
    })
    return result;
}

module.exports = { checkUserExit }

