/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Badge, Card, Col, ListGroup, Row } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import ModalKeranjang from "./ModalKeranjang";
import TotalBayar from "./TotalBayar";
import { API_URL } from "../utils/constants";
import axios from "axios";
import Swal from "sweetalert2";

const Hasil = ({ keranjangs }) => {
    const [showModal, setShowModal] = useState(false);
    const [keranjangDetail, setKeranjangDetail] = useState({});
    const [jumlah, setJumlah] = useState(0);
    const [keterangan, setKeterangan] = useState("");
    const [totalHarga, setTotalHarga] = useState(0);

    const handleShow = (menuKeranjang) => {
        setShowModal(true);
        setKeranjangDetail(menuKeranjang);
        setJumlah(menuKeranjang.jumlah);
        setKeterangan(menuKeranjang.keterangan);
        setTotalHarga(menuKeranjang.total_harga);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    const tambah = () => {
        setJumlah(jumlah + 1);
        setTotalHarga(keranjangDetail.product.harga * (jumlah + 1));
    };

    const kurang = () => {
        if (jumlah > 1) {
            setJumlah(jumlah - 1);
            setTotalHarga(keranjangDetail.product.harga * (jumlah - 1));
        }
    };

    const changeHandler = (event) => {
        setKeterangan(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleClose();

        const data = {
            jumlah,
            total_harga: totalHarga,
            product: keranjangDetail.product,
            keterangan,
        };

        axios
            .put(API_URL + "keranjangs/" + keranjangDetail.id, data)
            .then(() => {
                Swal.fire({
                    title: "Update Pesanan",
                    text: "Sukses Update Pesanan " + data.product.nama,
                    icon: "success",
                    button: false,
                    timer: 1500,
                });

                // Update keranjang langsung tanpa harus fetch ulang
                setKeranjangs((prevKeranjangs) =>
                    prevKeranjangs.map((menuKeranjang) => {
                        if (menuKeranjang.id === keranjangDetail.id) {
                            return {
                                ...menuKeranjang,
                                jumlah: data.jumlah,
                                total_harga: data.total_harga,
                                keterangan: data.keterangan,
                            };
                        }
                        return menuKeranjang;
                    })
                );
            })
            .catch((error) => {
                console.log("Error yaa ", error);
            });
    };

    const hapusPesanan = (id) => {
        handleClose();

        axios
            .delete(API_URL + "keranjangs/" + id)
            .then((res) => {
                Swal.fire({
                    title: "Hapus Pesanan!",
                    text: "Sukses Hapus Pesanan " + keranjangDetail.product.nama,
                    icon: "error",
                    button: false,
                    timer: 1500,
                });
            })
            .catch((error) => {
                console.log("Error yaa ", error);
            });
    };

    return (
        <Col md={3} className="mt-3">
            <h4>
                <strong>Hasil</strong>
            </h4>
            <hr />
            {keranjangs.length !== 0 && (
                <Card className="overflow-auto hasil">
                    <ListGroup variant="flush">
                        {keranjangs.map((menuKeranjang) => (
                            <ListGroup.Item
                                key={menuKeranjang.id}
                                onClick={() => handleShow(menuKeranjang)}
                            >
                                <Row>
                                    <Col xs={2}>
                                        <h4>
                                            <Badge pill variant="success" bg="warning">
                                                {menuKeranjang.jumlah}
                                            </Badge>
                                        </h4>
                                    </Col>
                                    <Col>
                                        <h5>{menuKeranjang.product.nama}</h5>
                                        <p>Rp. {numberWithCommas(menuKeranjang.product.harga)}</p>
                                    </Col>
                                    <Col>
                                        <strong className="float-right">
                                            Rp. {numberWithCommas(menuKeranjang.total_harga)}
                                        </strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}

                        <ModalKeranjang
                            handleClose={handleClose}
                            showModal={showModal}
                            keranjangDetail={keranjangDetail}
                            jumlah={jumlah}
                            keterangan={keterangan}
                            totalHarga={totalHarga}
                            tambah={tambah}
                            kurang={kurang}
                            changeHandler={changeHandler}
                            handleSubmit={handleSubmit}
                            hapusPesanan={hapusPesanan}
                        />
                    </ListGroup>
                </Card>
            )}

            <TotalBayar keranjangs={keranjangs} />
        </Col>
    );
};

export default Hasil;