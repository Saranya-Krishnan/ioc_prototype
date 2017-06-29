const setToken = function(token){
    if (token) {
        window.localStorage.setItem('token', token);
    }

    //ToDo:remove
    console.log('window from helper',window.localStorage.token);
};

const getToken = function(){
    return window.localStorage.getItem('token');
};

module.exports = {
    setToken:setToken,
    getToken:getToken
};
