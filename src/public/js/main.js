// codigo desde el front JS
if (window.location.pathname === "/chat/") {

    const formChat = document.getElementById("formChat")
    const mensajesChat= document.getElementById("mensajesChat")
    const imputMessage= document.getElementById("message")
    const socket = io()
    //------Chats

    formChat.addEventListener('submit',(event)=>{
        event.preventDefault();
        const info = new FormData(formChat)
        const nuevoMensaje = {}
        info.forEach((value,key)=>{
            nuevoMensaje[key]=value
        })
        socket.emit("message", nuevoMensaje);
        imputMessage.innerHTML=""
    })

    socket.on("allMessages", (messages) =>{
        mensajesChat.innerHTML=""
        messages.forEach(mensajes => {
            mensajesChat.innerHTML+=  
            `
            <li>${mensajes.user}: ${mensajes.message}</li>
            `
        });
    })
}else{
    const socket = io()
    const formAgregar = document.getElementById('formAgregarProductos');
    const formEliminar = document.getElementById('formEliminarProductos')
    //------Productos
    formAgregar.addEventListener('submit', (event) => {
        event.preventDefault();
        const info = new FormData(formAgregar)
        const nuevoProd = {}
        info.forEach((value,key)=>{
            nuevoProd[key]=value
        })     
        socket.emit("AddProduct", nuevoProd)
        ;
        formAgregar.reset()
    });

    formEliminar.addEventListener('submit', (event) => {
        event.preventDefault();
        const id = document.getElementById('borrarPodId').value; 

        socket.emit("EliminarProduct", id)
        ;
    });

    //Recivir informacion de mi servidor

    socket.on("getProducts", products =>{

        document.getElementById("productsCard").innerHTML=""

        products.forEach(product => {
            document.getElementById("productsCard").innerHTML+=  
            `
            <div class="card text-center p-2 g-col-6" style="width: 14rem;">
                <img src="${product.thumbnail}" alt="imagen" class="card-img-top">
                <h3 class="text-center ">${product.title}</h3>
                <p class="text-center card-text">${product.description}</p>
                <p class="card-title fs-5">precio: ${product.price}</p>
                <button class="btn btn-primary m-2" id= "botonProducto${product._id}">Elminar Pruducto</button>
            </div>
            `
        });

        products.forEach(product=>{
            document.getElementById(`botonProducto${product._id}`).addEventListener("click",(e)=>{
                socket.emit("EliminarProduct", product._id)
            })
        })
    })

    socket.on("confirmacionAdd", info => {
        console.log(info)
    })

    socket.on("confirmacionBorrado", info => {
        console.log(info)
    })
}