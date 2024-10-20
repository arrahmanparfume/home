// Mencegah klik kanan
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});

// Mencegah shortcut keyboard
document.addEventListener('keydown', function (e) {
    if (e.key === "F12" || (e.ctrlKey && (e.key === "u" || e.key === "U"))) {
        e.preventDefault();
    }
});

var devtools = /./;
// Deteksi developer tools
window.addEventListener('blur', function () {
    setTimeout(function () {
        if (!devtools.hidden) {
            alert('Developer tools telah terdeteksi! Keamanan aktif');
            window.location.href = "about:blank";
        }
    }, 500); // Mengurangi waktu untuk mendeteksi
});

// Deteksi fokus
window.addEventListener('focus', function () {
    // Reset atau logika lain saat fokus
});
