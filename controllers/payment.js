const userModel = require("../models/user")
const cartModel = require("../models/cart")
const axios = require("axios")


const checkout = async(req, res)=>{
    try {
        if(req.user){
            const email = req.user.email
            const user = await userModel.findOne({ email: email})
            if(!user){
                return res.redirect("/login")
            }

            const userCarts = await cartModel.find({userId: user._id})
            let totalAmount = 0;
            userCarts.forEach((cart) => {
              totalAmount += cart.quantity * cart.product.price;
            });

            const headers = {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
                "Content-Type": "application/json"
            }

            const transactionData = {
                email: user.email,
                currency: "NGN",
                amount: totalAmount * 100,
                callback_url: "http://localhost:4005/callback"
            }

            const createTransaction = await  axios.post("https://api.paystack.co/transaction/initialize", transactionData, {headers})

            const {data:{authorization_url}} = createTransaction.data

            res.redirect(authorization_url);

        }else{
            res.redirect("/login")
        }
    } catch (err) {
        // res.redirect("/error")
    }
}


module.exports = {checkout}