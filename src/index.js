import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import getRefs from './get-refs';
import { fetchBreeds, fetchCatByBreed } from "./cat-api";

// import axios from "axios";

// axios.defaults.headers.common["x-api-key"] = "live_Q9MwHdsjBD6qANkYqO01LZ5ibm2qoWRo7CQnkI4r4DnwicEZq7oWipcb1yn21vVG";
const refs = getRefs();

refs.selector.addEventListener('change', onSeachSelect);

function onSeachSelect(event) {
  loaderEl.classList.remove('unvisible');
  divPictEl.innerHTML = '';
  divDescEl.innerHTML = '';
  const breedId = event.target.value;
  console.log('breedId: ', breedId);
  fetchCatByBreed(breedId)
    .then(breed => renderBreedDesc(breed))
    // .then(breed => console.log(breed))
    .catch(error => {
      console.log(error);
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    })
    .finally(() => loaderEl.classList.add('unvisible'));
}
const fetchAndRenderBreeds = () => {
  loaderEl.classList.remove('unvisible');
  fetchBreeds()
    // .then(breeds => console.log(breeds))
    .then(breeds => renderBreedsSelect(breeds))
    .catch(error => {
      console.log(error);
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    })
    .finally(() => {
      loaderEl.classList.add('unvisible');
      breedSelect.classList.remove('unvisible');
    });
};

fetchAndRenderBreeds();

const renderBreedsSelect = breeds => {
  const markup = breeds
    .map(breed => {
      return `<option value="${breed.reference_image_id}">${breed.name}</option>`;
    })
    .join('');
  breedSelect.insertAdjacentHTML('beforeend', markup);

  new SlimSelect({
    select: '#single',
  });
};

const renderBreedDesc = breed => {
  const markupPicture = `<img class="cat-picture" src="${breed.url}" alt="${breed.id}">`;
  const markupDescript = `<h2 class="cat-info-desc-title">${breed.breeds[0].name}</h2>
    <p class="cat-info-desc-desc">${breed.breeds[0].description}</p>
    <p class="cat-info-desc-temp"><b>Temperament:</b> ${breed.breeds[0].temperament}</p>`;
  divPictEl.insertAdjacentHTML('beforeend', markupPicture);
  divDescEl.insertAdjacentHTML('beforeend', markupDescript);
};


