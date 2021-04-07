import React, { useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

function BeatList({
  selectedTrack,
  setSelectedTrack,
  playing,
  match,
  history,
}) {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const addToCartHandler = (id) => {
    history.push(`/cart/${id}`);
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table borderless hover size="sm">
          <thead className="py-3">
            <tr>
              <th></th>
              <th></th>
              <th style={{ width: "15%" }}>
                Currently Selected:{" "}
                {selectedTrack.substring(48).split("_-_")[0]}
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, i) => (
              <tr
                key={product._id}
                onClick={() => setSelectedTrack(product.beat)}
              >
                <td>{i + 1}</td>
                <td style={{ width: "5%" }}></td>

                <td style={{ width: "35%" }}>
                  {"                      "}
                  <Link to={`/product/${product._id}`}>{product.name}</Link>
                </td>
                <td style={{ width: "20%" }}>{product.tags}</td>
                <td style={{ width: "15%" }}>{product.bpm}</td>
                <td style={{ width: "15%" }}>{product.scale}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => addToCartHandler(product._id)}
                    type="button"
                    block
                  >
                    <i className="fas fa-shopping-cart"></i>
                    {product.price}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default withRouter(BeatList);
