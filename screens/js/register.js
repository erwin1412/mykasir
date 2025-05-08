function togglePassword() {
    const input = document.getElementById('password');
    input.type = input.type === 'password' ? 'text' : 'password';
  }

  function toggleConfirmPassword() {
    const input = document.getElementById('confirmPassword');
    input.type = input.type === 'password' ? 'text' : 'password';
  }

  // Submit form
  document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const first_name = document.getElementById('firstName').value;
    const last_name = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const termsChecked = document.getElementById('terms').checked;

    if (!termsChecked) {
      alert("Anda harus menyetujui syarat & ketentuan.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Password dan konfirmasi tidak cocok.");
      return;
    }

    fetch('https://mykasir.ern.my.id/public/index.php?path=register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ first_name, last_name, email, password }),
    })
    .then(response => response.json())
    .then(data => {

      if (data.message === "User registered successfully") {
        alert("Registrasi berhasil! Silakan login.");
        window.location.href = "login.html";
        
      } else {
        alert(data.message);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert("Terjadi kesalahan, coba lagi.");
    });
  });