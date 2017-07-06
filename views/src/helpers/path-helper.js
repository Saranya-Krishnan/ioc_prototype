require('dotenv').config();
class PathHelper {
    constructor(){
        this.baseUrl = process.env.BASE_URL;
        this.clientPort = process.env.CLIENT_PORT;
        this.apiPort = process.env.API_PORT;
        this.apiVersion = process.env.API_VERSION;
    }
    getAPIPath(){
        console.log(this.baseUrl+':'+this.apiPort+'/api/'+this.apiVersion);
        return this.baseUrl+':'+this.apiPort+'/api/'+this.apiVersion;
    }
    getClientPath(){
        return this.baseUrl+':'+this.clientPort;
    }
}

const ph = new PathHelper();
console.log('ph',ph.getAPIPath());
module.exports = {
    apiPath:ph.getAPIPath(),
    clientPath:ph.getClientPath()
};
