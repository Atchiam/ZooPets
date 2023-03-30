import { getManagerUser } from "../dao/daoManager.js";

const data = await getManagerUser()
const managerUser = new data();

export const createUser = async (req, res) => {
    res.redirect("/api/sessions/login?menssage=ya podes logiarte :)",200,{mensaje:` ya podes logiarte :)`})
}

export default managerUser