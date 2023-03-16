import { Router } from "express";
import managerProduct from "../controllers/Product.js";

const routerSocket = Router();

routerSocket.get('/realtimeproducts', async(req,res) => {
    res.render("realTimeProducts", { 
        titulo: "PetsShop - Catalogo Tiempo real",
    })
})

routerSocket.get('/', async(req,res) => {
    const productos = await managerProduct.getElements()

    res.render("home", { 
        titulo: "PetsShop - Catalogo",
        products: productos
    })
})

export default routerSocket;