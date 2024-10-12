const scriptURL = 'https://script.google.com/macros/s/AKfycbzG_GhzpOIh_7S6wzrfA96FOp1VB_r0GcbhNp-elV8-WY9SSmecU_iLRqqsdCj_BfAmkw/exec'; // Masukkan Google Apps Script URL
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
