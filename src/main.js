import { loadComments } from './data.js';
import { renderComments } from './render.js';
import { initEvents } from './events.js';

async function init() {
  try {
    await loadComments();
    renderComments();
    initEvents();
  } catch (error) {
    console.error('Ошибка инициализации:', error);
    const errorMessage = document.getElementById('errorMessage');
    if (errorMessage) {
      errorMessage.textContent = 'Не удалось загрузить комментарии. Попробуйте обновить страницу.';
    }
  }
}

init();