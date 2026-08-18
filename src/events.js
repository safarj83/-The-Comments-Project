import { commentsData, incrementId } from './data.js';
import { renderComments } from './render.js';
import { getCurrentDate } from './utils.js';

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

  if (!name) {
    nameInput.classList.add('error');
    isValid = false;
    errorMsg = 'Пожалуйста, укажите ваше имя';
  } else if (!text) {
    textInput.classList.add('error');
    isValid = false;
    errorMsg = 'Пожалуйста, введите текст комментария';
  }

  errorMessage.textContent = errorMsg;
  addButton.disabled = !isValid;
  return isValid;
}

function addComment() {
  // ✅ Убрали sanitizeHTML — теперь сохраняем как есть
  const name = nameInput.value.trim();
  const text = textInput.value.trim();

  if (!name || !text) {
    validateFields();
    return;
  }

  const newComment = {
    id: incrementId(),
    name,
    date: getCurrentDate(),
    text,
    likes: 0,
    isLiked: false,
  };

  commentsData.push(newComment);
  renderComments();

  nameInput.value = '';
  textInput.value = '';
  addButton.disabled = true;
  errorMessage.textContent = '';
  nameInput.classList.remove('error');
  textInput.classList.remove('error');
  nameInput.focus();
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

    // ✅ Теперь comment.text — чистый текст, без лишних замен
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