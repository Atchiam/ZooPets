import { Router } from "express";
import passport from "passport";
const routerGithub = Router()
// '/authSession'

//Register
routerGithub.get("/github", passport.authenticate('github'))

//Login
routerGithub.get("/githubSession", (req, res, next) => {
    passport.authenticate('github', (err, user) => {
        if (err) {
            return res.redirect('/api/sessions/login?menssage= Ocurrio un error en el registro');
        }

        req.session.login = true;
        req.session.name = user.first_name;
        req.session.role = user.role;
        return res.redirect(`/products?menssage=hola ${req.session.name } sos ${req.session.role}`);

    })(req, res, next);
});

export default routerGithub