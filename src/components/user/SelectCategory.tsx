import { Form } from "react-bootstrap";

const SelectCategory = ({ category, handleCategoryChange }: any) => {
  return (
    <Form.Group controlId="formBasicSelect">
      <Form.Label>Choose specific category</Form.Label>
      <Form.Control
        as="select"
        value={category}
        onChange={handleCategoryChange}
      >
        <option>select</option>
        <option value="pediatrics">Pediatrics</option>
        <option value="cardiology">Cardiology</option>
        <option value="gastric">Gastric</option>
      </Form.Control>
    </Form.Group>
  );
};

export default SelectCategory;
