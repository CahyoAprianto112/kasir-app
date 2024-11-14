/* eslint-disable react/prop-types */
import { Button, Col, Row, Alert } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const TotalBayar = ({ keranjangs }) => {
    const navigate = useNavigate(); // Buat navigasi ke halaman sukses
    const [error, setError] = useState(""); // State untuk menyimpan pesan error

    // mereset error jika keranjangs tidak kosong
    useEffect(() => {
        if (keranjangs.length > 0) {
            setError(""); // Reset pesan error jika ada item di keranjangs
        }
    }, [keranjangs]); // Dependency array berisi keranjangs

    const submitTotalBayar = (totalBayar) => {
        // Cek apakah keranjangs kosong
        if (keranjangs.length === 0) {
            setError("Silakan pilih makanan atau minuman sebelum melanjutkan."); // Set pesan error
            return; // Stop eksekusi fungsi
        }

        const pesanan = {
            total_bayar: totalBayar,
            menus: keranjangs,
        };

        axios.post(`${API_URL}pesanans`, pesanan)
            .then(() => {
                navigate("/sukses"); // Setelah post sukses, pindah ke halaman sukses
            })
            .catch((error) => {
                console.error("Error saat ngirim pesanan:", error);
            });
    };

    // Hitung total bayar dari keranjang
    const totalBayar = keranjangs.reduce((result, item) => {
        return result + item.total_harga;
    }, 0);

    return (
        <>
            {/* website */}
            <div className="fixed-bottom d-none d-md-block">
                <Row>
                    <Col md={{ span: 3, offset: 9 }} className="px-4">
                        {error && <Alert variant="danger">{error}</Alert>} {/* Tampilkan alert jika ada error */}
                        <h5>
                            Total Harga :
                            <strong className="float-end me-2">
                                Rp {numberWithCommas(totalBayar)}
                            </strong>
                        </h5>
                        <Button
                            variant="primary"
                            className="w-100 mb-2 mt-2"
                            size="lg"
                            onClick={() => submitTotalBayar(totalBayar)}
                        >
                            <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
                            <strong>Bayar</strong>
                        </Button>
                    </Col>
                </Row>
            </div>

            {/* Handphone */}
            <div className="d-sm-block d-md-none">
                <Row>
                    <Col md={{ span: 3, offset: 9 }} className="px-4">
                        {error && <Alert variant="danger">{error}</Alert>} {/* Tampilkan alert jika ada error */}
                        <h5>
                            Total Harga :
                            <strong className="float-end me-2">
                                Rp {numberWithCommas(totalBayar)}
                            </strong>
                        </h5>
                        <Button
                            variant="primary"
                            className="w-100 mb-2 mt-2"
                            size="lg"
                            onClick={() => submitTotalBayar(totalBayar)}
                        >
                            <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
                            <strong>Bayar</strong>
                        </Button>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default TotalBayar;
