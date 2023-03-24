import { Router } from "express";
import * as controller from "../controllers/cart.js"

const routerCart = Router()

//--/cart

routerCart.post('/', controller.createNewCart);
routerCart.post('/:idCarrito/product/:idProducto', controller.addProdToCart );
routerCart.get('/:cid', controller.getCartId)
routerCart.put('/:cid',controller.putAllArrayCart)
routerCart.put('/:idCarrito/product/:idProducto', controller.putQuantityCart)
routerCart.delete('/:idCarrito', controller.deleteAllProdCart)
routerCart.delete('/:idCarrito/product/:idProducto', controller.deleteOneProdCart)

export default routerCart