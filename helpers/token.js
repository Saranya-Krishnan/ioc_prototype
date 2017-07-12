const setToken = function(token){
    if (token) {
        window.localStorage.setItem('token', token);
    }
};

const getToken = function(){
    return window.localStorage.getItem('token');
};

const removeToken = function(){
    return window.localStorage.removeItem('token');
};

module.exports = {
    setToken:setToken,
    getToken:getToken,
    removeToken: removeToken
};
