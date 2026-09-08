const BASE_URL = 'https://wedev-api.sky.pro/api/v1';
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

export function addComment({ name, text }) {
  return fetch(`${BASE_URL}/${PERSONAL_KEY}/comments`, {
    method: 'POST',
    body: JSON.stringify({ name, text, forceError: true }), 
  })
    .then((response) => {
      if (response.status === 400) {
        return response.json().then((errorData) => {
          throw new Error(errorData.error || 'Имя и комментарий должны быть не короче 3 символов');
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