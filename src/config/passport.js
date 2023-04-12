import local from "passport-local"
import passport from "passport"
import managerUser from "../controllers/user.js"
import { createHash, comparePassword } from "../utils/bcrypt.js"
import GitHubStrategy from 'passport-github2'
import { getManagerCart } from "../dao/daoManager.js"


const data = await getManagerCart();
export const managerCart = new data();

//Passport se va a manejar como si fuera un middleware 
const LocalStrategy = local.Strategy //Estretagia local de autenticacion


const initializePassport = () =>{

    passport.use("signup", new LocalStrategy(
        {passReqToCallback: true, usernameField: "email"}, async (req,username, password,done)=>{
            //validar y crear user
            const { first_name, last_name, email, age} = req.body
            try {
                const userlogin = await managerUser.getUserByEmail(username)  //Consultar users en mi BDD
                console.log(userlogin);
                if (userlogin ) { 
                    //Login correcto
                    //User existente
                return done(null, false) //null = errores false no se creo el user
                } else {
                    const newCart = await managerCart.addElements()
                    console.log(newCart);
                    const hashPassword = createHash(password)
                    const userCreated= await managerUser.newUser({
                        first_name: first_name,
                        last_name: last_name,
                        email: email,
                        age: age,
                        password: hashPassword,
                        cartId:newCart[0]._id
                    })
                    console.log(userCreated);
                    return done(null, userCreated)
                }
                
            } catch (error) {
                return done (error)
            }
        }
    ))

    passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {

        try {
            const user = await managerUser.getUserByEmail(username)
            if (!user) { //Usuario no encontrado
                return done(null, false)
            }
            if (comparePassword(password, user.password)) { //Usuario y contraseña validos
                return done(null, user)
            }
            return done(null, false) //Contraseña no valida
        } catch (error) {
            return done(error)
        }
    }))


    passport.use("github", new GitHubStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:8080/authSession/githubSession"
    },async(accessToken, refreshToken, profile, done)=>{
        try{
            const user = await managerUser.getUserByEmail(profile._json.email)
    
            if(user){ //user ya existe en BD
                done(null, user)
            }else{
                const newCart = managerCart.addElements()
                const passwordHash = createHash('coder123')
                const userCreated= await managerUser.newUser({
                    first_name: profile._json.name,
                    last_name: "  ",
                    email: profile._json.email,
                    age: 18,
                    password: passwordHash,
                    cartId:newCart[0]._id
                })
                console.log(profile._json);
                console.log(userCreated);
                done(null, userCreated)
    
            }
        }catch(error){
            return(error)
        }
    }))



    //Iniciar la session del usuario
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    //Eliminar la sesion del usuario
    passport.deserializeUser(async (id, done) => {
        const user = await managerUser.getElementById(id)
        done(null, user)
    })
} 

export default initializePassport