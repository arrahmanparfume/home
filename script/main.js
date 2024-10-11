const urls = `https://docs.google.com/spreadsheets/d/e/2PACX-1vT3rcFW4ZOSibGhbubam2tyLqwbN6kbvEiYbbT0wXKvN10U_hkHCtUzj_S5Lden-t7r_Hh9uJJZN6fu/pub?gid=292398955&single=true&output=csv`;

// Fungsi untuk mengambil data dari Google Sheets dan menampilkannya
async function fetchData() {
    const response = await fetch(urls);
    const data = await response.text();
    const rows = data.split("\n").slice(1); // Mengabaikan header CSV

    rows.forEach(row => {
        const columns = row.split(","); // Memisahkan kolom berdasarkan koma
        const itemName = columns[0];     // Nama item
        let gambar = columns[1];         // URL gambar Google Drive
        const deskripsi = columns[2];    // Deskripsi produk
        const detail = columns[3];       // Detail produk
        const harga = columns[4];        // Harga produk

        document.querySelectorAll('.btnDetail').forEach(item => {
            item.addEventListener('click', (e) => {
                let parent = e.target.parentNode.parentNode;
                let gambar = parent.querySelector('.card-img-top').src;
                let harga = parent.querySelector('.harga').innerHTML;
                let judul = parent.querySelector('.card-text').innerHTML;
                let detail = parent.querySelector('.detail') ? parent.querySelector('.detail').innerHTML: '<i>tidak ada informasi yang tersedia</i>';
                
                
                let tombolModal = document.querySelector('.btnModal');
                tombolModal.click();

                document.querySelector('.modalTitle').innerHTML = itemName;
                let image = document.createElement('img');
                image.src = gambar;
                image.classList.add('w-100');
                document.querySelector('.modalImage').innerHTML = '';
                document.querySelector('.modalImage').appendChild(image); 
                document.querySelector('.modalDetail').innerHTML = detail; 
                document.querySelector('.modalHarga').innerHTML = harga; 

                const nohp = '6281806490304';
                let pesan ='https://api.whatsapp.com/send?phone='+nohp+'&text=Halo Kak, saya ingin membeli produk bernama '+itemName+' '+harga;
                document.querySelector('.btnBeli').href = pesan;

            });
        })
        document.getElementById('.card');
    });
}
fetchData();