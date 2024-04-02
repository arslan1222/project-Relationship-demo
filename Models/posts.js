/*
 One to many / Approach 3(one tp squillions)
Store the reference(pointer) to the child document inside the parent
*/

const mongoose = require("mongoose");
const { Schema }  = mongoose;

main()
    .then(()=>{
    console.log("connection succesful!");
    })
    .catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}


let userSchema = new Schema({
    name: String,
    email: String
});

let postSchema = new Schema({
    content: String,
    likes: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

let User = mongoose.model("User", userSchema);
let Post = mongoose.model("Post", postSchema);


let addPosts = async ()=>{
    // How to create a user object
    // let user1 = new User({
    //     name: "Haider",
    //     email: "haider@gmail.com"
    // });

    // await user1.save();

    let user = await User.findOne({name: "Haider"});

    let post5 = new Post({
        content: "My Fifth Post",
        likes: 10780,
    });

    post5.user = user;

    let result = await post5.save();
    console.log(result);
};

addPosts();


// // Delete a user by id
// let del = async ()=>{
//     let dlt = await Post.deleteMany({});
// };
// del();

// let getData = async ()=>{
//     let result = await Post.findOne({}).populate("user");
//     console.log(result);
// }
// getData();

