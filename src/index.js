import './sass/main.scss'
import _debounce from 'lodash.debounce';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import fetchCountries from './js/fetchCountries'
import countriesListTpl from './handlebars/countries-list.hbs';
import oneCountryTpl from './handlebars/one-country.hbs';

const { error } = require('@pnotify/core');
const inputNode = document.querySelector('#country-input');
const countriesContainerNode = document.querySelector('.countries-container');

inputNode.addEventListener('input', _debounce(() => {
  countriesContainerNode.innerHTML = '';
    fetchCountries(inputNode.value)
    .then((data) => {
      if (data.status && data.status !== 200) {
        error({ text: 'No country found. Please enter again!' });
        return;
      }

      if (data.length > 10) {
        error({ text: "Too many matches found. Please enter a more specific query!" })
      }

      if (data.length === 1) {
        countriesContainerNode.insertAdjacentHTML('beforeend', oneCountryTpl(data[0]));
        return;
      }

      if (data.length <= 10) {
        countriesContainerNode.insertAdjacentHTML('beforeend', countriesListTpl(data));
      }

    })
}, 1000 
));



