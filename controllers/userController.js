const User = require("../models/User")

exports.showProfile = async(req, res)=>{
const id = req.user.id
    // return console.log(id)
    const user = await User.findOne({where:{id}})
    res.status(200).json(user)
}