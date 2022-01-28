const addPostFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value;
  // const email = document.querySelector('#email-signup').value.trim();
  const post_text = document.querySelector('input[name = "post-text"]').value;


    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ title, post_text }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  };

document
  .querySelector('.new-post-form')
  .addEventListener('submit', addPostFormHandler);
