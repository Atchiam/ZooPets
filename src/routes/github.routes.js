import { Router } from "express";
import passport from "passport";
const routerGithub = Router()
// '/authSession'

//Register
routerGithub.get("/github", passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => { })

//Login
routerGithub.get("/githubSession", passport.authenticate('github'), async (req, res) => {
    req.session.user = req.user
    res.redirect('/products')
    console.log(req.user);
    console.log(JSON.stringify(req.user));
})

export default routerGithub