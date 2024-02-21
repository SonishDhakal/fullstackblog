import { handelError } from "../utils/handelError.js";
import User from "../modals/user.modal.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import Profile from "../../client/src/redux/user/profile.modal.js";

export const singup = async (req, res, next) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return next(handelError(401, "All the fields are required"));
  }

  try {
    const checkUser = await User.findOne({ username });
    if (checkUser) {
      return next(handelError(400, "Username not available"));
    }

    const checkEmail = await User.findOne({ email });

    if (checkEmail) {
      return next(handelError(400, "Email not available"));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = User({ username, password: hashedPassword, email });

    await newUser.save();

    res.status(200).json(newUser._id);
  } catch (e) {
    next(e);
  }
};

export const signin = async (req, res, next) => {
  let { value, password } = req.body;

  if (!value || !password) {
    return next(handelError(401, "All the fields are required"));
  }

  value = value.toLowerCase();

  const findUserbyUsername = await User.findOne({ username: value });

  if (!findUserbyUsername) {
    const findUserbyemail = await User.findOne({ email: value });
    if (!findUserbyemail) {
      return next(
        handelError(
          401,
          "Incorrect Credentials: No account with such Email or Username"
        )
      );
    }

    const checkpassword = bcryptjs.compareSync(
      password,
      findUserbyemail.password
    );

    if (!checkpassword) {
      return next(handelError(401, "Incorrect password"));
    }

    const { password: pass, ...rest } = findUserbyemail._doc;

    if (!findUserbyemail.emailVerified) {
      return res.status(200).json({
        unverified: true,
        userId: findUserbyemail._id,
        email: findUserbyemail.email,
      });
    }
      const token = jwt.sign(
        {
          id: findUserbyemail._id,
          emailVerified: findUserbyemail.emailVerified,
          onBoardingComplete: findUserbyemail.onBoardingComplete,
        },
        process.env.JWT_SECRET
      );

      if(!findUserbyemail.onBoardingComplete){
        return res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json(rest);
      }

      const getProfile = await Profile.findOne({
        userId: findUserbyemail._id,
      });
  
      const { profilePicture  } = getProfile._doc;
  
      return res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json({ ...rest,  profilePicture });



     
    
  } else {
    const checkpassword = bcryptjs.compareSync(
      password,
      findUserbyUsername.password
    );

    if (!checkpassword) {
      return next(handelError(401, "Incorrect password"));
    }

    if (!findUserbyUsername.emailVerified) {
      return res.status(200).json({
        unverified: true,
        userId: findUserbyUsername._id,
        email: findUserbyUsername.email,
      });
    }

    const token = jwt.sign(
      {
        id: findUserbyUsername._id,
        emailVerified: findUserbyUsername.emailVerified,
        onBoardingComplete: findUserbyUsername.onBoardingComplete,
      },
      process.env.JWT_SECRET
    );
    const { password: pass, ...rest } = findUserbyUsername._doc;

    if (!findUserbyUsername.onBoardingComplete) {
      return res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json(rest);
    }

    const getProfile = await Profile.findOne({
      userId: findUserbyUsername._id,
    });

    const { profilePicture } = getProfile._doc;

    return res
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json({ ...rest,  profilePicture });
  }
};

export const oAuth = async (req, res, next) => {
  const { email, displayName } = req.body;
  try {
    const findUser = await User.findOne({ email });

    //if old account

    if (findUser) {
      const { password, ...rest } = findUser._doc;
      const token = jwt.sign(
        {
          id: findUser._id,
          emailVerified: findUser.emailVerified,
          onBoardingComplete: findUser.onBoardingComplete,
        },
        process.env.JWT_SECRET
      );

      if(!findUser.onBoardingComplete){
        return res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json(rest);
    }

    const getProfile = await Profile.findOne({
      userId: findUser._id,
    });

    const { profilePicture  } = getProfile._doc;

    return res
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json({ ...rest, profilePicture });

    

      }

     

    //if new account

    const password = Math.random().toString(36).slice(-8);
    const hashedPassword = bcryptjs.hashSync(password, 10);

    const username =
      displayName.toLowerCase().trim().split(" ").join("") +
      Math.random().toString().slice(-4);

    const newUser = new User({
      email,
      username,
      password: hashedPassword,
      emailVerified: true,
      onBoardingComplete: false,
    });

    await newUser.save();

    const { password: pass, ...rest } = newUser._doc;
    const token = jwt.sign(
      {
        id: newUser._id,
        emailVerified: newUser.emailVerified,
        onBoardingComplete: newUser.onBoardingComplete,
      },
      process.env.JWT_SECRET
    );

    return res
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json(rest);
  } catch (e) {
    next(e);
  }
};



export const signout = (req,res,next) => {
try{
  res.clearCookie('access_token').status(200).json("Success")

}
catch(e){
  next(e)
}
}