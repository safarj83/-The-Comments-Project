import { commentsData } from './data.js';

export function renderComments() {
  const commentsList = document.getElementById('commentsList');
  commentsList.innerHTML = '';

  for (const comment of commentsData) {
    const li = document.createElement('li');
    li.className = 'comment';
    li.dataset.id = comment.id;

    const header = document.createElement('div');
    header.className = 'comment-header';
    const nameDiv = document.createElement('div');
    nameDiv.textContent = comment.name;
    const dateDiv = document.createElement('div');
    dateDiv.textContent = comment.date;
    header.append(nameDiv, dateDiv);

    const body = document.createElement('div');
    body.className = 'comment-body';
    const textDiv = document.createElement('div');
    textDiv.className = 'comment-text';
    textDiv.textContent = comment.text;
    body.appendChild(textDiv);

    const footer = document.createElement('div');
    footer.className = 'comment-footer';
    const likes = document.createElement('div');
    likes.className = 'likes';
    const likesCounter = document.createElement('span');
    likesCounter.className = 'likes-counter';
    likesCounter.textContent = comment.likes;
    const likeButton = document.createElement('button');
    likeButton.className = comment.isLiked ? 'like-button active' : 'like-button';
    likeButton.dataset.id = comment.id;
    likes.append(likesCounter, likeButton);
    footer.appendChild(likes);

    li.append(header, body, footer);
    commentsList.appendChild(li);
  }
}