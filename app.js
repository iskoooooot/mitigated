document.addEventListener('DOMContentLoaded', function() {
    const commentForm = document.getElementById('commentForm'); // Get the comment form element
    const commentsSection = document.getElementById('comments-section'); // Get the comments section element (new)
  
    commentForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent default form submission
  
      const name = document.getElementById('name').value;
      const comment = document.getElementById('comment').value;
  
      let comments;
      if(localStorage.getItem('comments')) {
        comments = JSON.parse(localStorage.getItem('comments'));
      } else {
        comments = [];
      }
  
      // Add the new comment to the beginning of the array
      comments.push({ name, comment, date: new Date().toLocaleString() });
  
      localStorage.setItem('comments', JSON.stringify(comments));
  
      displayComments();
      //clearing value for the name form
      document.getElementById('name').value = '';
        //clearing value for the comment form
      document.getElementById('comment').value = '';
    });
  
    function displayComments() {
      const comments = JSON.parse(localStorage.getItem('comments')) || [];
  
      commentsSection.innerHTML = '';  // Clear the comments section before adding new ones
  
      comments.forEach(comment => {
        const commentHTML = `
          <section class="comment">
            <p>
              <img src="/avatar.png" class="avatar">
              <span class="comment-author">${comment.name} | ${comment.date}</span>
            </p>
            <p>${comment.comment}</p>
            <p></p>
          </section>`;
        commentsSection.insertAdjacentHTML('beforeend', commentHTML); // Append comments to the end (new)
      });
    }
  
    // Call displayComments() once to display any existing comments on page load
    displayComments();
  });
  