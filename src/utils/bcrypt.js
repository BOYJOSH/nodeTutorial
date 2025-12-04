import bcrypt, { hash } from 'bcrypt';
export const hashPassword = async (data) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(data, salt)
}

export const comparePassword = async (data, hash) => {
    try {
        return await bcrypt.compare(data, hash)
    } catch (error) {
        console.error(`Error comparing data. Error: ${error}`)
    }
}
