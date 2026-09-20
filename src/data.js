import { getComments } from './api.js';
import { formatDate } from './utils.js';

export let commentsData = [];

export let user = JSON.parse(localStorage.getItem('user')) || null;

export function setUser(newUser) {
  user = newUser;
  if (newUser) {
    localStorage.setItem('user', JSON.stringify(newUser));
  } else {
    localStorage.removeItem('user');
  }
}

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

export async function loadComments() {
  try {
    const apiComments = await getComments();
    commentsData = apiComments.map(transformComment);
    return commentsData;
  } catch (error) {
    console.error('Ошибка загрузки комментариев:', error);
    throw error;
  }
}