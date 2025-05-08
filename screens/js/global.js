function loadView(viewPath) {
    fetch(`/views/${viewPath}`) // path root server
      .then(res => {
        if (!res.ok) throw new Error("Gagal memuat halaman: " + viewPath);
        return res.text();
      })
      .then(html => {
        document.getElementById("mainContent").innerHTML = html;
      })
      .catch(err => {
        console.error(err);
        document.getElementById("mainContent").innerHTML = "<p class='text-red-600'>Gagal memuat konten.</p>";
      });
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    loadView("product.html");
  
    document.querySelectorAll("a[href^='#']").forEach(link => {
      link.addEventListener("click", (e) => {
        const page = link.getAttribute("href").substring(1);
        loadView(`${page}.html`);
      });
    });
  });
  