    const dummyProducts = {
      a: { name: "Produk A", price: 10000 },
      b: { name: "Produk B", price: 15000 },
      c: { name: "Produk C", price: 20000 },
      d: { name: "Produk D", price: 25000 },
      e: { name: "Produk E", price: 30000 },
      f: { name: "Produk F", price: 35000 },
      h: { name: "Produk H", price: 40000 },
      i: { name: "Produk I", price: 45000 },

    };

    // ✅ Tampilkan daftar produk sebagai kartu
    const productList = document.getElementById("productList");
    for (const [key, product] of Object.entries(dummyProducts)) {
      const card = document.createElement("div");
      card.className = "bg-gray-100 p-4 rounded shadow hover:shadow-md transition";
      card.innerHTML = `
        <h3 class="font-bold text-lg mb-1">${product.name}</h3>
        <p class="mb-2">Harga: Rp ${product.price}</p>
        <button onclick="addProductById('${key}')" class="bg-blue-500 text-white px-3 py-1 rounded text-sm">Tambah</button>
      `;
      productList.appendChild(card);
    }

    function addProductById(id) {
      document.getElementById("productSelect").value = id;
      addProduct();
    }

function addProduct() {
  const select = document.getElementById("productSelect");
  const id = select.value;
  if (!id) return;

  const { name, price } = dummyProducts[id];
  const tbody = document.getElementById("productTable");

  // Cek apakah produk sudah ada di tabel
  const existingRow = Array.from(tbody.rows).find(row => row.dataset.id === id);
  if (existingRow) {
    const qtyInput = existingRow.querySelector(".jumlah");
    qtyInput.value = parseInt(qtyInput.value) + 1;
    updateSubtotal(qtyInput);
    return;
  }

  // Kalau belum ada, tambahkan baris baru
  const row = document.createElement("tr");
  row.dataset.id = id;
  row.dataset.price = price;
  row.innerHTML = `
    <td class="border p-2">${name}</td>
    <td class="border p-2">Rp ${price}</td>
    <td class="border p-2">
      <input type="number" value="1" min="1" class="jumlah w-16 p-1 border rounded" onchange="updateSubtotal(this)">
    </td>
    <td class="border p-2 subtotal">Rp ${price}</td>
    <td class="border p-2">
      <button onclick="this.closest('tr').remove(); updateTotal();" class="text-red-500">Hapus</button>
    </td>
  `;
  tbody.appendChild(row);
  updateTotal();
}

    function updateSubtotal(input) {
      const row = input.closest("tr");
      const price = parseInt(row.dataset.price);
      const quantity = parseInt(input.value);
      const subtotalCell = row.querySelector(".subtotal");
      const subtotal = price * quantity;
      subtotalCell.textContent = "Rp " + subtotal;
      updateTotal();
    }

    function updateTotal() {
      const rows = document.querySelectorAll("#productTable tr");
      let total = 0;
      rows.forEach(row => {
        const qty = parseInt(row.querySelector(".jumlah").value);
        const price = parseInt(row.dataset.price);
        total += qty * price;
      });
      document.getElementById("total").textContent = total;
    }

function hitungKembalian() {
  const total = parseInt(document.getElementById("total").textContent);
  const dibayar = parseInt(document.getElementById("uangDibayar").value);

  if (isNaN(dibayar)) {
    alert("Masukkan jumlah uang yang dibayar!");
    return;
  }

  if (dibayar < total) {
    alert("Uang dibayar kurang dari total belanja!");
    document.getElementById("kembalian").textContent = 0;
    return;
  }

  const kembali = dibayar - total;
  document.getElementById("kembalian").textContent = kembali;
}


function simpanTransaksi() {
  const rows = document.querySelectorAll("#productTable tr");
  const riwayatBody = document.querySelector("#riwayatTable tbody");

  if (rows.length === 0) {
    alert("Belum ada produk dalam transaksi.");
    return;
  }

  // Tambah baris ke tabel riwayat
  rows.forEach(row => {
    const nama = row.cells[0].textContent;
    const harga = row.cells[1].textContent;
    const jumlah = row.querySelector(".jumlah").value;
    const subtotal = row.cells[3].textContent;

    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td class="border p-2">${nama}</td>
      <td class="border p-2">${harga}</td>
      <td class="border p-2">${jumlah}</td>
      <td class="border p-2">${subtotal}</td>
    `;
    riwayatBody.appendChild(newRow);
  });

  // Reset transaksi
  document.getElementById("productTable").innerHTML = "";
  document.getElementById("total").textContent = 0;
  document.getElementById("uangDibayar").value = "";
  document.getElementById("kembalian").textContent = 0;
}

function exportToExcel() {
  const wb = XLSX.utils.table_to_book(document.getElementById('riwayatTable'));
  XLSX.writeFile(wb, 'riwayat_transaksi.xlsx');
}
function exportToPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Pastikan tabelnya sudah ada di DOM
  const table = document.getElementById('riwayatTable');

  // Jika tabel tidak kosong, baru buat PDF
  if (table && table.rows.length > 0) {
    doc.autoTable({ html: '#riwayatTable' });
    doc.save('riwayat_transaksi.pdf');
  } else {
    alert("Tidak ada data untuk diekspor.");
  }
}
