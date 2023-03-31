import { ManagerMongoDB } from "../db/mongoDBManager.js";
import { Schema } from "mongoose";

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        index: true
    },
    age: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user"
    }
})

class ManagerUserMongoDB extends ManagerMongoDB {
    constructor() {
        super(process.env.URLMONGODB, "users", userSchema)
    }

    async getUserByEmail(email) {
        await this._setConnection()
        try {
            return await this.model.findOne({ email: email })
        } catch (error) {
            return error
        }
    }

    async newUser(user){
        try {
            return await this.model.create(user)
        } catch (error) {
            return error
        }
    }
}



export default ManagerUserMongoDB