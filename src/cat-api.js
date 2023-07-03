const BASE_URL_BREEDS = `https://api.thecatapi.com/v1/breeds`;
const BASE_URL_ID = `https://api.thecatapi.com/v1/images/search`;

const KEY = 'live_Q9MwHdsjBD6qANkYqO01LZ5ibm2qoWRo7CQnkI4r4DnwicEZq7oWipcb1yn21vVG';

export function fetchBreeds(){
 return fetch(`${BASE_URL_BREEDS}?api_key=${KEY}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};

export function fetchCatByBreed(breedId) {
  return fetch(`${BASE_URL_ID}/${breedId}?api_key=${KEY}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};
