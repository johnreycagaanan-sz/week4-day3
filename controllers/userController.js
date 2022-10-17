const getUsers = (req, res, next) => {
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

    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({ success:true, msg: 'Showing all Users'})
}

const postUser = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({success:true, msg: 'User added'})
}

const deleteUsers = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({success:true, msg: 'Users deleted'})
}

const getUser = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({success:true, msg: `Showing user with an ID of ${req.params.userId}`})
}

const deleteUser = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({success:true, msg: `Deleting user with an ID of ${req.params.userId}`})
}

const updateUser = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({success:true, msg: `Updating user with an ID of ${req.params.userId}`})
}

module.exports = {
    getUsers,
    deleteUsers,
    postUser,
    getUser,
    deleteUser,
    updateUser
}