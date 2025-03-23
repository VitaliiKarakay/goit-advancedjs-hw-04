import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function renderGallery(images) {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = images
    .map(
      image => `
        <a href="${image.largeImageURL}" class="gallery-item">
            <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy"/>
            <div class="info">
                <p>👍 ${image.likes}</p>
                <p>👁 ${image.views}</p>
                <p>💬 ${image.comments}</p>
                <p>⬇️ ${image.downloads}</p>
            </div>
        </a>
    `
    )
    .join('');

  const lightbox = new SimpleLightbox('.gallery a');
  lightbox.refresh();
}
