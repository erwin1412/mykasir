  function togglePassword() {
      const input = document.getElementById('password');
      input.type = input.type === 'password' ? 'text' : 'password';
    }
  
    // Handle login form submission
    document.getElementById('loginForm').addEventListener('submit', function (event) {
      event.preventDefault();
  
      // Get email and password input values
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
  
      // Make API call to login
      fetch('https://mykasir.ern.my.id/public/index.php?path=login', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Login successful') {
          // Store cookie or session to indicate that the user is logged in
            document.cookie = `user_id=${data.user.id}; path=/; max-age=3600`;  // Cookie valid for 1 hour
            document.cookie = `first_name=${data.user.first_name}; path=/; max-age=3600`;  // Cookie valid for 1 hour
            document.cookie = `last_name=${data.user.last_name}; path=/; max-age=3600`;  // Cookie valid for 1 hour
            document.cookie = `email=${data.user.email}; path=/; max-age=3600`;  // Cookie valid for 1 hour
          
          // Redirect to home or dashboard if login is successful
          window.location.href = 'home.html';
        } else {
          // Show error message if login fails
          alert(data.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Something went wrong. Please try again later.');
      });
    });