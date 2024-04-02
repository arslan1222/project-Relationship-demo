// One to Few Relationship

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

const userSchema = new Schema({
    username: String,
    addresses: [
        {
            _id: false,
            location: String,
            city: String
        },
    ],
});

// Mongoose middlewares
userSchema.post("findOneAndDelete", async (user)=>{
    console.log(user);
    if(user.addresses.length){
      let result = await User.deleteMany({ _id: { $in: user.addresses } });
      console.log(result);
    }
    
});

const User = mongoose.model("User", userSchema);


const addUsers = async ()=>{
    let user1 = new User({
        username: "Arslan",
        addresses: [{
            location: "112B baker street",
            city: "Sialkot",
        }],
    });
    
    // Second address
    user1.addresses.push({location: "P32 wall treet", city: "Lahore"});
    let result = await user1.save();
    console.log(result);
};

// addUsers();

const delUser = async ()=>{
    let data = await User.findByIdAndDelete("65b8a1616f6cd1ae0bba9b24");
    console.log(data);
}

delUser();