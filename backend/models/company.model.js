import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    website: {
        type: String
    },
    location: {
        type: String
    },
    logo:{
        type: String     // URL to the company logo 
    },
    userId: {         // the user who created this company model in the db
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        requred: true
    }
}, {timestamps: true})

export const Company = mongoose.model("Company", companySchema)