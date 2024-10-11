const form = document.getElementById('inputForm');
const scriptURL = 'https://script.google.com/macros/s/AKfycbycFpqWJQBZZ0JFNvqGsQSdm0lWYiBCcsLGCDenssM7icSVILt2AVvb2le_TvydMZi4zQ/exec';

form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(form);

    const fileInput = document.querySelector('input[type="file"]');
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onloadend = function () {
        const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');

        formData.append('gambar', base64String);
        formData.append('gambarMimeType', file.type);
        formData.append('gambarName', file.name);

        // Kirim data
        fetch(scriptURL, {
            method: 'POST',
            body: formData,
        })
            .then(response => alert('Data berhasil dikirim!'))
            .catch(error => console.error('Error!', error.message));
    };

    if (file) {
        reader.readAsDataURL(file); // Konversi file gambar menjadi Base64
    } else {
        // Jika tidak ada gambar, kirim form langsung
        fetch(scriptURL, {
            method: 'POST',
            body: formData,
        })
            .then(response => alert('Data berhasil dikirim!'))
            .catch(error => console.error('Error!', error.message));
    }
});