const { API_URL } =require ("./constants.js");

const login = async(data) => {
    try {
        const resp = await API_URL.post('/api/auth/singin', data);
        console.log(resp);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    login 
}