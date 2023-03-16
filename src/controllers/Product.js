import { getManagerProducts } from "../dao/daoManager.js";

const data = await getManagerProducts();
const managerProduct = new data();

export default managerProduct