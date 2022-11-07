import './css/styles.css';
import debounce from 'lodash.debounce';

import Notiflix from 'notiflix';

import fetchCountries from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const getEl = element => document.querySelector(element);

const countryList = getEl('.country-list');
const countryInfo = getEl('.country-info');

const userInputField = getEl('#search-box');

userInputField.addEventListener('input', debounce(onUserInput, DEBOUNCE_DELAY));

function changeInterface(markup, descMarkup) {
  countryList.innerHTML = markup;
  countryInfo.innerHTML = descMarkup;
}

function onUserInput(e) {
  let userInput = e.target.value.trim();

  if (userInput === '') {
    changeInterface('', '');
    return;
  }

  fetchCountries(userInput)
    .then(data => {
      if (data.length > 10) {
        changeInterface('', '');
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      } else if (data.length === 1) {
        const markup = `<li class = "country-list__item">
      <img class="country-list__icon" src="${data[0].flags.svg}" alt="${data[0].name.common}">
      <p class="country-list__name accent">${data[0].name.official}</p>
      </li>`;

        const descMarkup = `<ul>
      <li class = "country-info__desc"><b>Capital: </b>${data[0].capital}</li>
      <li class = "country-info__desc"><b>Population: </b>${
        data[0].population
      } </li>
      <li class = "country-info__desc"><b>Languages: </b>${Object.values(
        data[0].languages
      )}</li>
    </ul>`;
        changeInterface(markup, descMarkup);
      } else {
        const markup = data
          .sort(function (a, b) {
            if (a.name.common > b.name.common) {
              return 1;
            }
            if (a.name.common < b.name.common) {
              return -1;
            }
            return 0;
          })
          .map(
            item => `<li class = "country-list__item">
                  <img class=country-list__icon src="${item.flags.svg}" alt="Flag of the ${item.name.common}">
                  <p class=country-list__name >${item.name.common}</p>
                  </li>`
          )
          .join('');
        changeInterface(markup, '');
      }
    })
    .catch(changeInterface('', ''));
}
