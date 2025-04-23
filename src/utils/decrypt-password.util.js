const decryptPassword = (encodedPassword) => {
    try {
        return Buffer.from(encodedPassword, 'base64').toString()
    } catch (error) {
        console.error('Decoding error:', error)
        throw new Error('Failed to decode password')
    }
}

// const encryptPassword = (plainPassword) => {
//     try {
//         return Buffer.from(plainPassword).toString('base64')
//     } catch (error) {
//         console.error('Encoding error:', error)
//         throw new Error('Failed to encode password')
//     }
// }

// console.log(encryptPassword('Test125@'))

export default decryptPassword
