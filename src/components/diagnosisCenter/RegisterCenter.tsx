import React, { useState } from "react";
import { Form } from "react-bootstrap";

function RegisterCenter() {
  const[name,setName]=useState("");
  const[deesc,setDesc]=useState("");
  const[place,setPlace]=useState("");
  // const {user} = useContext(userContext);


  return (
    <div>
      <Form className="w-25 mx-auto mt-5">
        <legend>Register Center</legend>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Diagonsis Ceneter Name" />
        </Form.Group>
        <Form.Group>
          <Form.Label>City</Form.Label>
          <Form.Control type="text" placeholder="Enter City" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Tests Provided</Form.Label>
          <Form.Control type="text" placeholder="Diagonsis Ceneter Name" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Diagonsis Ceneter Name" />
        </Form.Group>
      </Form>
    </div>
  );
}

export default RegisterCenter;
