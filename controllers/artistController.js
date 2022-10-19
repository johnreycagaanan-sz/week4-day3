const getArtists = (req, res, next) => {
    if (Object.keys(req.body).length){
        const {
            firstName,
            lastName,
            gender
        } = req.body;

        const filter = [];
        if (firstName) filter.push[firstName];
        if (lastName) filter.push[lastName];
        if (gender) filter.push[gender];

        for (let i = 0; i < filter.length; i++){
            console.log(`Searching song by: ${filter[i]}`)
        }

    }
    
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({ success:true, msg: 'Showing all artists'})
}

const postArtist = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({success:true, msg: 'Artist added'})
}

const deleteArtists = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({success:true, msg: 'Artists deleted'})
}

const getArtist = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({success:true, msg: `Showing artist: ${req.params.artistID}`})
}

const deleteArtist = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({success:true, msg: `Deleting artist: ${req.params.artistID}`})
}

const updateArtist = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({success:true, msg: `Updating artist: ${req.params.artistID}`})
}

module.exports = {
    getArtists,
    deleteArtists,
    postArtist,
    getArtist,
    deleteArtist,
    updateArtist
}