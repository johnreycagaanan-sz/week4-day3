const User = require('../models/User');
const getUsers = async(req, res, next) => {
    if (Object.keys(req.body).length){
        const {
            userName,
            gender,
            age
        } = req.body;

        const filter = [];
        if (userName) filter.push[userName];
        if (gender) filter.push[gender];
        if (age) filter.push[age];

        for (let i = 0; i < filter.length; i++){
            console.log(`Searching song by: ${filter[i]}`)
        }

    }

    try {
        const users = await User.find();
        res
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .json(users)
    } catch (err) {
        throw new Error(`Error retrieving users: ${err.message}`);
    }
}

const postUser = async(req, res, next) => {
    try {
        console.log(req.body)
        const user = await User.create(req.body);
        res
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .json(user)
    } catch (err) {
        throw new Error(`Error creating new user: ${err.message}`);
    }
    
}

const deleteUsers = async(req, res, next) => {
    try {
        await User.deleteMany();
        res
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .json({success:true, msg: 'Users deleted'})
    } catch (err) {
        throw new Error(`Error deleting users: ${err.message}`);
    }
}

const getUser = async(req, res, next) => {
    try {
        const user = await User.findById(req.params.userId);
        res
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .json(user)
    } catch (err) {
        throw new Error(`Error retrieving user ${req.params.userId}: ${err.message}`);
    }
    
}

const deleteUser = async(req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.userId);
        res
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .json({success:true, msg: `Deleting user with an ID of ${req.params.userId}`})
    } catch (err) {
        throw new Error(`Error deleting user ${req.params.userId}: ${err.message}`);
    }
}

const updateUser = async(req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.songId,{
            $set: req.body
        },{
            new:true
        });
        res
            .status(200)
            .setHeader('Content-Type','application/json')
            .json(user)
    } catch (err) {
        throw new Error(`Error updating user ${req.params.userId}: ${err.message}`);
    }
}

module.exports = {
    getUsers,
    deleteUsers,
    postUser,
    getUser,
    deleteUser,
    updateUser
}