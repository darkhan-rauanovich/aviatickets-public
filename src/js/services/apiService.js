// наш Api с методами получение список стран и городов
import axios from "axios";
import config from "../config/apiConfig";
/***
 * /countries - array of countries
 * /cities - array of cities
 * /prices/cheap - array of available flights 
*/
class Api {
    constructor(config){
        this.url = config.url;
        this.urlGetPrice = config.urlGetPrice;
    }
    async countries() {
        try {
            const response = await axios.get(`${this.url}/countries`);
            return response.data;
        }catch(err) {
            console.log(err);
            return Promise.reject(err);
        }
    }
    async cities() {
        try {
            const response = await axios.get(`${this.url}/cities`);
            return response.data;
        }catch(err) {
            console.log(err);
            return Promise.reject(err);
        }
    }
    async prices(params,configure) {
        try {
            const response = await axios.get(`${this.urlGetPrice}`,{
                params,
            },configure);
            return response.data;
        }catch(err) {
            console.log(err);
            return Promise.reject(err);
        }
    }
}

const api = new Api(config);


export default api;