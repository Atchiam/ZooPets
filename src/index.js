import 'dotenv/config'
import express from 'express'
import { engine } from "express-handlebars";
import { Server} from 'socket.io'
import { __filename, __dirname } from "./path.js"
import * as path from 'path'
//-----RUTAS
import managerMessages from './controllers/Message.js';
import managerProduct from './controllers/Product.js';

//import routerProduct from "./routes/productos.routes.js";
import routerMessage from './routes/chat.routes.js';
import routerCarrito from "./routes/carritos.routes.js";
import routerSocket from "./routes/socket.routes.js";
import routerProduct from './routes/productos.routes.js';

const app = express()

app.set("port", process.env.PORT || 8080)
const server = app.listen(app.get("port"), () =>{
    console.log(`Server on port ${app.get("port")}`);
})

//------ServerIO
const io = new Server(server);

io.on("connection", async (socket)=>{ 
//------Mensajes
    console.log("Cliente conectado");
    managerMessages.getElements().then((messages) => {
        socket.emit("allMessages", messages);
    })

    socket.on("message", async (info) => {
        await managerMessages.addElements([info]).then(() => {
            managerMessages.getElements().then((messages) => {
                socket.emit("allMessages", messages);
            })
        })
    })
//------Productos
    socket.on("AddProduct", async (info) => { //Canal de coneccion --- cuando recibo la informacion de mi cliente
        let nuevoProduct = await managerProduct.addElements([info]);
        socket.emit("confirmacionAdd",nuevoProduct)
        socket.emit("getProducts",  await managerProduct.getElements());
    })

    socket.on("EliminarProduct", async _id => { //Canal de coneccion --- cuando recibo la informacion de mi cliente
        let productoBorrado = await managerProduct.deleteElement(_id) 
        socket.emit("confirmacionBorrado",productoBorrado)
        socket.emit("getProducts",  await managerProduct.getElements());
    })

    socket.emit("getProducts",  await managerProduct.getElements()); //emito info desde mi servidor
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
