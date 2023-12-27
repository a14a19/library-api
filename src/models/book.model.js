import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Book = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        author: {
            type: String,
            trim: true,
            required: true,
        },
        status: {
            type: String,
            default: "available",
            enum: ["available", "borrowed"]
        }
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Books', Book);