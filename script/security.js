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

// Deteksi developer tools
var devtools = /./;
var devtoolsOpen = false;

function detectDevTools() {
    if (!devtools.hidden) {
        if (!devtoolsOpen) {
            devtoolsOpen = true;
            console.warn('Developer tools terdeteksi terbuka!');
            // Anda bisa mengarahkan pengguna atau menampilkan pesan di sini
            window.location.href = "about:blank"; // Atau ganti dengan logika lain yang diinginkan
        }
    } else {
        devtoolsOpen = false; // Reset jika Developer Tools ditutup
    }
}

setInterval(detectDevTools, 2000); // Cek setiap 2 detik
