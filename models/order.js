const mongoose = require('mongoose');


const OrderSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    products:[
        {
            productId : mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],
    amount:{
        type: Number,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    status:{
        type: String,
        trim: true, //DELETES THE WHITESPACES
        enum: { //USER WILL ALLOWS TO ENTER ONLY SPECIFIC VALUES
            values:['Pending', "Complete", 'Cancelled']
        },
        default: 'Pending',
        required: [true, 'Order status is required'] // WILL SHOW THE ERROR IF DATA IS NOT GIVEN (STATUS)
    }
},
{
    timestamps :true // THIS WILL AUTOMATICALLY GENERATE THE 'CREATEDAT'
}
)


module.exports = mongoose.model('Order', OrderSchema)