import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const renderGallery = (images) => {
  const gallery = document.querySelector('.gallery');
  const markup = images.map(image => `
    <li class="gallery-item">
      <img src="${image.webformatURL}" alt="${image.tags}" />
      <div class="info">
        <p>Likes: ${image.likes}</p>
        <p>Views: ${image.views}</p>
        <p>Comments: ${image.comments}</p>
        <p>Downloads: ${image.downloads}</p>
      </div>
    </li>
  `).join('');
  gallery.insertAdjacentHTML('beforeend', markup);
};
