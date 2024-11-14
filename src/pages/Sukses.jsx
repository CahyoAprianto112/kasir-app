import axios from "axios";
import { useEffect } from "react";
import { Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { API_URL } from "../utils/constants";

// Fungsi untuk hapus keranjang
const hapusKeranjang = async () => {
    try {
        // Fetch semua data keranjang
        const res = await axios.get(`${API_URL}keranjangs`);
        const keranjangs = res.data;

        // Hapus satu persatu item keranjang berdasarkan id
        for (const item of keranjangs) {
            await axios.delete(`${API_URL}keranjangs/${item.id}`);
        }
        console.log("Keranjang berhasil dihapus.");
    } catch (error) {
        console.error("Error saat menghapus keranjang:", error);
    }
};

const Sukses = () => {
    // useEffect untuk eksekusi penghapusan keranjang saat halaman sukses dimuat
    useEffect(() => {
        hapusKeranjang(); // Panggil fungsi hapus keranjang
    }, []); // Dependency array kosong supaya hanya jalan saat komponen pertama kali dimuat

    return (
        <div className="text-center mt-4">
            <Image src="assets/images/success.png" width={500} />
            <h2>Sukses Pesan</h2>
            <p>Terima Kasih Sudah Memesan!</p>
            <Button variant="primary" as={Link} to="/">
                Kembali
            </Button>
        </div>
    );
};

export default Sukses;
