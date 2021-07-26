const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        requried: true,
    },
    email: {
        type: "string",
        requried: true,
    },
    password: {
        type: "string",
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);