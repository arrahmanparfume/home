const url = `https://docs.google.com/spreadsheets/d/e/2PACX-1vT3rcFW4ZOSibGhbubam2tyLqwbN6kbvEiYbbT0wXKvN10U_hkHCtUzj_S5Lden-t7r_Hh9uJJZN6fu/pub?gid=1336573823&single=true&output=csv`;

// Fungsi untuk memverifikasi login
async function verifyLogin(username, password) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.text();
        const rows = data.split("\n").slice(1); // Mengabaikan header CSV

        // Periksa setiap baris dalam data
        for (const row of rows) {
            const columns = row.split(","); // Memisahkan kolom berdasarkan koma
            const userId = columns[0]; // username
            const userPass = columns[1]; // password

            // Verifikasi kredensial
            if (userId === username && userPass === password) {
                return true; // Kredensial valid
            }
        }
    } catch (error) {
        console.error("Error fetching the CSV:", error);
    }
    return false; // Kredensial tidak valid
}

document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Mencegah form dari pengiriman otomatis

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const isValid = await verifyLogin(username, password);
    if (isValid) {
        // Jika berhasil, arahkan ke admin.html
        localStorage.setItem('isLoggedIn', 'true'); // Menyimpan status login
        window.location.href = '../admin/admin.html'; // Ganti dengan path yang sesuai
    } else {
        alert('Username atau password salah!');
    }
});