import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingAddress } from "../actions/cartActions";

function ShippingScreen({ history }) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const dispatch = useDispatch();

  const [email, setEmail] = useState(shippingAddress.email);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ email }));
    history.push("/payment");
  };
  return (
    <FormContainer>
      <h1>Delivery Method</h1>
      <CheckoutSteps step1 step2 />

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit">Continue</Button>
      </Form>
    </FormContainer>
  );
}

export default ShippingScreen;
