const Artist = require('../models/Artist');

const getArtists = async(req, res, next) => {
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
    try {
        const artists = await Artist.find();
        res
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .json(artists)
    } catch (err) {
        throw new Error(`Error retrieving artists: ${err.message}`);
    }
}

const postArtist = async(req, res, next) => {
    try {
        const artist = await Artist.create(req.body);
        res
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .json(artist)
    } catch (err) {
        throw new Error(`Error creating artist: ${err.message}`);
    }
    
}

const deleteArtists = async (req, res, next) => {
    try {
        await Artist.deleteMany();
        res
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .json({success:true, msg: 'Artists deleted'})
    } catch (err) {
        throw new Error(`Error deleting artists: ${err.message}`);
    }
   
}

const getArtist = async(req, res, next) => {
    try {
        const artist = await Artist.findById(req.params.artistID);
        res
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .json(artist)
    } catch (err) {
        throw new Error(`Error retrieving artist ${req.params.artistID}: ${err.message}`);
    }
    
}

const deleteArtist = async(req, res, next) => {
    try {
        await Artist.findByIdAndDelete(req.params.artistID);
        res
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .json({success:true, msg: `Deleting artist: ${req.params.artistID}`})
    } catch (err) {
        throw new Error(`Error deleting artist ${req.params.artistID}: ${err.message}`);
    }
    
}

const updateArtist = async(req, res, next) => {
    try {
        const artist = await Artist.findByIdAndUpdate(req.params.artistID,{
            $set: req.body
        },{
            new: true
        });
        res
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .json(artist)
    } catch (err) {
        throw new Error(`Error updating artist ${req.params.artistID}: ${err.message}`)
    }
    
}

module.exports = {
    getArtists,
    deleteArtists,
    postArtist,
    getArtist,
    deleteArtist,
    updateArtist
}