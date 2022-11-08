const bcrypt = require("bcrypt");

const saltRounds = parseInt(process.env.SALT_ROUNDS);

const generateHash = async (value) => {
    return bcrypt.hash(value, saltRounds);
};

const validateHash = async (hash, plainText, producerId) => {
    return bcrypt.compare(plainText, hash);
};

module.exports = {
    generateHash, validateHash
}