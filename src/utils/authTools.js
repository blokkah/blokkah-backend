const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {promisify} = require("util");
const crypto = require("crypto")
 
exports.hashPassword = function hashPassword(password) {
    const salt = bcrypt.genSaltSync(13);
    const hashedPw = bcrypt.hashSync(password, salt)
    return hashedPw;
}
exports.verifyPassword = (plainPassword, hashedPw) => bcrypt.compareSync(plainPassword, hashedPw);

exports.generateToken = function generateToken(userName, userId) {
 
   const token = jwt.sign({userName, id: userId}, process.env.JWT_SECRET, {expiresIn:'2 days'});
    return token;
}
exports.tokenVerify = async token => {
    const tokenVeri = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    return tokenVeri;
}
exports.hashReset = (salt) => {
if (!salt) { 
var salt = crypto.randomBytes(12).toString("hex");
} 
const hashedToken = crypto.createHash("sha256").update(salt).digest("hex");
return {
plainToken:salt,
hashedToken
}
 
}

 
