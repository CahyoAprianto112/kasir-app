/* eslint-disable react/prop-types */
import { Badge, Card, Col } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";

const Menus = ({ menu, masukKeranjang }) => {
    return (
        <Col md={4} xs={6} className="menu-item mb-4">
            <Card className="shadow" onClick={() => masukKeranjang(menu)}>
                <Card.Img
                    variant="top"
                    src={
                        "assets/images/" +
                        menu.category.nama.toLowerCase() +
                        "/" +
                        menu.gambar
                    }
                />
                <Card.Body>
                    <Card.Title className="small">
                        {menu.nama}
                        <strong> ({menu.kode})</strong>
                    </Card.Title>
                    <Card.Text>
                        <div className="d-flex justify-content-between align-items-center">
                            <p className="mb-0 text-muted">Rp. {numberWithCommas(menu.harga)}</p>
                            <Badge className="mb-0 px-4" bg="danger">Pilih</Badge>
                        </div>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default Menus;
