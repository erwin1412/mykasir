


const userId = getCookie('user_id');
const firstName = getCookie('first_name');
const lastName = getCookie('last_name');
const email = getCookie('email');
console.log("test" , userId , firstName , lastName , email);

    const inputFirstName = document.getElementById("first");
    const inputLastName = document.getElementById("last");
    const inputEmail = document.getElementById("email");
    
    
    inputFirstName.value = `${firstName}`;
    inputLastName.value = `${lastName}`;
    inputEmail.value = `${email}`;

    

    document.addEventListener("DOMContentLoaded", function() {
        const form = document.getElementById("contactForm");
    
        form.addEventListener("submit", function(event) {
            event.preventDefault();

            const phone = document.getElementById('phone').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            const formData = {
                user_id: userId,
                phone: phone,
                subject: subject,
                message: message
            };
             
            // Mengirimkan data form dalam format JSON menggunakan fetch
            fetch("https://mykasir.ern.my.id/public/index.php?path=contact", {
                method: 'POST', 
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
                })
            .then(response => response.json()) // Mengharapkan respons dalam format JSON
            .then(data => {
                alert("Pesan berhasil dikirim!");
                window.location.reload()
            })
            .catch(error => {
                console.error('Error:', error);
                alert("Terjadi kesalahan, coba lagi.");
            });
        });
    });
    