const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        maxLength: 10
    },
    lastName: {
        type: String,
        required: true,
        maxLength: 10
    },
    genre: {
        type: String,
    },
    image: {
        type: String
    }
},{
    timestamps: true
})

ArtistSchema.pre('save', function(next) {
    this.firstName = this.firstName.trim();
    this.lastName = this.lastName.trim();
    next();
})

ArtistSchema.post('save', function() {
    this.gender = this.gender.toUpperCase();
})

module.exports = mongoose.model('Artist', ArtistSchema);