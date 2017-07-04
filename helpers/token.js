const setToken = function(token){
    if (token) {
        window.localStorage.setItem('token', token);
    }
};

const getToken = function(){
    return window.localStorage.getItem('token');
};

module.exports = {
    setToken:setToken,
    getToken:getToken
};
