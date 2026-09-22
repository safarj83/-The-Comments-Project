import { commentsData, user } from './data.js';

export function renderComments() {
  const commentsList = document.getElementById('commentsList');

  commentsList.innerHTML = commentsData
    .map((comment) => {
      return `
        <li class="comment" data-id="${comment.id}">
          <div class="comment-header">
            <div>${comment.name}</div>
            <div>${comment.date}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">${comment.text}</div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.likes}</span>
              <button class="like-button ${comment.isLiked ? 'active' : ''} ${!user ? 'disabled' : ''}" data-id="${comment.id}"></button>
            </div>
          </div>
        </li>
      `;
    })
    .join('');
}

export function renderAddForm() {
  const addFormContainer = document.getElementById('addFormContainer');

  addFormContainer.innerHTML = `
    <div class="add-form">
      <input type="text" class="add-form-name" id="nameInput" readonly>
      <textarea class="add-form-text" id="textInput" placeholder="Введите ваш комментарий" rows="4"></textarea>
      <div class="add-form-row">
        <button class="add-form-button" id="addButton">Написать</button>
        <button class="add-form-button logout-button" id="logoutButton">Выйти</button>
      </div>
      <div class="error-message" id="errorMessage"></div>
    </div>
  `;
}

export function updateAuthUI() {
  const authLink = document.getElementById('authLink');
  const addFormContainer = document.getElementById('addFormContainer');
  const nameInput = document.getElementById('nameInput');

  if (user) {
    authLink.style.display = 'none';
    addFormContainer.style.display = 'block';
    nameInput.value = user.name;
  } else {
    authLink.style.display = 'block';
    addFormContainer.style.display = 'none';
    nameInput.value = '';
  }
}