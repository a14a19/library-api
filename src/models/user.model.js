import mongoose from 'mongoose';
const Schema = mongoose.Schema;
// const bcrypt = require('bcryptjs');
// const bcryptSalt = process.env.BCRYPT_SALT;

const User = new Schema(
    {
        userName: {
            type: String,
            trim: true,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            trim: true,
            required: true,
        },
        email: {
            type: String,
            trim: true,
            unique: true,
            required: true,
            lowercase: true,
        },
        number: {
            type: Number,
            required: true,
        },
        password: {
            type: String,
            trim: true,
            required: true
        },
        role: {
            type: String,
            default: "user",
            enum: ["user", "admin"]
        }
    },
    {
        timestamps: true,
    }
);

// User.pre("save", async function (next) {
//     if (!this.isModified("password")) {
//         return next();
//     }
//     const hash = await bcrypt.hash(this.password, Number(bcryptSalt));
//     this.password = hash;
//     next();
// });

// User.methods.generateHash = (password) => {
//     return bcrypt.hashSync(password, 10);
// }

// User.methods.validatePassword = function (password) {
//     console.log(password, this.password)
//     const result = bcrypt.compareSync(password, this.password);
//     return result;
// }

export default mongoose.model('Users', User);