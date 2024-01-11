function performLogin() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const apiEndpoint = 'http://crossorigin.me/https://qa2.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp'; // Replace with your API endpoint

  const data = {
      login_id: username,
      password: password
  };

  fetch(apiEndpoint, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Authentication failed');
      }
      return response.json();
  })
  .then(result => {
      localStorage.setItem('token', result.token);

      document.getElementById('error-message').innerText = '';
      console.log('Authentication successful', result);

      window.location.href = 'dashboard.html';
  })
  .catch(error => {
      // Handle authentication failure
      document.getElementById('error-message').innerText = 'Invalid credentials. Please try again.';
      console.error('Authentication failed', error);
  });
}
