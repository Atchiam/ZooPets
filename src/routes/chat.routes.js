import { Router } from "express";
import { ManagerMessageMongoDB } from "../dao/MongoDB/models/Message.js";

const routerMessage = Router()
const managerMessage = new ManagerMessageMongoDB();
routerMessage.get('/', async (req, res) => { 
    try{
        const message= await managerMessage.getElements()
        res.render("chat", message)
    } catch (error){
        res.send("Error en user: ", error.menssage)
    }
})

routerMessage.post('/', async (req, res) => { 
    try{
        const json = 
        {
            "user": req.body.user,
            "email":req.body.email,
            "message": req.body.message
        }
        const message= await managerMessage.addElements(json)
        res.send("EXITOOOOO" + message)
    } catch (error){
        res.send("Error en user: ", error.menssage)
    }
})


export default routerMessage