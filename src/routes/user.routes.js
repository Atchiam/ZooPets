import { Router } from "express";
import { createUser } from "../controllers/user.js";

const routerUser = Router()

//'/user'

routerUser.post("/", createUser)

routerUser.get('/signup', async (req, res) => { 
    const data = req.query.menssage;
    res.render("signup",{ menssage:data})
})

export default routerUser

/*
    a) Usuario se registra correctamente -> Va a login
    b) Usuario se registra con un email existente -> Vuelve a registro con mensaje de error
    c) Usuario intenta loguearse pero datos no validos -> Va a Login va con mensaje
    d) Usuario no esta registrado -> Va al login con mensaje
    e) Usuario inicia sesion y no es admin -> Va a products con rol de user
    f) Usuario inicia sesion y es admin -> Va a products con rol de admin
    g) Usuario se desloguea -> Va a login con mensaje
*/