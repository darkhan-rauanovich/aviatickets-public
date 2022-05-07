import { getAutocompleteInstance, getDatePickerInstance } from '../plugins/materialize';
// импротируем из плагина функций для получения методов над элементами формы

class FormUI {
    constructor(autocompleteInstance,datePickerInstance) {
        // вытащили сами элементы
        this._form = document.forms['loactionControls'];
        this.origin = document.getElementById('autocomplete-origin');
        this.destination = document.getElementById('autocomplete-destination');
        this.depart = document.getElementById('datepicker-depart');
        this.return = document.getElementById('datepicker-return');
        // вытащили instance элементов для того чтобы мы могли вызвать у них методы 
        this.originAutocomplete = autocompleteInstance(this.origin);
        this.destinationAutocomplete = autocompleteInstance(this.destination);
        this.departDatePicker = datePickerInstance(this.depart);
        this.returnDatePicker = datePickerInstance(this.return);
    }
    // геттер для получения формы
    get form() {
        return this._form;
    }
    // для того чтобы мы могли использовать его в app.js

    get originValue() {
        return this.origin.value;
    }

    get destinationValue() {
        return this.destination.value;
    }

    get departDateValue() {
        return this.departDatePicker.toString();
    }

    get returnDateValue() {
        return this.returnDatePicker.toString();
    }

    setAutocompleteData(data){
        this.originAutocomplete.updateData(data);
        this.destinationAutocomplete.updateData(data);
    }

}

const formUI = new FormUI(getAutocompleteInstance, getDatePickerInstance);

export default formUI;