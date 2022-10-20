const Song = require('../models/Song');
const getSongs = async(req, res, next) => {
    if (Object.keys(req.body).length){
        const {
            songTitle,
            artist,
            genre
        } = req.body;

        const filter = [];
        if (songTitle) filter.push[songTitle];
        if (artist) filter.push[artist];
        if (genre) filter.push[genre];

        for (let i = 0; i < filter.length; i++){
            console.log(`Searching song by: ${filter[i]}`)
        }

    }
    try {
        const songs = await Song.find();
        res
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .json(songs)
    } catch (err) {
        throw new Error(`Error retrieving songs: ${err.message}`)
    }
    
}

const postSong = async(req, res, next) => {
    try {
        const song = await Song.create(req.body);
        res
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .json(song)
    } catch (err) {
        throw new Error(`Error adding new song: ${err.message}`)
    }
    
}

const deleteSongs = async(req, res, next) => {
    try {
        await Song.deleteMany();
        res
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .json({success:true, msg: 'Songs deleted'})
    } catch (err) {
        throw new Error(`Error deleting all songs: ${err.message}`)
    }
    
}

const getSong = async(req, res, next) => {
    try {
        const song = await Song.findById(req.params.songId);
        res
                .status(200)
                .setHeader('Content-Type', 'application/json')
                .json(song)
    } catch (err) {
        throw new Error(`Error retrieving song ${req.params.songId}: ${err.message}`)
    }
    
}

const deleteSong = async(req, res, next) => {
    try {
        await Song.findByIdAndDelete(req.params.songId);
        res
                .status(200)
                .setHeader('Content-Type', 'application/json')
                .json({success:true, msg: `Deleting song with an ID of ${req.params.songId}`})
    } catch (err) {
        throw new Error(`Error deleting song ${req.params.songId}: ${err.message}`)
    }
    
}

const updateSong = async(req, res, next) => {
    try {
        const song = await Song.findByIdAndUpdate(req.params.songId,{
            $set : req.body
        },{
            new:true
        });
        res
                .status(200)
                .setHeader('Content-Type', 'application/json')
                .json(song)
    } catch (err) {
        throw new Error(`Error updating song ${req.params.songId} : ${err.message}`)
    }
    
}

module.exports = {
    getSongs,
    deleteSongs,
    postSong,
    getSong,
    deleteSong,
    updateSong
}