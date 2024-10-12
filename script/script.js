// ID sheet dan URL CSV
const url = `https://docs.google.com/spreadsheets/d/e/2PACX-1vT3rcFW4ZOSibGhbubam2tyLqwbN6kbvEiYbbT0wXKvN10U_hkHCtUzj_S5Lden-t7r_Hh9uJJZN6fu/pub?gid=292398955&single=true&output=csv`;
async function fetchData() {
    const response = await fetch(url);
    const data = await response.text();
    const rows = data.split("\n").slice(1); // Mengabaikan header CSV
    console.log(data);
    rows.forEach(row => {
        // Gunakan regex untuk memisahkan data CSV dengan lebih baik, memperhitungkan tanda koma di dalam tanda kutip
        const columns = row.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g); 
        const col = row.split(",")
        const itemName = col[0]; // Menghapus tanda kutip jika ada
        let gambar = columns[1].replace(/(^"|"$)/g, '');
        const deskripsi = columns[2];
        const detail = columns[3].replace(/(^"|"$)/g, '');
        const harga = columns[4].replace(/(^"|"$)/g, '');

        // Perbaikan URL gambar Google Drive
        gambar = gambar.replace("/file/d/", "/uc?export=view&id=").replace("/view?usp=drivesdk", "");

        // Buat elemen HTML
        const cardHTML = `
            <div class="col mb-5">
                <div class="card shadow card">
                    <img src="${gambar}" class="card-img-top" alt="${itemName}" style="margin:5%; width:auto">
                    <div class="card-body">
                        <h5 class="card-title">${itemName}</h5>
                        <p class="card-text" style="height:5rem">${deskripsi}</p>
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

            <!-- Modal -->
            <button type="button" class="btn btn-primary d-none btnModal" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5 modalTitle" id="exampleModalLabel"></h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body row">
                            <div class="modalImage col-md-6 col-12"></div>
                            <div class="col-md-6 col-12">
                                <div class="modalDetail"></div>
                                <div class="d-md-flex" style="margin-top:3%"> 
                                <br>
                                    <a href='' target="blank" class="btn btn-sm btn-warning d-block btnBeli">Beli Produk</a>
                                    <a class="ms-auto text-danger fw-bold d-block text-center text-decoration-none modalHarga"></a>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer close">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Tambahkan HTML ke container
        document.getElementById('produk-container').insertAdjacentHTML('beforeend', cardHTML);
    });
}

// Panggil fungsi untuk mengambil dan menampilkan data
fetchData();
