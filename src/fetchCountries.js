import Notiflix from "notiflix";

export default function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=capital,population,languages,flags,name`
  ).then(response => {
    if (!response.ok) {
      Notiflix.Notify.failure('Oops, there is no country with that name');
      ;
    }
    return response.json();
  });
}


