const commentFormHandler = async (event) => {
  event.preventDefault();

//   const title = document.querySelector('input[name="post-title"]').value;
  // const email = document.querySelector('#email-signup').value.trim();
  const comment_text = document.querySelector('textarea[name = "comment-text"]').value;
  const post_id = window.location.toString().split('/')[
      window.location.toString().split('/').length -1
  ];

  const response = await fetch('/api/comments', {
    method: 'POST',
    body: JSON.stringify({ comment_text, post_id }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
};

document
  .querySelector('.comment-form')
  .addEventListener('submit', commentFormHandler);
