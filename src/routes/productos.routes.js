// import { Router } from "express";
// import { ManagerProductMongoDB } from "../dao/MongoDB/models/Product.js";

// const routerProduct = Router()
// const managerProd = new ManagerProductMongoDB();
// routerProduct.get('/', async (req, res) => { 
//     try{
//         const products= await managerProd.getElements();
//         let limit = parseInt(req.query.limit);
//         let data;
//         if (limit) {
//             if(limit < 0 || limit > products.length){
//                 data=`el limite debe ser un numero positivo y menor al numero ${products.length}`
//             }else{data = products.slice(0, limit);}
//         } else {
//             data = products;
//         }
//         res.send(data);
//     } catch (error){
//         res.send("Error en user: ", error.menssage)
//     }
// })

// routerProduct.get('/:id', async (req, res) => { 
//     try{
//         const product= await ManagerProductMongoDB.getElementById(parseInt(req.params._id))
//         res.send(product)
//     } catch (error){
//         res.send("Error en user: ", error.menssage)
//     }
// })

// routerProduct.post('/', async (req, res) => { 
//     try{
//         const elements = [req.body]
//         const products= await ManagerProductMongoDB.addElements(elements)
//         res.render("home",{resultado:"success", products: products})
//     } catch (error){
//         res.render("Error en user: ", error.menssage)
//     }
// })

// routerProduct.delete('/:id', async (req, res) => {
//     try{
//         const product= await ManagerProductMongoDB.findByIdAndDelete(req.params.id)
//         res.render({resultado:"success"})
//     } catch (error){
//         res.render("Error en user: ", error.menssage)
//     }
// })

// routerProduct.put('/:id', async (req, res) => { 
//     try{
//         let titulo = req.body.title;
//         let descripcion = req.body.description;
//         let precio = req.body.price;
//         let imagen = req.body.imagen;
//         let stock = req.body.stock;
//         let code = req.body.code;
//         let id = parseInt(req.params.id);

//         const product= await ManagerProductMongoDB.updateElement(id, info)
//         res.render({resultado:"success", product: product})
//     } catch (error){
//         res.render("Error en user: ", error.menssage)
//     }
// })

// export default routerProduct