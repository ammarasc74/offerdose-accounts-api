const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: "string",
        requried: true,
        uniqe: true
    },
    password: {
        type: "string",
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);