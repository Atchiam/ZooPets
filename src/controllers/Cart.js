import { getManagerCart } from "../dao/daoManager.js";
import managerProduct from "../controllers/Product.js";

const data = await getManagerCart();
const managerCart = new data();

export const createNewCart =
async (req, res) => {  //crear carrito
    try {
        const newCart = {}
        await managerCart.addElements(newCart)
        res.send({response: 'success'})
    } catch (error) {
        res.send({ response: error });
    }
}
export const addProdToCart =
async (req, res) => {
    try{
        let idCarrito = req.params.idCarrito
        let idProducto = req.params.idProducto
        let prodEncontrado = await managerProduct.getElementById(idProducto)
        if(prodEncontrado){
            let mensaje = await managerCart.addProductToCart(idCarrito,idProducto)
            res.send(mensaje)
        }else{
            res.send("el producto no se encuentra")
        }

    }catch(error){
        res.send("error")
    }
}
export const getCartId =
async (req, res) => { //ANDA
    try {
        const id= req.params.cid
        const cart = await managerCart.getElementById(id)
        const carritopopulated= await cart.populate({path: "products.productId", model: managerCart.productModel})
        console.log(carritopopulated.products[1].quantity);
        res.render("cart", { 
            titulo: "PetsShop - Carrito",
            productsCart: carritopopulated.products
        })
    } catch (error) {
        res.send({ response: error });
    }
}
export const putAllArrayCart =
async (req, res) => { //ANDA
    try{
        const cartId= req.params.cid
        const data= req.body
        await managerCart.updateElement(cartId,data)
        const cart = await managerCart.getElementById(cartId)
        res.send(cart)

    }catch(error){
        throw(error)
    }
}
export const putQuantityCart = 
async (req, res) => {//anda
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
}
export const deleteAllProdCart =async (req, res) => { //ANDA
    try{
        const cartId= req.params.idCarrito
        const cart = await managerCart.getElementById(cartId)
        const borrado = managerCart.deleteAllProducts(cart)
        res.send(borrado)        
    }catch(error){
        console.log(error);
        res.send(error)
    }
}
export const deleteOneProdCart =
async (req, res) => { //ANDA
    let idCarrito = req.params.idCarrito
    let idProducto = req.params.idProducto
    const carrito = await managerCart.getElementById(idCarrito)
    let mensaje = await managerCart.deleteProduct(idProducto, carrito)
    res.send(mensaje)
}

export default managerCart