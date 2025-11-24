import bcrypt from 'bcrypt';
const hashPassword = async (data) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(data, salt)
}
export default hashPassword;
