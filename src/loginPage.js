import { login as loginAPI } from './api.js';

export function renderLoginPage({ onLogin, onBack, onGoToRegister }) {
  const loginPage = document.getElementById('loginPage');

  loginPage.innerHTML = `
    <div class="login-form">
      <h2 class="login-title">Вход</h2>
      <input type="text" id="loginInput" class="login-input" placeholder="Логин" />
      <input type="password" id="passwordInput" class="login-input" placeholder="Пароль" />
      <button id="loginButton" class="login-button">Войти</button>
      <div id="loginError" class="error-message"></div>
      <a href="#" id="goToRegister" class="register-link">Зарегистрироваться</a>
      <a href="#" id="backToComments" class="back-link">← Вернуться к комментариям</a>
    </div>
  `;

  const loginInput = document.getElementById('loginInput');
  const passwordInput = document.getElementById('passwordInput');
  const loginButton = document.getElementById('loginButton');
  const loginError = document.getElementById('loginError');
  const goToRegister = document.getElementById('goToRegister');
  const backToComments = document.getElementById('backToComments');

  function submit() {
    const login = loginInput.value.trim();
    const password = passwordInput.value.trim();

    if (!login || !password) {
      loginError.textContent = 'Заполните логин и пароль';
      return;
    }

    loginButton.disabled = true;
    loginButton.textContent = 'Вход...';
    loginError.textContent = '';

    loginAPI({ login, password })
      .then((data) => {
        onLogin(data);
      })
      .catch((error) => {
        loginError.textContent = error.message;
      })
      .finally(() => {
        loginButton.disabled = false;
        loginButton.textContent = 'Войти';
      });
  }

  loginButton.addEventListener('click', submit);

  passwordInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') submit();
  });

  goToRegister.addEventListener('click', (e) => {
    e.preventDefault();
    onGoToRegister();
  });

  backToComments.addEventListener('click', (e) => {
    e.preventDefault();
    onBack();
  });
}