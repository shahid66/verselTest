const UserModel = require("../model/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");

exports.test = (req, res) => {
  res.json({ message: "Text api" });
};
exports.allUsers = async (req, res) => {
  const users = await UserModel.find({});
  res.status(200).json(users);
};
exports.singleUser = async (req, res) => {
  const id = req.params.userId;
  const users = await UserModel.find({ _id: id });
  res.status(200).json(users);
};
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};
// date formate

const date = new Date();
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();
exports.register = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password } = req.body;

    //   Validation
    if (!name || !email || !password) {
      res.status(400).json({ message: "Please fill all field" });
    }
    const user = await UserModel.create({
      name,
      email,
      password,
    });
    const token = generateToken(user._id);
    if (user) {
      const { _id, name, email, image } = user;
      res.status(200).json({
        status: "success",
        token: token,
        data: { _id, name, email, image, phone },
      });
    } else {
      res.status(404);
    }
  } catch (err) {
    res.status(404);
  }
};
exports.updateUser = async (req, res) => {
  let userId = req.body.id;
  console.log(req.body)
  const user = await UserModel.findById(userId);
      // Handle Image upload
    let fileData = {};
    if (req.file) {
      
      filePath = path.join( 'uploads',user.image.fileName);
      
      // if(user.image.fileName!=="default.png"){
      //   const IsFile=fs.existsSync(filePath)
      //   if(IsFile){
      //    unlinkAsync(filePath)
      //   }
      // }
     


      
      fileData = {
        fileName:`${day+"-"+month+"-"+year + "-" + req.file.originalname}`,
        fileLocalPath:`${req.protocol}://${req.headers.host}/${day+"-"+month+"-"+year + "-" + req.file.originalname}`,
        fileType: req.file.mimetype,
        
      };
    }




if(user){

  
  if(req.file){
    user.name = req.body.name 
  user.image=fileData;
  const updatedUser = await user.save();
  res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    
  });
}
     
   

}else {
  res.status(404);
  throw new Error("User not found");
}
};
