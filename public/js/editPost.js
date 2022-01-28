const updateFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value;
 const id = window.location.toString().split('/')[
   window.location.toString().split('/').length - 1
 ];  const post_text = document.querySelector('input[name = "post-text"]').value;

  const response = await fetch(`/api/posts/${id}`, {
    method: 'PUT',
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
  .querySelector('.update-form')
  .addEventListener('submit', updateFormHandler);
