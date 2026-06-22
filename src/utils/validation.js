const validator = require('validator')
const validateSignupData = (req) => {
    console.log('Validation function called.......');
    const {firstName,lastName,email,password,mobile} = req.body

    if(!validator.isEmail(email)){
        throw new Error ('Email is not correct')
    }
}

module.exports = {
    validateSignupData
}
