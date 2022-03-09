const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const createUser = async function (req, res) {
  //You can name the req, res objects anything.
  //but the first parameter is always the request 
  //the second parameter is always the response
  let data = req.body;
  let savedData = await userModel.create(data);
  res.send({ msg: savedData });
};

const loginUser = async function (req, res) {
  let userName = req.body.emailId;
  let password = req.body.password;

  let user = await userModel.findOne({ emailId: userName, password: password });
  if (!user)
    return res.send({
      status: false,
      msg: "username or the password is not corerct",
    });
    let token = jwt.sign(
      {
        userId: user._id.toString(),
        batch: "thorium",
        organisation: "FUnctionUp",
      },
      "functionup-thorium"
    );
    res.setHeader("x-auth-token", token);
    res.send({ status: true, data: token });
  };
  // Once the login is successful, create the jwt token with sign function
  // Sign function has 2 inputs:
  // Input 1 is the payload or the object containing data to be set in token
  // The decision about what data to put in token depends on the business requirement
  // Input 2 is the secret
  // The same secret will be used to decode tokens
 

 const getUserData = async function (req, res) {
  let userId = req.params.userId;
  let userDetails = await userModel.findById(userId);
 if (!userDetails)
   return res.send({ status: false, msg: "No such user exists" });

 res.send({ status: true, data: userDetails });
};
// // If a token is present then decode the token with verify function
  // // verify takes two inputs:
  // // Input 1 is the token to be decoded
  // // Input 2 is the same secret with which the token was generated
  // // Check the value of the decoded token yourself
  

  
const updateUser = async function (req, res) {

  let userId = req.params.userId;
  let user = await userModel.findById(userId);
   if (!user) {
    return res.send("No such user exists");
  }

  let userData = req.body;
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, {$set : {age: 20}});
  res.send({ status: true , data: updatedUser });
};
// Do the same steps here:
// Check if the token is present
// Check if the token present is a valid token
// Return a different error message in both these cases


 

const deleteUser = async function (req, res) {
  let userId = req.params.userId;
  let user = await userModel.findById(userId);

  if (!user) {
    return res.send("No such user exists");
  }
  let deleteData = req.body;
  let deletedUser = await userModel.findOneAndUpdate({ _id: userId }, {$set: {isDeleted : true}});
  res.send({ status: true , data: deletedUser });
  
};
  // Do the same steps here:
  // Check if the token is present
  // Check if the token present is a valid token
  // Return a different error message in both these cases

  const postMessage = async function (req, res) {
    let user = userModel.findById(req.params.userId)
    if(!user) return res.send({status: false, msg: 'No such user exists'})
   
    let postMessage = req.body.message
    let updatedPosts = user.posts
    //add the message to user's posts
   updatedPosts.push(postMessage);
    let updatedUser = await userModel.findOneAndUpdate({_id: user._id},{posts: updatedPosts}, {new: true})

    //return the updated user document
    return res.send({status: true, data: updatedUser})
}
 // Check if the token is present
    // Check if the token present is a valid token
    // Return a different error message in both these cases
  
module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser = deleteUser;
module.exports.postMessage = postMessage;