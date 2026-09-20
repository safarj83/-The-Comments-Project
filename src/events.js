import { commentsData, loadComments, user, setUser } from './data.js';
import { renderComments, updateAuthUI } from './render.js';
import { addComment as addCommentAPI } from './api.js';
import { renderLoginPage } from './loginPage.js';
import { renderRegisterPage } from './registerPage.js';

const commentsList = document.getElementById('commentsList');
const nameInput = document.getElementById('nameInput');
const textInput = document.getElementById('textInput');
const addButton = document.getElementById('addButton');
const errorMessage = document.getElementById('errorMessage');
const addFormContainer = document.getElementById('addFormContainer');
const addingComment = document.getElementById('addingComment');
const authLink = document.getElementById('authLink');
const commentsPage = document.getElementById('commentsPage');
const loginPage = document.getElementById('loginPage');
const registerPage = document.getElementById('registerPage');

function hideAllPages() {
  commentsPage.style.display = 'none';
  loginPage.style.display = 'none';
  registerPage.style.display = 'none';
  document.body.classList.add('has-modal');
}

function showCommentsPage() {
  hideAllPages();
  commentsPage.style.display = 'block';
  document.body.classList.remove('has-modal');
}

function showLoginPage() {
  hideAllPages();
  loginPage.style.display = 'flex';

  renderLoginPage({
    onLogin: (data) => {
      setUser(data.user);
      showCommentsPage();
      updateAuthUI();
      renderComments();
    },
    onBack: showCommentsPage,
    onGoToRegister: showRegisterPage,
  });
}

function showRegisterPage() {
  hideAllPages();
  registerPage.style.display = 'flex';

  renderRegisterPage({
    onRegister: () => {
      showLoginPage();
    },
    onGoToLogin: showLoginPage,
  });
}

function addComment() {
  const text = textInput.value.trim();

  if (text.length < 3) {
    alert('Комментарий должен быть не короче 3 символов');
    return;
  }

  addFormContainer.style.display = 'none';
  addingComment.style.display = 'block';
  errorMessage.textContent = '';

  addCommentAPI({ text, token: user.token })
    .then(() => loadComments())
    .then(() => {
      renderComments();
      textInput.value = '';
      errorMessage.textContent = '';
    })
    .catch((error) => {
      alert(error.message);
    })
    .finally(() => {
      addFormContainer.style.display = 'block';
      addingComment.style.display = 'none';
      addButton.disabled = false;
    });
}

function logout() {
  setUser(null);
  updateAuthUI();
  renderComments();
}

export function initEvents() {
  commentsList.addEventListener('click', (e) => {
    const likeButton = e.target.closest('.like-button');
    if (likeButton) {
      const commentId = likeButton.dataset.id;
      const comment = commentsData.find((c) => c.id === commentId);
      if (!comment) return;
      comment.isLiked = !comment.isLiked;
      comment.likes += comment.isLiked ? 1 : -1;
      renderComments();
      return;
    }

    const commentElement = e.target.closest('.comment');
    if (!commentElement) return;
    const commentId = commentElement.dataset.id;
    const comment = commentsData.find((c) => c.id === commentId);
    if (!comment) return;

    textInput.value = `> ${comment.name}: ${comment.text}`;
    textInput.focus();
  });

  addButton.addEventListener('click', addComment);

  textInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      e.preventDefault();
      addComment();
    }
  });

  authLink.addEventListener('click', (e) => {
    e.preventDefault();
    showLoginPage();
  });

  const logoutButton = document.getElementById('logoutButton');
  if (logoutButton) {
    logoutButton.addEventListener('click', logout);
  }

  updateAuthUI();
}