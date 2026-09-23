const BASE_URL = 'https://wedev-api.sky.pro/api/v2';
const AUTH_URL = 'https://wedev-api.sky.pro/api/user';
const PERSONAL_KEY = 'gleb-fokin';

export function getComments() {
  return fetch(`${BASE_URL}/${PERSONAL_KEY}/comments`)
    .then((response) => {
      if (response.status === 500) {
        throw new Error('Сервер сломался, попробуй позже');
      }
      if (!response.ok) {
        throw new Error(`Ошибка загрузки: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (!data || !data.comments) {
        throw new Error('Некорректный ответ от сервера');
      }
      return data.comments;
    })
    .catch((error) => {
      if (error instanceof TypeError) {
        throw new Error('Кажется, у вас сломался интернет, попробуйте позже');
      }
      throw error;
    });
}

export function addComment({ text, token }) {
  return fetch(`${BASE_URL}/${PERSONAL_KEY}/comments`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ text }),
  })
    .then((response) => {
      if (response.status === 400) {
        return response.json().then((errorData) => {
          throw new Error(errorData.error || 'Комментарий должен быть не короче 3 символов');
        });
      }
      if (response.status === 401) {
        throw new Error('Вы не авторизованы. Пожалуйста, войдите заново');
      }
      if (response.status === 500) {
        throw new Error('Сервер сломался, попробуй позже');
      }
      if (!response.ok) {
        throw new Error(`Ошибка ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      if (error instanceof TypeError) {
        throw new Error('Кажется, у вас сломался интернет, попробуйте позже');
      }
      throw error;
    });
}

export function login({ login, password }) {
  return fetch(`${AUTH_URL}/login`, {
    method: 'POST',
    body: JSON.stringify({ login, password }),
  })
    .then((response) => {
      if (response.status === 400 || response.status === 401) {
        return response.json().then((errorData) => {
          throw new Error(errorData.error || 'Неверный логин или пароль');
        });
      }
      if (response.status === 500) {
        throw new Error('Сервер сломался, попробуй позже');
      }
      if (!response.ok) {
        throw new Error(`Ошибка ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      if (error instanceof TypeError) {
        throw new Error('Кажется, у вас сломался интернет, попробуйте позже');
      }
      throw error;
    });
}

export function register({ name, login, password }) {
  return fetch(`${AUTH_URL}`, {
    method: 'POST',
    body: JSON.stringify({ name, login, password }),
  })
    .then((response) => {
      if (response.status === 400) {
        return response.json().then((errorData) => {
          throw new Error(errorData.error || 'Ошибка регистрации');
        });
      }
      if (response.status === 500) {
        throw new Error('Сервер сломался, попробуй позже');
      }
      if (!response.ok) {
        throw new Error(`Ошибка ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      if (error instanceof TypeError) {
        throw new Error('Кажется, у вас сломался интернет, попробуйте позже');
      }
      throw error;
    });
}