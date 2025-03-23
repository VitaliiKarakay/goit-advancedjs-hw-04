import { fetchImagesAxios } from './js/pixabay-api.js';
import { renderGallery } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('#load-more');
const loader = document.querySelector('.loader');

let query = '';
let page = 1;
let totalHits = 0;
let loadedHits = 0;

form.addEventListener('submit', async event => {
  event.preventDefault();
  query = event.target.search.value.trim();
  if (!query) {
    iziToast.error({ title: 'Error', message: 'Please enter a search query!' });
    return;
  }

  page = 1;
  totalHits = 0;
  loadedHits = 0;
  gallery.innerHTML = '';
  loadMoreBtn.style.display = 'none';
  loader.style.display = 'block';

  await new Promise(resolve => setTimeout(resolve, 350));

  try {
    const data = await fetchImagesAxios(query, page);
    loader.style.display = 'none';
    totalHits = data.totalHits;
    loadedHits = data.hits.length;

    if (data.hits.length === 0) {
      iziToast.warning({
        title: 'No Results',
        message: 'Sorry, no images found!',
        position: 'center',
      });
    } else {
      renderGallery(data.hits);
      if (loadedHits < totalHits) {
        loadMoreBtn.style.display = 'block';
      }
    }
  } catch (error) {
    loader.style.display = 'none';
    iziToast.error({ title: 'Error', message: 'Failed to fetch images!' });
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  loader.style.display = 'block';

  await new Promise(resolve => setTimeout(resolve, 350));

  try {
    const data = await fetchImagesAxios(query, page);
    loader.style.display = 'none';
    loadedHits += data.hits.length;

    if (data.hits.length === 0 || loadedHits >= totalHits) {
      loadMoreBtn.style.display = 'none';
      iziToast.info({
        title: 'End of Results',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'center',
      });
    } else {
      renderGallery(data.hits);
      smoothScroll();
    }
  } catch (error) {
    loader.style.display = 'none';
    iziToast.error({ title: 'Error', message: 'Failed to fetch images!' });
  }
});

function smoothScroll() {
  const galleryItem = document.querySelector('.gallery-item');
  if (galleryItem) {
    const { height } = galleryItem.getBoundingClientRect();
    window.scrollBy({
      top: height * 2,
      behavior: 'smooth',
    });
  }
}