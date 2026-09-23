import { renderApp, renderAddForm, renderComments, updateAuthUI } from './render.js';
import { loadComments } from './data.js';
import { initEvents } from './events.js';

function initScrollButtons() {
  const scrollUp = document.getElementById('scrollUp');
  const scrollDown = document.getElementById('scrollDown');

  scrollUp.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  scrollDown.addEventListener('click', () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  });
}

function initApp() {
  renderApp();
  renderAddForm();

  const loadingComments = document.getElementById('loadingComments');
  loadingComments.style.display = 'block';

  loadComments()
    .then(() => {
      renderComments();
      updateAuthUI();
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
initScrollButtons();