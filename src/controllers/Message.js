import { getManagerMessages } from "../dao/daoManager.js";

const data = await getManagerMessages();
const managerMessages = new data();

export default managerMessages