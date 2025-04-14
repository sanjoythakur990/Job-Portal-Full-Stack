import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { urlencoded } from "express";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) =>{
    try {
        const {fullname, email, phoneNumber, password, role} = req.body;
        console.log(req.body);
        if(!fullname || !email || !phoneNumber || !password || !role){
            return res.status(400).json({
                message: "Something is missing!",
                success: false
            })
        }
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({
                message: "User already exists with this email",
                success: false
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)    // 10 => SALT => how many times it will be hashed
        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                profilePhoto: cloudResponse.secure_url
            }
        })

        return res.status(201).json({
            message: "Account created successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const login = async (req, res) => {
    try {
        const {email, password, role} = req.body;
        if(!email || !password || !role){
            return res.status(400).json({
                message: "Something is missing!",
                success: false
            })
        }
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message: "User doesn't exist with this email id",
                success: false
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if(!isPasswordMatch){
            return res.status(400).json({
                message: "Wrong password!",
                success: false
            })
        }
        if(role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with the current role.",
                success: false
            })
        }
        const tokenData = {
            userId: user._id
        }
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, {expiresIn: "1d"})

        // user = {
        //     _id: user._id,
        //     fullname: user.fullname,
        //     email: user.email,
        //     phoneNumber: user.phoneNumber,

        // }

        const {password: pass, ...userObj} = user.toObject();
        return res.status(200).cookie("token", token, {maxAge: 1*24*60*60*1000, httpOnly: true, sameSite: 'strict'}).json({
            message: `Welcome ${user.fullname}`,
            userObj,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", {maxAge: 0}).json({
            message: "Logged out successfully!",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateProfile = async (req, res) => {
    try {
        const {fullname, email, phoneNumber, bio, skills} = req.body;

        const file = req.file;

        // cloudinary ayega bro
        const fileUri = getDataUri(file)

        const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
            resource_type: "auto" // Cloudinary will automatically detect the file type
        });
        // const cloudResponse = await cloudinary.uploader.upload(req.file.path);

        let skillsArray;
        if(skills){
            skillsArray = skills.split(",");
        }
        const userId = req.id;   // this will come from authentication middleware
        const user = await User.findById(userId)
        if(!user) {
            return res.status(400).json({
                message: "User not found!",
                success: false
            })
        }
        // update data
        if(fullname) user.fullname = fullname;
        if(email) user.email = email;
        if(phoneNumber) user.phoneNumber = phoneNumber;
        if(bio) user.profile.bio = bio;
        if(skills) user.profile.skills = skillsArray


        // resume comes later here...
        if(cloudResponse) {
            console.log(cloudResponse);
            user.profile.resume = cloudResponse.secure_url;   // save the cloudinary url
            user.profile.resumeOriginalName = file?.originalname; // save the original file name
        }

        await user.save()
        const {password: pass, ...userObj} = user.toObject();

        return res.status(200).json({
            message: "User updated successfully",
            userObj,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}