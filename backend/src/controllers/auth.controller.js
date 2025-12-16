const userModel = require("../models/user.model");
const foodPartnerModel = require("../models/foodPartner.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  const { fullName, email, password } = req.body;

  const isUserAlreadyExists = await userModel.findOne({
    email
  });

  if (isUserAlreadyExists) {
    return res.status(400).send({
      message: "User already exists",
    });
  }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      fullName,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET)
      res.cookie("token", token , {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 7 * 24 * 60 * 60 * 1000
      })
      res.status(201).json({
        message: "User Registerd Successfully",
        user: {
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
        },
      })
}

async function loginUser(req , res){
    const {email , password} = req.body;

    const user = await userModel.findOne({email})
    if(!user){
        res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const isPasswordValid =  bcrypt.compare(password , user.password);

    if(!isPasswordValid){
        res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const token = jwt.sign({
        id : user._id,       
    }, process.env.JWT_SECRET)

    res.cookie("token" , token)

    res.status(200).json({
        message: "User logged in successfully",
        user: {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
        }
    })
}

function logoutUser(req , res){
    res.clearCookie("token")
    res.status(200).json({
      message: "User logged out successfully"
    })
}

async function registerfoodPartner(req , res) {
  const{businessName, email, phone , address , password} = req.body;

  const isfoodPartnerAlreadyExists = await foodPartnerModel.findOne({
    email
  });

  if(isfoodPartnerAlreadyExists){
    return res.status(400).json({
      message: "Food Partner already exists"
    })
  }

    const hashedPassword = await bcrypt.hash(password , 10);

   const foodPartner = await foodPartnerModel.create({
    businessName,
    email,
    password: hashedPassword,
    phone,
    address
   })

    const token = jwt.sign({
      id: foodPartner._id,
    }, process.env.JWT_SECRET)

    res.cookie("token" , token)
    res.status(201).json({
      message: "Food Partner Registered Successfully",
      foodPartner: {
        _id: foodPartner._id,
        fullName: foodPartner.businessName,
        email: foodPartner.email,
        address: foodPartner.address,
        phone: foodPartner.phone
      }
    })

}

async function foodpartnerLogin(req , res){
    const{email , password} = req.body; 
    const foodpartnerLogin = await foodPartnerModel.findOne({email})

    if(!foodpartnerLogin){
      return res.status(400).json({
        message: "Invalid email or password"
      })
    }

    const isPasswordValid = await bcrypt.compare(password , foodpartnerLogin.password);

    if(!isPasswordValid){
      return res.status(400).json({
        message: "Invalid email or password"
      })
    }

    const token = jwt.sign({
      id: foodpartnerLogin._id,
    }, process.env.JWT_SECRET)

    res.cookie("token" , token)
    res.status(200).json({
      message: "Food Partner logged in successfully",
      foodPartner: {
        _id: foodpartnerLogin._id,
        fullName: foodpartnerLogin.fullName,
        email: foodpartnerLogin.email,
      }
    })
}

function foodpartnerLogout(req , res){
    res.clearCookie("token")
    res.status(200).json({
      message: "Food Partner logged out successfully"
    })
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerfoodPartner,
    foodpartnerLogin,
    foodpartnerLogout
}