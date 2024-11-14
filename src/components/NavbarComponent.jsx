import { Container, Nav, Navbar } from 'react-bootstrap'

const NavbarComponent = () => {
    return (
        <Navbar expand="lg" variant='dark'>
            <Container>
                <Navbar.Brand href="#home"><strong>Kasir </strong>App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto gap-3">
                        <Nav.Link href="#home">Beranda</Nav.Link>
                        <Nav.Link href="#link">Status Pesanan</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavbarComponent