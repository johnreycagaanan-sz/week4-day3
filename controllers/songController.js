const getSongs = (req, res, next) => {
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
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({ success:true, msg: 'Showing all songs'})
}

const postSong = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({success:true, msg: 'Song added'})
}

const deleteSongs = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({success:true, msg: 'Songs deleted'})
}

const getSong = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({success:true, msg: `Showing song with an ID of ${req.params.songId}`})
}

const deleteSong = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({success:true, msg: `Deleting song with an ID of ${req.params.songId}`})
}

const updateSong = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({success:true, msg: `Updating song with an ID of ${req.params.songId}`})
}

module.exports = {
    getSongs,
    deleteSongs,
    postSong,
    getSong,
    deleteSong,
    updateSong
}