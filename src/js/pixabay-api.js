import axios from 'axios';

const API_KEY = '49486177-f5d6b48135fe4ab0dc5f3c055';
const BASE_URL = 'https://pixabay.com/api/';
const IMAGE_TYPE = 'photo';
const ORIENTATION = 'horizontal';
const SAFESEARCH = true;
const PER_PAGE = 15;

console.log(`${API_KEY}`);

export const fetchImagesAxios = async (query, page = 1) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: IMAGE_TYPE,
        orientation: ORIENTATION,
        safesearch: SAFESEARCH,
        per_page: PER_PAGE,
        page: page,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
};
