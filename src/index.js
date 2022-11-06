import './css/styles.css';

function fetchCountries(name) {
  return fetch(`https://restcountries.com/v3.1/name/${name}`)
    .then(response => response.json())
    .then(data => console.log(data));
}

fetchCountries('uk');

const DEBOUNCE_DELAY = 300;
