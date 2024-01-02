import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const LibTrans = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: true,
        },
        bookId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Books",
            required: true,
        },
        dueDate: {
            type: Date,
            required: true,
        },
        transactionType: {
            type: String,
            required: true,
            default: "borrow",
            enum: ["borrow", "return"]
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('LibTrans', LibTrans);