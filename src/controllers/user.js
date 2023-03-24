import { getManagerUser } from "../dao/daoManager.js";
import {createHash} from "../utils/bcrypt.js"

const data = await getManagerUser()
const managerUser = new data();

export const createUser = async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body

    try {
        const user = await managerUser.getUserByEmail(email)
        console.log(user);
        if (user) {
            res.redirect("/user?menssage=el usuario ya se encuentra en uso",500,{mensaje:"el usuario ya se encuentra en uso"})
        }else{
            const hashPassword = createHash(password);

            await managerUser.addElements([{
                first_name: first_name,
                last_name: last_name,
                email: email,
                age: age,
                password: hashPassword
            }])
            res.redirect("/api/sessions/login?menssage=ya podes logiarte :)",200,{mensaje:` ya podes logiarte :)`})
        }

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export default managerUser