import { getManagerCart } from "../dao/daoManager.js";

const data = await getManagerCart();
const managerCart = new data();

export default managerCart