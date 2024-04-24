const User = require('../models/User')

const usercreate =  async () => {
    const user = {
        firstName: "Jhonny",
        lastName: "Torres",
        email: "iham1405.jitv@gmail.com",
        password: "jhonny1234",
        phone: "122321" 
    }

    await User.create(user)

}

module.exports = usercreate