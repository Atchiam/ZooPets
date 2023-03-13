import 'dotenv/config'
import express from 'express'
import { engine } from "express-handlebars";
import { Server} from 'socket.io'
import { __dirname } from "./path.js"
import * as path from 'path'
import { getManagerMessages } from './dao/daoManager.js'
//-----RUTAS
import routerProduct from "./routes/productos.routes.js";
import routerMessage from './routes/chat.routes.js';
import routerCarrito from "./routes/carritos.routes.js";
import routerSocket from "./routes/socket.routes.js";

import { ProductManager } from "./controllers/ProductManager.js";

const productManager = new ProductManager('src/models/productos.json')

const app = express()

app.set("port", process.env.PORT || 8080)
const server = app.listen(app.get("port"), () =>{
    console.log(`Server on port ${app.get("port")}`);
})

//------ServerIO
const io = new Server(server);
const data = await getManagerMessages();
const managerMessages = new data();

io.on("connection", async (socket)=>{ 

    console.log("Cliente conectado");
    managerMessages.getElements().then((messages) => {
        socket.emit("allMessages", messages);
    })

    socket.on("message", async (info) => {
        managerMessages.addElements([info]).then(() => {
            managerMessages.getElements().then((messages) => {
                socket.emit("allMessages", messages);
            })
        })
    })

    socket.on("AddProduct", async info => { //Canal de coneccion --- cuando recibo la informacion de mi cliente
        console.log(info);
        let titulo =info.title
        let descripcion =info.description
        let precio =info.price
        let imagen =info.thumbnail
        let stock =info.stock
        let code =info.code
        let nuevoProduct = await productManager.addProduct(titulo, descripcion, precio, imagen, stock, code);
        socket.emit("confirmacionAdd",nuevoProduct)
    })

    socket.on("EliminarProduct", async id => { //Canal de coneccion --- cuando recibo la informacion de mi cliente
        let productoBorrado = await productManager.deleteProduct(id) 
        socket.emit("confirmacionBorrado",productoBorrado)
    })

    socket.emit("getProducts",  await productManager.getProducts()); //emito info desde mi servidor
})



//midlewares
//express
app.use(express.json()) 
app.use(express.urlencoded({extended: true}))
//handlebars
app.engine('handlebars', engine());
app.set("view engine", 'handlebars');
app.set('views', path.resolve(__dirname, './views'))

//--------Routes
app.use('/', express.static(__dirname + '/public'))
app.use('/', routerSocket)
app.use('/api/chat', express.static(__dirname + '/public')) 
app.use('/api/chat', routerMessage)
app.use('/api/products', routerProduct) 
app.use('/api/carts',routerCarrito)
