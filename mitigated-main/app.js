document.addEventListener('DOMContentLoaded', function() {
  const commentForm = document.getElementById('commentForm');
  const commentsSection = document.getElementById('comments-section');

  function sanitizeInput(input) {
    // Remove any HTML tags
    const cleanedInput = input.replace(/<[^>]*>?/gm, '');

    // Replace special characters with their HTML entities
    const escapedInput = cleanedInput.replace(/[&<>"']/g, function(match) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      }[match];
    });

    return escapedInput;
  }

  commentForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = sanitizeInput(document.getElementById('name').value);
    const comment = sanitizeInput(document.getElementById('comment').value);

    let comments;
    if(localStorage.getItem('comments')) {
      comments = JSON.parse(localStorage.getItem('comments'));
    } else {
      comments = [];
    }

    comments.push({ name, comment, date: new Date().toLocaleString() });

    localStorage.setItem('comments', JSON.stringify(comments));

    displayComments();

    document.getElementById('name').value = '';
    document.getElementById('comment').value = '';
  });

  function displayComments() {
    const comments = JSON.parse(localStorage.getItem('comments')) || [];

    commentsSection.innerHTML = '';

    comments.forEach(comment => {
      const commentHTML = `
        <section class="comment">
          <p>
            <img src="/avatar.png" class="avatar">
            <span class="comment-author">${sanitizeInput(comment.name)} | ${comment.date}</span>
          </p>
          <p>${sanitizeInput(comment.comment)}</p>
          <p></p>
        </section>`;
      commentsSection.insertAdjacentHTML('beforeend', commentHTML);
    });
  }

  displayComments();
});