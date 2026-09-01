import { loadComments } from './data.js';
import { renderComments } from './render.js';
import { initEvents } from './events.js';

const loadingComments = document.getElementById('loadingComments');

export function initApp() {
  loadingComments.style.display = 'block';

  loadComments()
    .then(() => {
      renderComments();
    })
    .catch((error) => {
      console.error('Ошибка загрузки комментариев:', error);
    })
    .finally(() => {
      loadingComments.style.display = 'none';
    });
}

initApp();
initEvents();