const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    description:{
        type: String,
        default: ""
    },
    postedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    date:{
        type: Date,
        default: Date.now()
    }

})



module.exports = mongoose.model("Product", productSchema)