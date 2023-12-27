import { connect, disconnect } from 'mongoose';

async function connectToDatabase() {
    try {
        await connect(process.env.MONGO_URI)
    } catch (e) {
        console.log(e);
        throw new Error("MongDB connection failed ");
    }
}

async function disconnectFromDatabase() {
    try {
        await disconnect()
    } catch (e) {
        console.log(e);
        throw new Error("MongDB disconnection failed ");
    }
}

export { connectToDatabase, disconnectFromDatabase };

// const mongoose = require('mongoose');

// mongoose.set('strictQuery', true)
// mongoose.connect(process.env.MONGOURI)
//     .then(() => console.log("DB connection successful"))
//     .catch(err => console.log(`DB connection error: ${err}`));

// let db = mongoose.connection;

// db.on('error', console.error.bind(console, 'DB connection error!'));

// db.on('open', () => {
//     console.log("MongoDB is connected!");
// });
