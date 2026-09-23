import { commentsData, user } from './data.js';

export function renderApp() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <div class="container">
      <div id="loginPage" class="login-page" style="display: none;"></div>
      <div id="registerPage" class="register-page" style="display: none;"></div>

      <div id="commentsPage" class="comments-page">
        <div id="loadingComments" class="loading" style="display: none;">
          Загрузка комментариев...
        </div>

        <ul class="comments" id="commentsList"></ul>

        <div id="authLink" class="auth-link" style="display: none;">
          <a href="#" id="goToLogin">Чтобы добавить комментарий, авторизуйтесь</a>
        </div>

        <div id="addFormContainer" style="display: none;"></div>

        <div id="addingComment" class="loading" style="display: none;">
          Комментарий добавляется...
        </div>
      </div>
    </div>

    <div class="scroll-buttons">
      <button class="scroll-btn" id="scrollUp" aria-label="Вверх">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 15L12 9L18 15" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <button class="scroll-btn" id="scrollDown" aria-label="Вниз">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  `;
}

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
  const container = document.getElementById('addFormContainer');

  container.innerHTML = `
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