/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Hasil, ListCategories, Menus } from "../components";
import { API_URL } from "../utils/constants";
import axios from "axios";
import Swal from "sweetalert2";

const Home = (props) => {
    const [menus, setMenus] = useState([]);
    const [categoriYangDipilih, setCategoriYangDipilih] = useState("Makanan");
    const [keranjangs, setKeranjangs] = useState([]);

    useEffect(() => {
        axios
            .get(API_URL + "products?category.nama=" + categoriYangDipilih)
            .then((res) => {
                const menus = res.data;
                setMenus(menus);
            })
            .catch((error) => {
                console.log("Error yaa ", error);
            });

        axios
            .get(API_URL + "keranjangs")
            .then((res) => {
                const keranjangs = res.data;
                setKeranjangs(keranjangs);
            })
            .catch((error) => {
                console.log("Error yaa ", error);
            });
    }, [categoriYangDipilih]);

    useEffect(() => {
        axios
            .get(API_URL + "keranjangs")
            .then((res) => {
                const keranjangs = res.data;
                setKeranjangs(keranjangs);
            })
            .catch((error) => {
                console.log("Error yaa ", error);
            });
    }, [keranjangs]);

    const changeCategory = (value) => {
        setCategoriYangDipilih(value);
        setMenus([]);

        axios
            .get(API_URL + "products?category.nama=" + value)
            .then((res) => {
                const menus = res.data;
                setMenus(menus);
            })
            .catch((error) => {
                console.log("Error yaa ", error);
            });
    };

    const masukKeranjang = (value) => {
        axios
            .get(API_URL + "keranjangs?product.id=" + value.id)
            .then((res) => {
                if (res.data.length === 0) {
                    const keranjang = {
                        jumlah: 1,
                        total_harga: value.harga,
                        product: value,
                    };

                    axios
                        .post(API_URL + "keranjangs", keranjang)
                        .then((res) => {
                            Swal.fire({
                                title: "Sukses Masuk Keranjang",
                                text: "Sukses Masuk Keranjang " + keranjang.product.nama,
                                icon: "success",
                                button: false,
                                timer: 1500,
                            });
                        })
                        .catch((error) => {
                            console.log("Error yaa ", error);
                        });
                } else {
                    const keranjang = {
                        jumlah: res.data[0].jumlah + 1,
                        total_harga: res.data[0].total_harga + value.harga,
                        product: value,
                    };

                    axios
                        .put(API_URL + "keranjangs/" + res.data[0].id, keranjang)
                        .then((res) => {
                            Swal.fire({
                                title: "Sukses Masuk Keranjang",
                                text: "Sukses Masuk Keranjang " + keranjang.product.nama,
                                icon: "success",
                                button: false,
                                timer: 1500,
                            });
                        })
                        .catch((error) => {
                            console.log("Error yaa ", error);
                        });
                }
            })
            .catch((error) => {
                console.log("Error yaa ", error);
            });
    };

    return (
        <div className="mt-3">
            <Container fluid>
                <Row>
                    <ListCategories
                        changeCategory={changeCategory}
                        categoriYangDipilih={categoriYangDipilih}
                    />
                    <Col className="mt-3">
                        <h4>
                            <strong>Daftar Produk</strong>
                        </h4>
                        <hr />
                        <Row className="overflow-auto menu">
                            {menus &&
                                menus.map((menu) => (
                                    <Menus
                                        key={menu.id}
                                        menu={menu}
                                        masukKeranjang={masukKeranjang}
                                    />
                                ))}
                        </Row>
                    </Col>
                    <Hasil keranjangs={keranjangs} setKeranjangs={setKeranjangs} {...props} />
                </Row>
            </Container>
        </div>
    );
};

export default Home;