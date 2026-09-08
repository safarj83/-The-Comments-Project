import { loadComments } from './data.js';
import { renderComments } from './render.js';
import { initEvents } from './events.js';

const loadingComments = document.getElementById('loadingComments');

function initApp() {
  loadingComments.style.display = 'block';

  loadComments()
    .then(() => {
      renderComments();
    })
    .catch((error) => {
      alert(error.message);
    })
    .finally(() => {
      loadingComments.style.display = 'none';
    });
}

initApp();
initEvents();