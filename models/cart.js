const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
    quantity: {
        type: Number,
        default: 1
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }, 
    date:{
        type: Date,
        default: Date.now()
    }

})



module.exports = mongoose.model("Cart", cartSchema)