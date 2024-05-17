const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    status:{
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    date:{
        type: Date,
        default: Date.now()
    }

})

userSchema.pre("save", async function(next){
    const comingPassword = this.password
    const genSalt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(comingPassword, genSalt)

    this.password = hashedPassword
    next();
})


module.exports = mongoose.model("User", userSchema)