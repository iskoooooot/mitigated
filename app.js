document.addEventListener('DOMContentLoaded', function() {
    const commentForm = document.getElementById('commentForm');
    const commentsSection = document.getElementById('comments-section');
  
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
              <span class="comment-author">${escapeHTML(comment.name)} | ${comment.date}</span>
            </p>
            <p>${escapeHTML(comment.comment)}</p>
            <p></p>
          </section>`;
        commentsSection.insertAdjacentHTML('beforeend', commentHTML);
      });
    }
  
    displayComments();
  });

function sanitizeInput(input) {
  // Implement your input sanitization logic here
  // For simplicity, this example uses DOMPurify library
  return DOMPurify.sanitize(input);
}

function escapeHTML(html) {
  // Implement HTML escaping logic here
  // For simplicity, this example uses a basic implementation
  return html.replace(/[&<>"']/g, function(match) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[match];
  });
}

function htmlEncode(str) {
  // HTML encoding function
  return String(str).replace(/[&<>"']/g, function(match) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[match];
  });
}

function jsEscape(str) {
  // Unicode encoding function
  return String(str).replace(/[^\w. ]/gi, function(c) {
    return '\\u' + ('0000' + c.charCodeAt(0).toString(16)).slice(-4);
  });
}

function validateInput(input) {
  // Implement input validation logic here
  // You can validate input length, format, etc.
  // For example, checking if the input contains only alphanumeric characters
  const alphanumericRegex = /^[a-zA-Z0-9]+$/;
  return alphanumericRegex.test(input);
}