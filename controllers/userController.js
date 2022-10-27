const User = require('../models/User');
const crypto = require('crypto');
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

const login = async(req, res, next) => {
    const {email, password } = req.body

    if(!email || !password) throw new Error ('Please provide an email and password')

    const user = await User.findOne({email}).select('+password')

    if(!user) throw new error ('Invalid credentials')

    const isMatch = await await user.matchPassword(password);

    if(!isMatch) throw new Error('Invalid credentails')

    sendTokenResponse(user, 200, res)
}
const postUser = async(req, res, next) => {
    try {
        const user = await User.create(req.body);
        sendTokenResponse(user, 201, res)
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

const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
    const options = {
        expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    }

    if(process.env.NODE_ENV === 'production')  {
        options.secure = true
    }
    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({success: true, token})
}

module.exports = {
    getUsers,
    deleteUsers,
    postUser,
    getUser,
    deleteUser,
    updateUser,
    login
}