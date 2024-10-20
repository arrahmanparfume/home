// Mencegah klik kanan
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});

// Mencegah shortcut keyboard
document.addEventListener('keydown', function (e) {
    if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I") || (e.ctrlKey && (e.key === "u" || e.key === "U"))) {
        e.preventDefault();
    }
});

// Deteksi developer tools
var devtoolsOpen = false;
var threshold = 160; // Set threshold untuk perbedaan ukuran

function detectDevTools() {
    const widthDifference = window.outerWidth - window.innerWidth > threshold;

    if (widthDifference) {
        // Jika Developer Tools terbuka
        if (!devtoolsOpen) {
            devtoolsOpen = true;
            alert('Developer tools terdeteksi terbuka!');
            // Alihkan ke about:blank setelah memberi peringatan
            setTimeout(function() {
                window.location.href = "about:blank"; 
            }, 100); // Menunggu sebentar sebelum alih ke about:blank
        }
    } else {
        // Reset status jika Developer Tools ditutup
        devtoolsOpen = false; 
    }
}

// Cek status Developer Tools secara berkala
setInterval(detectDevTools, 1000); // Cek setiap detik
