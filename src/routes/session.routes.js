import { Router } from "express";
import { getSession, testLogin, destroySession } from "../controllers/session.js";

const routerSession = Router()


//'api/sessions'
routerSession.get("/session", getSession) //solo por postman
routerSession.get('/login', async (req, res) => { 
    const data = req.query.menssage;
    res.render("login",{ menssage:data})
})
routerSession.post("/login", testLogin)
routerSession.get("/logout", destroySession)

export default routerSession