import React from "react";
import { Navbar, Nav, Row, Col, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function Footer() {
  return (
    <footer>
      <Row className="py-3">
        <Col className="text-center py-3">Copyright &copy; Prod Karu</Col>
      </Row>

      <Navbar expand="lg" variant="dark" bg="dark">
        <Container className="justify-content-center">
          <Nav className="justify-content-center" activeKey="/home">
            <Nav.Item>
              <LinkContainer to="/privacy">
                <Nav.Link>Terms & Conditions</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                href="https://www.instagram.com/carson.e.p/"
                target="_blank"
              >
                <i
                  className="fab fa-instagram"
                  style={{ fontSize: "20px" }}
                ></i>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
    </footer>
  );
}

export default Footer;
