import { useState, useEffect } from "react";
import { Col, ListGroup } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils, faCoffee, faCheese } from "@fortawesome/free-solid-svg-icons";

// eslint-disable-next-line react/prop-types
const Icon = ({ nama }) => {
    const icons = {
        Makanan: faUtensils,
        Minuman: faCoffee,
        Cemilan: faCheese
    };

    const icon = icons[nama] || faUtensils; // Jika nama tidak ditemukan, gunakan ikon default (faUtensils)
    return <FontAwesomeIcon icon={icon} className="me-2" />;
};

// eslint-disable-next-line react/prop-types
const ListCategories = ({ changeCategory, categoriYangDipilih }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios
            .get(API_URL + "categories")
            .then(res => {
                setCategories(res.data); // Set state dengan data kategori
            })
            .catch(err => {
                console.log("Error cuy", err);
            });
    }, []); // Dependency array kosong memastikan efek ini hanya dijalankan sekali

    return (
        <Col md={2} className="mt-3">
            <h4><strong>Daftar Kategori</strong></h4>
            <hr />
            <ListGroup>
                {categories && categories.map((category) => (
                    <ListGroup.Item
                        key={category.id}
                        className={categoriYangDipilih === category.nama ?
                            "category-aktif" : ""} // Menampilkan kategori yang dipilih sebagai aktif
                        onClick={() => changeCategory(category.nama)}
                        style={{ cursor: 'pointer' }}
                    >
                        <h5>
                            <Icon nama={category.nama} /> {category.nama}
                        </h5>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Col>
    );
};

export default ListCategories;


// const Icon = ({ nama }) => {
//     if (nama === "Makanan") return <FontAwesomeIcon icon={faUtensils} className="mr-2" />;
//     if (nama === "Minuman") return <FontAwesomeIcon icon={faCoffee} />;
//     if (nama === "Cemilan") return <FontAwesomeIcon icon={faCheese} className="mr-2" />;
//     return <FontAwesomeIcon icon={faUtensils} className="mr-2" />;
// };