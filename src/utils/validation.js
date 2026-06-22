const validator = require('validator')
const validateSignupData = (req) => {
    console.log('Validation function called.......');
    const {firstName,email,mobile} = req.body

    if(firstName == ''){
        throw new Error('First name is required.')
    }

    if(!validator.isEmail(email)){
        throw new Error ('Email is not correct.')
    }

    if(!validator.isMobilePhone(mobile)){
        throw new Error('Mobile is not valid.')
    }
}

module.exports = {
    validateSignupData
}
