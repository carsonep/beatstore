import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Row, Col, ListGroup, Button, Card } from "react-bootstrap";
import { listProductDetails } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
// import Waveform from "../components/Waveform";

function ProductScreen({ match, history }) {
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match.params.id]);

  const addToCardHandler = () => {
    history.push(`/cart/${match.params.id}`);
  };

  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Container>
          <Row>
            <Col sm={8}>
              <h1 style={{
                  marginLeft: "-.9rem"
                }}>{product.name}</h1>
              <h5 className="my-3" style={{
                  marginLeft: "-.9rem"
                }}>{product.tags}</h5>
              
              <ListGroup variant="flush" style={{
                  marginLeft: "-2rem"
                }}>
                <ListGroup.Item><h2>What You Get</h2></ListGroup.Item>
                <ListGroup.Item>Untagged MP3</ListGroup.Item>
                <ListGroup.Item>A download link for the song file will be delivered instantly</ListGroup.Item>
                <ListGroup.Item>You have full rights to record, alter, mix the beat/song in any shape, way, or form (except reselling the beat).</ListGroup.Item>
                <ListGroup.Item>In the event that someone buys exclusive rights to the beat you have leased, your rights shall stand and the beat is still yours to use</ListGroup.Item>
                <ListGroup.Item>Upon purchasing leasing rights, the seller still owns the beat(s) and the seller is able to resell the beat(s) to any other party until exclusive rights have been purchased.</ListGroup.Item>
              </ListGroup>

            </Col>
            
            <Col sm={4}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Button
                      onClick={addToCardHandler}
                      className="btn-block"
                      type="button"
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          {/* <Waveform
            className="py-3"
            url={`http://127.0.0.1:8000${product.beat}`}
          /> */}
        </Container>
      )}
    </div>
  );
}

export default ProductScreen;
