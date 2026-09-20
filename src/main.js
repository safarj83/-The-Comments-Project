import { loadComments } from './data.js';
import { renderComments, updateAuthUI } from './render.js';
import { initEvents } from './events.js';

const loadingComments = document.getElementById('loadingComments');

function initApp() {
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

function initScrollButtons() {
  const scrollUp = document.getElementById('scrollUp');
  const scrollDown = document.getElementById('scrollDown');

  if (!scrollUp || !scrollDown) return;

  scrollUp.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });

  scrollDown.addEventListener('click', () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  });
}

initApp();
initEvents();
initScrollButtons();