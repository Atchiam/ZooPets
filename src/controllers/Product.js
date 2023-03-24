import { getManagerProducts } from "../dao/daoManager.js";

const data = await getManagerProducts();
const managerProduct = new data();
export const getProd = 
    async (req, res) => { 
        try{
            console.log(req.query)
            
            const {limit = 10, page = 1, sort = 0, category="", available=""} = req.query
    
            const filtros = {stock:{ $gt: 0 }}
            if (category) filtros.category = category
            if (available) filtros.available = available
            
            const options = {
                page: parseInt(page),
                limit: parseInt(limit),
                sort: {price: parseInt(sort)} // los valores pueden ser: asc, desc, ascending, descending, 1 y -1.
            }
    
            const productsPag= await managerProduct.paginateElements(filtros, options)
    
            const linkPrev = productsPag.hasPrevPage ? `/api/products?category=${category}&limit=${limit}&sort=${sort}&avaliable=${available}&page=${productsPag.prevPage}`: null
            const linkNext = productsPag.hasNextPage ? `/api/products?category=${category}&limit=${limit}&sort=${sort}&avaliable=${available}&page=${productsPag.nextPage}`: null
    
            const send = {
            status:"success",
            payload: productsPag.docs,
            totalPages: productsPag.totalPages,
            prevPage: productsPag.prevPage,
            nextPage: productsPag.nextPage,
            page: productsPag.page,
            hasPrevPage: productsPag.hasPrevPage,
            hasNextPage: productsPag.hasNextPage,
            prevLink: linkPrev,
            nextLink: linkNext,}

            const data = req.query.menssage;

            res.render("home", { 
                titulo: "PetsShop - Catalogo",
                paginate: send,
                products: send.payload,
                menssage:data
            })
    
    
        }catch(error){
            const data={
                status: "error",
                payload: error
            } 
            res.send(data)
        }
    }

export const getProdId = 
    async (req, res) => {
    const product = await managerProduct.getElementById(req.params.id)
    res.send(product)
    }
export const addProd = 
    async (req, res) => { 
    let nuevoProduct = await managerProduct.addElements([req.body]);
    res.send(nuevoProduct)
    console.log(nuevoProduct);
    }
export const delProd =
    async (req, res) => {
    let mensaje = await managerProduct.deleteElement(req.params.id) 
    res.send(mensaje)
    }
export const putProd =
    async (req, res) => { 
        let prodUpdate = req.body
        let id = req.params.id;
        let updateProduct = await managerProduct.updateElement(id, prodUpdate );
        res.send(`se modifico exitosamente ${updateProduct}`)
    }

export default managerProduct