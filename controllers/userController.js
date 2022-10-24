const User = require('../models/User');
const getUsers = async(req, res, next) => {
    const filter = {};
    const options = {};
    if (Object.keys(req.body).length){
        const {
            userName,
            gender,
            age,
            limit,
            sortByAge
        } = req.query;

        if (userName) filter.userName = true;
        if (gender) filter.gender = true;
        if (age) filter.age = true;

        if (limit) options.limit = limit;
        if (sortByAge) options.sort = {
            age: sortByAge === 'asc' ? 1 : -1
        }

    }

    try {
        const users = await User.find({},filter,options);
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