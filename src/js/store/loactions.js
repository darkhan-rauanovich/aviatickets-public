// через файлы store мы обрящяемся к apiServices и получаем и сохроняем данные чтобы в дальнейшом использовать их в app.js

import api from "../services/apiService";
// создаем класс Locations и наследуем своиства экземпляра класса Api(api) для получение списков стран и городов
class Locations {
    constructor(api) {
        this.api = api;
        this.countries = null; // создаем обьект внутри класса страны(counrty) и изначальная значение равно null
        this.cities = null; // создаем обьект внутри класса города(cities) и изначальная значение равно null
        this.shortCitiesList = null; // обьект для работы autocomplete
    }
    async init(){ // метод init использует методы наследованные от класса Api для получения данных
        const response = await Promise.all([
            this.api.countries(),
            this.api.cities()
        ])

        const [countries,cities] = response;
        this.countries = this.serializeCountries(countries);
        this.cities = this.serializeCities(cities);
        this.shortCitiesList = this.createShortCitiesList(this.cities);
        console.log(this.cities);

        return response;
    }

    getCityCodeByKey(key){
        return this.cities[key].code;
    }

    createShortCitiesList(cities){
        // { 'City, country': null }
        //  Object.entries => [key, value] => { 'City, country': null }
        return Object.entries(cities).reduce((acc,[key])=>{
            acc[key] = null;
            return acc;
        },{})
    }

    serializeCountries(countries){
        // { 'country code': { ... } }
        return countries.reduce((acc, counrty) => {
            acc[counrty.code] = counrty;
            return acc;
        }, {})
    }

    getCountryNameByCode(code){
        return this.countries[code].name;
    }

    serializeCities(cities){
        // { 'City name, Country name': {...} }
        // формиурем из списка удобный обьект для дальнейшего использование
        return cities.reduce((acc,city)=>{
            const country_name = this.getCountryNameByCode(city.country_code);
            const city_name = city.name || city.name_translations.en;
            const key = `${city_name},${country_name}`;
            acc[key] = city;
            return acc;
        },{})
    }

    async fetchTickets(params,configure){
        const response = await this.api.prices(params,configure);
        console.log(response);
    }
}

const locations = new Locations(api);

export default locations;

// { 'City, Country': null } autocomplete
// [{},{}] => { 'country':{...} } => cities[code] cities countryes
// { 'country':{...} } => cities[code] array to objects