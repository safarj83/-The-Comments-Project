import { commentsData, incrementId, loadComments } from './data.js';
import { renderComments } from './render.js';
import { getCurrentDate } from './utils.js';
import { addComment as addCommentAPI } from './api.js';

const commentsList = document.getElementById('commentsList');
const nameInput = document.getElementById('nameInput');
const textInput = document.getElementById('textInput');
const addButton = document.getElementById('addButton');
const errorMessage = document.getElementById('errorMessage');

let isFirstValidation = true;

function validateFields() {
  const name = nameInput.value.trim();
  const text = textInput.value.trim();

  if (isFirstValidation) {
    isFirstValidation = false;
    addButton.disabled = true;
    return;
  }

  nameInput.classList.remove('error');
  textInput.classList.remove('error');

  let isValid = true;
  let errorMsg = '';

  if (!name || name.length < 3) {
    nameInput.classList.add('error');
    isValid = false;
    errorMsg = 'Имя должно содержать хотя бы 3 символа';
  } else if (!text || text.length < 3) {
    textInput.classList.add('error');
    isValid = false;
    errorMsg = 'Текст должен содержать хотя бы 3 символа';
  }

  errorMessage.textContent = errorMsg;
  addButton.disabled = !isValid;
  return isValid;
}

function addComment() {
  const name = nameInput.value.trim();
  const text = textInput.value.trim();

  if (!name || name.length < 3 || !text || text.length < 3) {
    validateFields();
    return;
  }

  addButton.textContent = 'Отправка...';
  addButton.disabled = true;

  addCommentAPI({ name, text })
    .then(() => loadComments())
    .then(() => {
      renderComments();
      nameInput.value = '';
      textInput.value = '';
      errorMessage.textContent = '';
      nameInput.classList.remove('error');
      textInput.classList.remove('error');
      nameInput.focus();
    })
    .catch((error) => {
      errorMessage.textContent = error.message || 'Ошибка при добавлении комментария';
    })
    .finally(() => {
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
    validateFields();
  });

  nameInput.addEventListener('input', validateFields);
  textInput.addEventListener('input', validateFields);
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

  isFirstValidation = true;
  validateFields();
}