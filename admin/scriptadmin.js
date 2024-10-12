const scriptURL = 'https://script.google.com/macros/s/AKfycbxG-dUEAbgUCWdV_zm-1YSeUHriisq7W7eMnyG_ii7gOMBHOv44xRbpHCQyQ3WXrP5VaQ/exec'; // Masukkan Google Apps Script URL
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
