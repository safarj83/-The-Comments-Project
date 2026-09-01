import { getComments } from './api.js';
import { formatDate } from './utils.js';

export let commentsData = [];
export let nextId = 1;

function transformComment(apiComment) {
  return {
    id: apiComment.id,
    name: apiComment.author.name,
    date: formatDate(apiComment.date),
    text: apiComment.text,
    likes: apiComment.likes || 0,
    isLiked: apiComment.isLiked || false,
  };
}

// async функция автоматически возвращает Promise, поэтому отлично работает в цепочке .then() в events.js
export async function loadComments() {
  try {
    const apiComments = await getComments();
    commentsData = apiComments.map(transformComment);
    
    if (commentsData.length > 0) {
      nextId = Math.max(...commentsData.map((c) => c.id)) + 1;
    } else {
      nextId = 1;
    }
    
    return commentsData;
  } catch (error) {
    console.error('Ошибка загрузки комментариев:', error);
    throw error; // Пробрасываем ошибку дальше, чтобы ее поймал .catch() в events.js или main.js
  }
}

export function incrementId() {
  return nextId++;
}