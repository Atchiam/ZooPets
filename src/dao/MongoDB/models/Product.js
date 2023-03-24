import { ManagerMongoDB } from "../db/mongoDBManager.js";
import { Schema} from "mongoose";
import paginate from "mongoose-paginate-v2";

const url = process.env.URLMONGODB

const productSchema = new Schema ({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    thumbnail:{
        type:Array,
        default:["img/default.jpg"],
    },
    code:{
        type:String,
        required:true,
        unique:true,
    },
    status:{
        type:Boolean,
        default:true,
    },
    stock:{
        type:Number,
        required:true,
    },
    category:{
        type:String,
        required:true,
    }
})
productSchema.plugin(paginate)
class ManagerProductMongoDB extends ManagerMongoDB {
    constructor() {
        super(url, "products", productSchema)
    }
    
}

export default ManagerProductMongoDB