import { Router } from "express";
import { getProd, getProdId,addProd,delProd,putProd } from "../controllers/Product.js";

const routerProduct = Router()
routerProduct.get('/', getProd)
routerProduct.get('/:id', getProdId)
routerProduct.post('/', addProd)
routerProduct.delete('/:id', delProd)
routerProduct.put('/:id', putProd)

export default routerProduct