import { Router } from "express";

const routerMessage = Router()
routerMessage.get('/', async (req, res) => { 
    res.render("chat")
})

export default routerMessage