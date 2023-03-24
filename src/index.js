import 'dotenv/config'
import express from 'express'
import { engine } from "express-handlebars";
import { Server} from 'socket.io'
import { __filename, __dirname } from "./path.js"
import * as path from 'path'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo'

//-----RUTAS
import managerMessages from './controllers/Message.js';
import managerProduct from './controllers/Product.js';

//import routerProduct from "./routes/productos.routes.js";
import routerMessage from './routes/chat.routes.js';
import routerCart from './routes/cart.routes.js';
import routerSocket from "./routes/socket.routes.js";
import routerProduct from './routes/productos.routes.js';
import routerSession from './routes/session.routes.js';
import routerUser from './routes/user.routes.js';



const app = express()
//midlewares
//express
app.use(express.json()) 
app.use(express.urlencoded({extended: true}))
app.use(cookieParser(process.env.COOKIE_SECRET))

app.set("port", process.env.PORT || 8080)
const server = app.listen(app.get("port"), () =>{
    console.log(`Server on port ${app.get("port")}`);
})

app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.URLMONGODB,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 3600
    }),
    secret: process.env.SESSION_SECRET,
    resave: true,  //Me permita cerrar la pestaña o recargar y la sesion siga activa
    saveUninitialized: true  //Guardar sesion aunque no contenga info
}))

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

//Cookies

app.get('/setCookie', (req, res) => {
    res.cookie('CookieCookie', "Esta es mi primer cookie", { maxAge: 60000, signed: true })
    res.cookie('CookieCookie2', "si hay una puede aver 2", { maxAge: 60000, signed: true })
    res.send("van 2")
})      // referencia al nombre, referencia a la informacion enviada                             envia datos

app.get('/getCookie', (req, res) => {
    res.send(req.signedCookies)
})

//midlewares
//handlebars
app.engine('handlebars', engine({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
}));
app.set("view engine", 'handlebars');
app.set('views', path.resolve(__dirname, './views'))

//--------Routes
app.use('/', express.static(__dirname + '/public'))
app.use('/', routerSocket)
app.use('/chat', express.static(__dirname + '/public')) 
app.use('/chat', routerMessage)
app.use('/products', express.static(__dirname + '/public')) 
app.use('/products', routerProduct) 
app.use('/cart',express.static(__dirname + '/public'))
app.use('/cart',routerCart)
app.use('/api/sessions', routerSession)
app.use('/user', routerUser)