const Song = require('../models/Song');
const getSongs = async(req, res, next) => {
        const options = {};
        const filter = {};
    if (Object.keys(req.body).length){
        const {
            songTitle,
            artist,
            genre,
            limit,
            sortByArtist
        } = req.query;

        if (songTitle) filter.songTitle = true;
        if (artist) filter.artist = true;
        if (genre) filter.genre = true;

        if (limit) options.limit = limit;
        if (sortByArtist) options.sort = {
            artist: sortByArtist === 'asc' ? 1: -1
        }

    }
    try {
        const songs = await Song.find({}, filter, options);
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

const getSongRatings = async (req, res, next) => {
    try {
        const song = await Song.findById(req.params.songId);
        ratings = song.ratings;

        res
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .json(ratings)

    } catch (err) {
        throw new Error(`Error retrieving song ratings: ${err.message}`)
    }
}

const postSongRating = async (req, res, next) => {
    try {
        const song = await Song.findById(req.params.songId);
        song.ratings.push(req.body);
        const result = await song.save();

        res
            .status(201)
            .setHeader('Content-Type', 'application/json')
            .json(result)
    } catch (err) {
        throw new Error(`Error retrieving song ratings: ${err.message}`)
    }
}

const deleteSongRatings = async (req, res, next) => {
    try {
        const song = await Song.findById(req.params.songId);
        song.ratings = [];

        await song.save();

        res
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .json(`Ratings for song with id ${req.params.songId} deleted`)
    } catch (err) {
        throw new Error(`Error retrieving song ratings: ${err.message}`)
    }
}

const getSongRating = async (req, res, next) => {
    try {
        console.log(req.params)
        const song = await Song.findById(req.params.songId)
        // console.log(song)
        let rating = song.ratings.find(rating => (rating._id).equals(req.params.ratingId));

        if(!rating){
            rating = {success: false, msg: `No rating found with the id: ${req.params.ratingId}`}
        }

        res
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .json(rating)

    } catch (err) {
        throw new Error (`Error retrieving song rating: ${err.message}`)
    }
}

const updateSongRating = async (req, res, next) => {
    try {
        const song = await Song.findById(req.params.songId);
        console.log(song.ratings);
        let rating = song.ratings.find(rating => (rating._id).equals(req.params.ratingId));
        if(rating){
            const ratingIndex = song.ratings.indexOf(rating);
            song.ratings.splice(ratingIndex, 1, req.body);
            rating = song.ratings[ratingIndex];
            await song.save();
        }
        else{
            rating = {success:false, msg:`No rating found with the id: ${req.params.ratingId}`}
        }
        res
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .json(rating)
    } catch (error) {
        throw new Error (`Error updating song rating: ${error.message}`);
    }
}

const deleteSongRating = async (req, res, next) => {
    try {
        const song =  await Song.findById(req.params.songId);
        let rating = song.ratings.find(rating => (rating._id).equals(req.params.ratingId));
        if(rating){
            const ratingIndex = song.ratings.indexOf(rating);
            song.ratings.splice(ratingIndex, 1);
            rating = `The rating has been deleted`;
            song.save();
        }else{
            rating = {success: false, msg: `No rating found with the id: ${req.params.ratingId}`};
        }
        res
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .json(rating)
    } catch (error) {
        throw new Error(`Error deleting song rating :${error.message}`)
    }
}


module.exports = {
    getSongs,
    deleteSongs,
    postSong,
    getSong,
    deleteSong,
    updateSong,
    getSongRatings,
    postSongRating,
    deleteSongRatings,
    getSongRating,
    updateSongRating,
    deleteSongRating
}