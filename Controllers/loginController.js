const { login } = require('../utils/functions.js');

const handleSubmit  = async (username, password) => {
    try {
        const data = { username: username, password: password };
        const isExists = await login(data);
        //console.log(data)
        if (!isExists)   {
            return false
        }else{
            return true
        }
    } catch (error) {
        throw error;
    }
};

module.exports = {
    handleSubmit
};