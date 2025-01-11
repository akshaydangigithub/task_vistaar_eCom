import mongoose from "mongoose";

const blackListedTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400, // 24 hours in seconds
    },
});

const BlackListedToken = mongoose.model(
    "BlackListedToken",
    blackListedTokenSchema
);

export default BlackListedToken;
