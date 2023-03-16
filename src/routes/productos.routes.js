import { Router } from "express";
import managerProduct from "../controllers/Product.js";

const routerProduct = Router()

routerProduct.get('/', async (req, res) => { 
    try{
        console.log(req.query)
        
        const {limit = 10, page = 1, sort = 0, category="", available=""} = req.query

        const filtros = {stock:{ $gt: 0 }}
        if (category) filtros.category = category
        if (available) filtros.available = available
        console.log("1");
        
        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sort: {price: parseInt(sort)} // los valores pueden ser: asc, desc, ascending, descending, 1 y -1.
        }
        console.log("2");

        const productsPag= await managerProduct.paginateElements(filtros, options)
        console.log("3" + productsPag);

        const linkPrev = productsPag.hasPrevPage ? `/api/products?category=${category}&limit=${limit}&sort=${sort}&avaliable=${available}&page=${productsPag.prevPage}`: null
        const linkNext = productsPag.hasNextPage ? `/api/products?category=${category}&limit=${limit}&sort=${sort}&avaliable=${available}&page=${productsPag.nextPage}`: null
        console.log("4");

        res.send({
            status:"success",
            payload: productsPag.docs,
            totalPages: productsPag.totalPages,
            prevPage: productsPag.prevPage,
            nextPage: productsPag.nextPage,
            page: productsPag.page,
            hasPrevPage: productsPag.hasPrevPage,
            hasNextPage: productsPag.hasNextPage,
            prevLink: linkPrev,
            nextLink: linkNext,
        })
        
        console.log("5")

    }catch(error){
        const data={
            status: "error",
            payload: error
        } 
        res.send(data)
    }
})

routerProduct.get('/:id', async (req, res) => {
    const product = await managerProduct.getElementById(req.params.id)
    res.send(product)
})

routerProduct.post('/', async (req, res) => { 
    let nuevoProduct = await managerProduct.addElements([req.body]);
    res.send(nuevoProduct)
    console.log(nuevoProduct);
})

routerProduct.delete('/:id', async (req, res) => {
    let mensaje = await managerProduct.deleteElement(req.params.id) 
    res.send(mensaje)
})

routerProduct.put('/:id', async (req, res) => { 
    let prodUpdate = req.body
    let id = req.params.id;
    let updateProduct = await managerProduct.updateElement(id, prodUpdate );
    res.send(`se modifico exitosamente ${updateProduct}`)
})

export default routerProduct