import { register as registerAPI } from './api.js';

export function renderRegisterPage({ onRegister, onGoToLogin }) {
  const registerPage = document.getElementById('registerPage');

  registerPage.innerHTML = `
    <div class="register-form">
      <h2 class="register-title">Регистрация</h2>

      <label class="register-label">Имя</label>
      <input type="text" id="registerName" class="register-input" placeholder="Введите имя" />

      <label class="register-label">Логин</label>
      <input type="text" id="registerLogin" class="register-input" placeholder="Введите логин" />

      <label class="register-label">Пароль</label>
      <input type="password" id="registerPassword" class="register-input" placeholder="Введите пароль" />

      <button id="registerSubmit" class="register-button">Зарегистрироваться</button>

      <a href="#" id="goToLogin" class="register-link">Войти</a>

      <div id="registerError" class="error-message"></div>

      <p class="register-hint">
        С помощью приложения «Лента комментариев» вы можете оставлять свои комментарии под постами.
        Для этого вам нужно зарегистрироваться или войти в аккаунт.
      </p>
    </div>
  `;

  const nameInput = document.getElementById('registerName');
  const loginInput = document.getElementById('registerLogin');
  const passwordInput = document.getElementById('registerPassword');
  const registerButton = document.getElementById('registerSubmit');
  const errorEl = document.getElementById('registerError');
  const goToLoginLink = document.getElementById('goToLogin');

  function submit() {
    const name = nameInput.value.trim();
    const login = loginInput.value.trim();
    const password = passwordInput.value.trim();

    if (!name || !login || !password) {
      errorEl.textContent = 'Заполните все поля';
      return;
    }

    if (password.length < 6) {
      errorEl.textContent = 'Пароль должен быть не короче 6 символов';
      return;
    }

    registerButton.disabled = true;
    registerButton.textContent = 'Регистрация...';
    errorEl.textContent = '';

    registerAPI({ name, login, password })
      .then((data) => {
        onRegister(data);
      })
      .catch((error) => {
        errorEl.textContent = error.message;
      })
      .finally(() => {
        registerButton.disabled = false;
        registerButton.textContent = 'Зарегистрироваться';
      });
  }

  registerButton.addEventListener('click', submit);

  passwordInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') submit();
  });

  goToLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    onGoToLogin();
  });
}