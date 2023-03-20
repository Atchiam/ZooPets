import { Router } from "express";
import managerCart from "../controllers/Cart.js";

const routerCart = Router()
routerCart.post('/', async (req, res) => {  //crear carrito
    try {
        const newCart = {}
        await managerCart.addElements(newCart)
        res.send({response: 'success'})
    } catch (error) {
        res.send({ response: error });
    }

});

routerCart.get('/:cid', async (req, res) => { //ANDA
    try {
        const cartId= req.params.cid
        const carrito = await managerCart.getElementById(cartId) 
        res.send({response: carrito})
    } catch (error) {
        res.send({ response: error });
    }
})


routerCart.put('/:cid', async (req, res) => { //ANDA
    try{
        const cartId= req.params.cid
        const data= req.body
        await managerCart.updateElement(cartId,data)
        const cart = await managerCart.getElementById(cartId)
        res.send(cart)
        console.log("concha su madreeee");

    }catch(error){
        res.send("error")
    }
})

routerCart.put('/:idCarrito/product/:idProducto', async (req, res) => {//anda
    try{
        let idCarrito = req.params.idCarrito
        let idProducto = req.params.idProducto
        const {quantity} = req.body;
        const quant= parseInt(quantity)
        const updateProduct = await managerCart.updateQuiantity(idCarrito, idProducto, quant)
        res.send(updateProduct)

    }catch(error){
        res.send(error)
    }
})

routerCart.delete('/:idCarrito', async (req, res) => { //ANDA
    try{
        const cartId= req.params.idCarrito
        const cart = await managerCart.getElementById(cartId)
        const borrado = managerCart.deleteAllProducts(cart)
        res.send(borrado)        
    }catch(error){
        console.log(error);
        res.send(error)
    }
})

routerCart.delete('/:idCarrito/product/:idProducto', async (req, res) => { //ANDA
    let idCarrito = req.params.idCarrito
    let idProducto = req.params.idProducto
    const carrito = await managerCart.getElementById(idCarrito)
    let mensaje = await managerCart.deleteProduct(idProducto, carrito)
    res.send(mensaje)
})


export default routerCart