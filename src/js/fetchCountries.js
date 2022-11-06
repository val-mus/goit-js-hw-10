export default function fetchCountries(name) {
  fetch(`https://restcountries.com/v3.1/name/${name}`)
    .then(response => response.json)
    .then(data => console.log(data))
    .catch(error => console(error));
}
