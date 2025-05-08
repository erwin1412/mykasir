function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

// Hapus cookie helper
function deleteCookie(name) {
  document.cookie = name + '=; Max-Age=0; path=/';
}

window.onload = function () {
  const userId = getCookie('user_id');
  const firstName = getCookie('first_name');
  const lastName = getCookie('last_name');

  // Jika tidak ada user login, tampilkan Login dan Register
  if (!userId) {
    const loginNav = document.getElementById("loginNav");
    const registerNav = document.getElementById("registerNav");
    const contactNav = document.getElementById("contactNav");
    if (loginNav) loginNav.classList.remove("hidden");
    if (registerNav) registerNav.classList.remove("hidden");
    if (contactNav) contactNav.classList.add("hidden");

    const userNav = document.getElementById("userNav");
    if (userNav) userNav.classList.add("hidden");

  } else {
    // Jika ada user login, hilangkan Login & Register
    const loginNav = document.getElementById("loginNav");
    const registerNav = document.getElementById("registerNav");
    if (loginNav) loginNav.remove();
    if (registerNav) registerNav.remove();

    // Tampilkan nama user dan dropdown
    const userButton = document.getElementById("userButton");
    const userNav = document.getElementById("userNav");
    const dropdownMenu = document.getElementById("dropdownMenu");
    userButton.textContent = `${firstName} ${lastName} ▼`;
    userNav.classList.remove("hidden");

    userButton.addEventListener("click", function () {
      dropdownMenu.classList.toggle("hidden");
    });

    // Logout button
    const logoutBtn = document.getElementById("logoutBtn");
    logoutBtn.addEventListener("click", function (e) {
      e.preventDefault();
      deleteCookie("user_id");
      deleteCookie("first_name");
      deleteCookie("last_name");
      window.location.href = "login.html";
    });
  }
};
