const testimonies = [
    { name: "Andi", comment: "Layanan sangat baik!" },
    { name: "Budi", comment: "Sangat membantu." },
    { name: "Citra", comment: "Pengalaman menyenangkan." },
    { name: "Dedi", comment: "Mudah digunakan." },
    { name: "Eka", comment: "Cukup puas." },
    { name: "Fani", comment: "Keren banget!" },
    { name: "Gilang", comment: "User friendly." },
    { name: "Hani", comment: "Support responsif." },
    { name: "Intan", comment: "Sangat direkomendasikan." },
    { name: "Joko", comment: "TOP banget!" },
  ];
  
  const sliderTrack = document.getElementById("sliderTrack");
  let currentIndex = 1; // dimulai dari indeks 1 karena kita akan duplikat
  
  function generateSlides() {
    sliderTrack.innerHTML = "";
  
    const slides = [];
  
    // Duplikat terakhir untuk di awal
    slides.push(createSlide(testimonies[testimonies.length - 1]));
  
    // Data asli
    testimonies.forEach((item) => {
      slides.push(createSlide(item));
    });
  
    // Duplikat pertama untuk di akhir
    slides.push(createSlide(testimonies[0]));
  
    slides.forEach(slide => sliderTrack.appendChild(slide));
    updateSlider(true); // posisi awal tanpa animasi
  }
  
  function createSlide(data) {
    const div = document.createElement("div");
    div.className = "slide p-6 bg-white text-center";
    div.innerHTML = `
      <p class="text-lg italic mb-2">"${data.comment}"</p>
      <h3 class="text-md font-bold">${data.name}</h3>
    `;
    return div;
  }
  
  function updateSlider(noAnimate = false) {
      const slideWidth = sliderTrack.querySelector('.slide').offsetWidth;
    
      if (noAnimate) {
        sliderTrack.style.transition = "none";
      } else {
        sliderTrack.style.transition = "transform 0.5s ease-in-out";
      }
    
      sliderTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }
    
  
  function nextTestimoni() {
    if (currentIndex >= testimonies.length + 1) return;
    currentIndex++;
    updateSlider();
  
    if (currentIndex === testimonies.length + 1) {
      setTimeout(() => {
        currentIndex = 1;
        updateSlider(true); // loncat tanpa animasi
      }, 500); // sesuai durasi transition
    }
  }
  
  function prevTestimoni() {
    if (currentIndex <= 0) return;
    currentIndex--;
    updateSlider();
  
    if (currentIndex === 0) {
      setTimeout(() => {
        currentIndex = testimonies.length;
        updateSlider(true);
      }, 500);
    }
  }
  
  window.addEventListener("DOMContentLoaded", generateSlides);