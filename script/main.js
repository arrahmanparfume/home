// ID sheet dan URL CSV
const urls = `https://docs.google.com/spreadsheets/d/e/2PACX-1vT3rcFW4ZOSibGhbubam2tyLqwbN6kbvEiYbbT0wXKvN10U_hkHCtUzj_S5Lden-t7r_Hh9uJJZN6fu/pub?gid=292398955&single=true&output=csv`;

async function fetchData() {
    const response = await fetch(urls);
    const data = await response.text();
    const rows = data.split("\n").slice(1); // Mengabaikan header CSV

    rows.forEach(row => {
        const columns = row.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
        const col = row.split(",");
        
        if (columns) {
            const itemName = col[0]; // Menghapus tanda kutip jika ada
            let gambar = columns[1].replace(/(^"|"$)/g, '');
            const deskripsi = columns[2].replace(/(^"|"$)/g, '');
            const detail = columns[3] ? columns[3].replace(/(^"|"$)/g, '') : ''; // Pastikan kolom ada
            const harga = columns[4].replace(/(^"|"$)/g, '');

            // Buat elemen HTML
            const cardHTML = `
                <div class="col mb-5">
                    <div class="card shadow card">
                        <img src="${gambar}" class="card-img-top" alt="${itemName}" style="margin:5%; width:auto">
                        <div class="card-body">
                            <h5 class="card-title">${itemName}</h5>
                            <p class="card-text deskripsi" style="height:5rem">${deskripsi}</p>
                        </div>
                        <div>
                            <div class="d-none detail">${detail}</div>
                        </div>
                        <div class="card-footer d-md-flex"> 
                            <button class="btn btn-sm btn-primary d-block btnDetail">Beli Produk</button>
                            <a class="ms-auto text-danger fw-bold d-block text-center text-decoration-none harga">RP. ${harga}</a>
                        </div>
                    </div>
                </div>
            `;

            // Tambahkan HTML ke container
            document.getElementById('produk-container').insertAdjacentHTML('beforeend', cardHTML);
        }
    });

    // Tambahkan listener untuk setiap btnDetail setelah produk ditampilkan
    document.querySelectorAll('.btnDetail').forEach((item) => {
        item.addEventListener('click', (e) => {
            const parent = e.target.closest('.card');
            const gambar = parent.querySelector('.card-img-top').src;
            const harga = parent.querySelector('.harga').innerHTML;
            const judul = parent.querySelector('.card-title').innerHTML;
            const deskripsi = parent.querySelector('.card-text').innerHTML;
            const details = parent.querySelector('.detail').innerHTML;

            // Tampilkan modal
            const tombolModal = document.querySelector('.btnModal');
            tombolModal.click();

            document.querySelector('.modalTitle').innerHTML = judul;
            const image = document.createElement('img');
            image.src = gambar;
            image.classList.add('w-100');
            document.querySelector('.modalImage').innerHTML = '';
            document.querySelector('.modalImage').appendChild(image);
            document.querySelector('.modalDetail').innerHTML = details;
            document.querySelector('.modalHarga').innerHTML = harga;

            // Ambil data dari form ketika tombol Beli Produk diklik
            document.querySelector('.btnBeli').addEventListener('click', (e) => {
                //e.preventDefault(); // Mencegah perilaku default
                
                const nama = document.getElementById('nama').value;
                const alamat = document.getElementById('alamat').value;
                const hp = document.getElementById('nohp').value;

                const nohp = '6281806490304';
                const pesan = `Halo Kak, saya ingin membeli produk bernama ${judul}, ${deskripsi} Seharga ${harga} \nBerikut data saya : \n - Nama : ${nama}\n - Alamat : ${alamat}\n - No HP : ${hp}`;
                document.querySelector('.btnBeli').href = `https://api.whatsapp.com/send?phone=${nohp}&text=${encodeURIComponent(pesan)}`;
            });
        });
    });
}

// Panggil fungsi untuk mengambil dan menampilkan data
fetchData();
