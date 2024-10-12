const scriptURL = 'https://script.google.com/macros/s/AKfycbwuS6SWE18sRzZRy8ou1ygUamxPjCYXzrTj3zhuqT87PDI0vlMPqR5w16s6zxwCsGoquw/exec'; // Masukkan Google Apps Script URL
const form = document.getElementById('inputForm');

form.addEventListener('submit', e => {
    e.preventDefault();
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            alert('Data berhasil dikirim!');

            // Mengosongkan input setelah berhasil mengirim
            form.reset(); // Mengosongkan semua input di dalam form
        })
        .catch(error => console.error('Error!', error.message));
});
