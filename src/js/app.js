import '../css/style.css';
import './plugins';
import locations from "./store/loactions";
import formUI from "./views/form";
import currencyUi from './views/currency';
import config from './config/apiConfig'


document.addEventListener('DOMContentLoaded', ()=>{
    initApp();

    const form = formUI.form;

    // Events
    form.addEventListener('submit',(e)=>{
        e.preventDefault();
        onFormSubmit();
    })

    // handlers
    async function initApp(){
        await locations.init(); // получили данные через store
        console.log(locations.shortCitiesList);
        formUI.setAutocompleteData(locations.shortCitiesList) // и отправляем уже сформированные данные в функцию autocomplete
    }

    async function onFormSubmit() {
        // собрать данные из input
        const origin = locations.getCityCodeByKey(formUI.originValue);
        const destination = locations.getCityCodeByKey(formUI.destinationValue);
        const departure_at = formUI.departDateValue;
        const return_at = formUI.returnDateValue;
        const currency = currencyUi.currencyValue;
        // Code, code, 2019-09, 2019-10
        console.log(origin,destination,departure_at,return_at,currency);
        await locations.fetchTickets({
            currency,
            origin,
            destination,
            departure_at,
            return_at,
            token: config.token
        });
    }
})