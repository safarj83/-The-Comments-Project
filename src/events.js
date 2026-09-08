import { commentsData, loadComments } from './data.js';
import { renderComments } from './render.js';
import { addComment as addCommentAPI } from './api.js';

const commentsList = document.getElementById('commentsList');
const nameInput = document.getElementById('nameInput');
const textInput = document.getElementById('textInput');
const addButton = document.getElementById('addButton');
const errorMessage = document.getElementById('errorMessage');
const addFormContainer = document.getElementById('addFormContainer');
const addingComment = document.getElementById('addingComment');

function addComment() {
  const name = nameInput.value.trim();
  const text = textInput.value.trim();

  // По требованиям ДЗ №7: если меньше 3 символов, показываем alert и НЕ отправляем
  if (name.length < 3 || text.length < 3) {
    alert('Имя и комментарий должны быть не короче 3 символов');
    return; 
  }

  // Скрываем форму и показываем лоадер
  addFormContainer.style.display = 'none';
  addingComment.style.display = 'block';
  errorMessage.textContent = '';

  addCommentAPI({ name, text })
    .then(() => loadComments())
    .then(() => {
      renderComments();
      // Очищаем поля ТОЛЬКО при успехе
      nameInput.value = '';
      textInput.value = '';
      errorMessage.textContent = '';
      nameInput.classList.remove('error');
      textInput.classList.remove('error');
      nameInput.focus();
    })
    .catch((error) => {
      // Показываем alert с текстом ошибки (400, 500, интернет)
      alert(error.message);
      // Текст в полях НЕ сбрасывается
    })
    .finally(() => {
      addFormContainer.style.display = 'block';
      addingComment.style.display = 'none';
      addButton.textContent = 'Написать';
      addButton.disabled = false;
    });
}

export function initEvents() {
  commentsList.addEventListener('click', (e) => {
    const likeButton = e.target.closest('.like-button');
    if (likeButton) {
      const commentId = parseInt(likeButton.dataset.id, 10);
      const comment = commentsData.find((c) => c.id === commentId);
      if (!comment) return;
      comment.isLiked = !comment.isLiked;
      comment.likes += comment.isLiked ? 1 : -1;
      renderComments();
      return;
    }

    const commentElement = e.target.closest('.comment');
    if (!commentElement) return;
    const commentId = parseInt(commentElement.dataset.id, 10);
    const comment = commentsData.find((c) => c.id === commentId);
    if (!comment) return;

    textInput.value = `> ${comment.name}: ${comment.text}`;
    textInput.focus();
  });

  nameInput.addEventListener('input', () => {
    nameInput.classList.remove('error');
    errorMessage.textContent = '';
  });

  textInput.addEventListener('input', () => {
    textInput.classList.remove('error');
    errorMessage.textContent = '';
  });

  addButton.addEventListener('click', addComment);

  nameInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      textInput.focus();
    }
  });

  textInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      e.preventDefault();
      addComment();
    }
  });
}