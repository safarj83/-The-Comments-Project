const BASE_URL = 'https://wedev-api.sky.pro/api/v1';
const PERSONAL_KEY = 'gleb-fokin'; 

export function getComments() {
  return fetch(`${BASE_URL}/${PERSONAL_KEY}/comments`)
    .then((response) => {
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
    });
}

export function addComment({ name, text }) {
  return fetch(`${BASE_URL}/${PERSONAL_KEY}/comments`, {
    method: 'POST',
    body: JSON.stringify({ name, text }),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((errorData) => {
          throw new Error(errorData.error || `Ошибка ${response.status}`);
        });
      }
      return response.json();
    });
}