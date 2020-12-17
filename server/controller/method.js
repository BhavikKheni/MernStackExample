const User =require('../models/model')

createUser =(req,res,next) =>{
    const body = req.body
    if(!body){
        return res.status(400).json({
            success:false,
            error:"Field is empty"
        });
    }
    const user = new User(body);
    if(!user){
        return res.status(400).json({success:false, error:"error"})
    }
    user.save().then(()=>{
        return res.status(200).json({success:true,
        id:user.id,
        message:"Create user successfully"
    })
    })
}

getUsers = async (req, res) => {
    await User.find({}, (err, users) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!users.length) {
            return res
                .status(404)
                .json({ success: false, error: `users not found` })
        }
        return res.status(200).json({ success: true, data: users })
    }).catch(err => console.log(err))
}

deleteUser = async (req, res) => {
    await User.findOneAndDelete({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        }

        return res.status(200).json({ success: true, data: user })
    }).catch(err => console.log(err))
}
updateUser = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    User.findOne({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'User not found!',
            })
        }
        user.firstName = body.firstName,
        user.lastName = body.lastName,
        user.email = body.email,
        user.phone = body.phone,
        user
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: user._id,
                    firstName : user.firstName,
                    lastName : user.lastName,
                    email : user.email,
                    phone : user.phone,
                    message: 'User updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'User not updated!',
                })
            })
    })
}

getUserById = async (req, res) => {
    await User.findOne({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: user })
    }).catch(err => console.log(err))
}

module.exports = {
    createUser,
    getUsers,
    deleteUser,
    updateUser,
    getUserById
}