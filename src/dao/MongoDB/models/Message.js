import { ManagerMongoDB } from "../../../db/mongoDBManager.js";
import { Schema } from "mongoose";

const url = process.env.URLMONGODB

const messageSchema = new Schema({
    user: {
        type: String,
        require:true
    },
    email: {
        type: String,
        require:true
    },
    message:{
        type: String,
        require:true
    }
})

class ManagerMessageMongoDB extends ManagerMongoDB {
    constructor() {
        super(url, "messages", messageSchema)
    }
}

export default ManagerMessageMongoDB