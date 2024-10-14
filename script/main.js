const urls = `https://docs.google.com/spreadsheets/d/e/2PACX-1vT3rcFW4ZOSibGhbubam2tyLqwbN6kbvEiYbbT0wXKvN10U_hkHCtUzj_S5Lden-t7r_Hh9uJJZN6fu/pub?gid=292398955&single=true&output=csv`;
async function fetchData() {
    const response = await fetch(urls);
    const data = await response.text();
    const rows = data.split("\n").slice(1); // Mengabaikan header CSV

    rows.forEach(row => {
        // Gunakan regex untuk memisahkan data CSV dengan lebih baik
        const columns = row.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
        const col = row.split(",")
        if (columns) {
            const col = row.split(",");
            const itemName = col[0]; // Menghapus tanda kutip jika ada
            let gambar = columns[1].replace(/(^"|"$)/g, '');
            const deskripsi = columns[2].replace(/(^"|"$)/g, '');
            const detail = columns[3] ? columns[3].replace(/(^"|"$)/g, '') : ''; // Pastikan kolom ada
            const harga = columns[4].replace(/(^"|"$)/g, '');

            document.querySelectorAll('.btnDetail').forEach(item => {
                item.addEventListener('click', (e) => {
                    let parent = e.target.parentNode.parentNode;
                    let gambar = parent.querySelector('.card-img-top').src;
                    let harga = parent.querySelector('.harga').innerHTML;
                    let judul = parent.querySelector('.card-title').innerHTML;
                    let deskripsi = parent.querySelector('.card-text').innerHTML;
                    let detailToShow = detail || '<i>tidak ada informasi yang tersedia</i>'; // Gunakan detail yang sudah diproses
                    let details = parent.querySelector('.detail').innerHTML;
                    let tombolModal = document.querySelector('.btnModal');
                    tombolModal.click();

                    document.querySelector('.modalTitle').innerHTML = itemName;
                    let image = document.createElement('img');
                    image.src = gambar;
                    image.classList.add('w-100');
                    document.querySelector('.modalImage').innerHTML = '';
                    document.querySelector('.modalImage').appendChild(image);
                    document.querySelector('.modalDetail').innerHTML = details;
                    document.querySelector('.modalHarga').innerHTML = harga;

                    const nohp = '6288223886502';
                    let pesan = 'https://api.whatsapp.com/send?phone=' + nohp + '&text=Halo Kak, saya ingin membeli produk bernama ' + judul + ', ' +deskripsi+' '+ harga;
                    document.querySelector('.btnBeli').href = pesan;
                });
            });
        }
    });
}

fetchData();
