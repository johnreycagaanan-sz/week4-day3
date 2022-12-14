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

const login = async(req, res, next) => {
    const {email, password } = req.body

    if(!email || !password) throw new Error ('Please provide an email and password')

    const user = await User.findOne({email}).select('+password')

    if(!user) throw new error ('Invalid credentials')

    const isMatch = await user.matchPassword(password);

    if(!isMatch) throw new Error('Invalid credentails')

    sendTokenResponse(user, 200, res)
}

const logout = async(req, res, next) => {
    res
        .status(200)
        .cookie('token', 'none', {
            expires: new Date(Date.now() + 10 * 1000),
            httpOnly: true
        })
        .json({success: true, msg: 'Successfully logged out'})
        
}

const forgotPassword = async(req, res, next) => {
    const user = await User.findOne({email: req.body.email})

    if(!user) throw new Error('No user found');

    const resetToken = user.getResetPasswordToken();

    try {
        await user.save({ validateBeforeSave: false })
        res
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .json({succes: true, msg: `Password has been reset with token: ${resetToken}`})
    } catch (err) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false })
        throw new Error(`Failed to save new password`)
    }
}

const resetPassword = async(req, res, next) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.query.resetToken).digest('hex');
    console.log(resetPasswordToken)
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })
    

    if(!user) throw new Error('Invalid token');

    user.password = req.body.password;
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;

    await user.save();

    sendTokenResponse(user, 200, res)
}

const updatePassword = async(req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');

    const passwordMatches = await user.matchPassword(req.body.password);

    if(!passwordMatches) throw new Error('Password is incorrect');
    user.password = req.body.newPassword

    await user.save();
    sendTokenResponse(user, 200, res)
}
module.exports = {
    getUsers,
    deleteUsers,
    postUser,
    getUser,
    deleteUser,
    updateUser,
    login,
    logout,
    forgotPassword,
    resetPassword,
    updatePassword
}