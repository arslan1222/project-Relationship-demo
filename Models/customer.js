/*
One to many / Approach 2(one tp many)
Store the reference(pointer) to the child document inside the parent
*/

const mongoose = require("mongoose");
const { Schema }  = mongoose;

main()
    .then(()=>{
    console.log("connsection succesful!");
    })
    .catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}

// Order Schema
const orderSchema = new Schema({
    items: String,
    price: Number
});

// Customer Schema
let customerSchema = new Schema({
    name: String,
    orders: [
        {
            type : Schema.Types.ObjectId,   // For store objectId in document
            ref: "Order",  // Reference  // Order is a model
        }
    ],
});

// Mongoose Middlewares
customerSchema.pre("findOneAndDelete", async ()=>{
    console.log("Pre Called");
});


customerSchema.post("findOneAndDelete", async (customer)=>{
    console.log(customer);
    if(customer.orders.length){
      let result = await Order.deleteMany({ _id: { $in: customer.orders } });
      console.log(result);
    }
    
});

const Order = mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer", customerSchema);

// Add Orders
/*
const addOrders = async ()=>{
    let result = await Order.insertMany([
        {items : "Mangoes", price : 200},
        {items: "Apple", price: 150}
    ])
    console.log(result);
}
addOrders();
*/

// Add Customers

// const addCustomer = async ()=>{
//     let cust1 = new Customer({
//         name: "Haider",
//     });
//     let order1 = await Order.findOne({items: "Samosa"});
//     let order2 = await Order.findOne({items: "Fries"});

//     cust1.orders.push(order1);
//     cust1.orders.push(order2);

//     let result = await cust1.save();
//     console.log(result);
    
// }
// addCustomer();


let addCust = async()=>{
    let cust = new Customer({
        name: "Ahmed"
    });

    let custOrd = await Order({
        items: "Burger23",
        price: "500"
    });

    cust.orders.push(custOrd);

    await custOrd.save();
    await cust.save();

}
// addCust();

const delCust = async ()=>{
    let data = await Customer.findByIdAndDelete("65b8a1616f6cd1ae0bba9b24");
    console.log(data);
}

delCust();

/*
let addorders = async ()=>{
    let result = await Order.insertMany([
        {items: "Samosa", price: 30},
        {items: "Fries", price: 20},
        {items: "chocolate", price: 50},
    ]);
    console.log(result);
}
*/
// addorders();

// let getData = async ()=>{
//         let result = await Order.findByIdAndDelete("65b32a57c6e91836cbb6956a");
//         console.log(result);
//     }
//     getData()