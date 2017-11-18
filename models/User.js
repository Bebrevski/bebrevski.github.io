const mongoose = require('mongoose');
const encryption = require('./../utilities/encryption');

let userSchema = mongoose.Schema(
    {
        email: {type: String, require: true, unique: true},
        passwordHash: {type: String, require: true},
        fullName: {type: String, require: true},
        articles: {type: [mongoose.Schema.Types.ObjectId], default: []},
        salt: {type: String, require: true}
    }
);

userSchema.method({
    authenticate: function (password) {
        let inputPasswordHash = encryption.hashPassword(password, this.salt);
        let isSamePasswordHash = inputPasswordHash === this.passwordHash;

        return isSamePasswordHash;
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;


