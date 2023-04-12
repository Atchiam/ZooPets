import managerUser from "../controllers/user.js";
import { comparePassword } from "../utils/bcrypt.js"


// const admin = {
//     first_name: "Braian",
//     last_name: "Ferreyra",
//     email: "adminCoder@coder.com",
//     age: 26,
//     password: "admincod3r123",
// }


export const testLogin = async (req, res) => {
    //Consultar datos del formulario de login
    const { email, password } = req.body
    try {
        const userlogin = await managerUser.getUserByEmail(email)  //Consultar users en mi BDD
        if (userlogin && comparePassword(password, userlogin.password)) {
            //Login correcto
            req.session.login = true
            req.session.user = userlogin
            return res.redirect(`/products?menssage=hola ${req.session.user.first_name} sos ${req.session.user.role}`)
        } else {
            res.redirect("/api/sessions/login?menssage=el email o contraseña son incorrectos", 500, {
                mensaje: `el email o contraseña son incorrectos`
            })
        }

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


export const destroySession = (req, res) => {
    if (req.session.login) {
        req.session.destroy()
        res.redirect('/api/sessions/login?menssage=hasta luego, recorda que siqueres ver nuestra pagina necesitas logiarte', 200, {
            'Message': "hasta luego, recorda que siqueres ver nuestra pagina necesitas logiarte"
        })
    } else {
        res.redirect('/api/sessions/login?menssage= necesitas estar logiado para irte', 200, {
            'Message': "necesitas estar logiado para irte"
        })
    }
}

export const getSession = (req, res) => {
    if (req.session.login) { //Si la sesion esta activa en la BDD
        res.redirect('/product?menssage=Bienvenido/a a mi tienda', 200, {
            'message': "Bienvenido/a a mi tienda"
        })
    }
    //No esta activa la sesion
    res.redirect('/api/sessions/login?menssage=necesitas logiarte para ver la pagina', 500, {
        'message': "necesitas logiarte para ver la pagina"
    })
}

export const current = async (req, res) => {
    if (req.session.login){
        res.send(req.session.user)
    }else{
        res.send("no estas logiado")
    }
}