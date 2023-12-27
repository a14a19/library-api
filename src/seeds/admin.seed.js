import { config } from "dotenv";
config();
import { connect } from "mongoose";
import Users from "../models/user.model.js";
import bcrypt from "bcryptjs";

(
    async () => {
        await connect(process.env.MONGO_URI)
    }
)().then(() => {
    console.log("Seed connected to DB")
}).catch((e) => {
    console.log("error in seed: ", e)
})

const createAdminSeed = async () => {
    try {
        const data = {
            name: "admin",
            userName: "admin",
            email: "admin@yopmail.com",
            password: "Aa@12345",
            number: 1234567890,
            role: "admin"
        }
        const adminAlreadyExist = await Users.find({ email: data.email })
        if (adminAlreadyExist > 0) {
            return console.log("Admin already exists!")
        }
        data.password = await bcrypt.hashSync(data.password, Number(process.env.BCRYPT_SALT));
        const admin = await new Users(data).save();
        console.log("Admin create: ", admin);
    } catch (e) {
        console.log("error in create admin seed: ", e)
    }
}

await createAdminSeed();