import bcrypt from 'bcrypt';

export const createHash = (password) => {
    const saltRound = parseInt(process.env.SALT);
    const hash= bcrypt.hashSync(password,saltRound);
    return hash
}

export const comparePassword = (passwordLogin, passwordDB) => {
    return bcrypt.compareSync(passwordLogin, passwordDB);
}